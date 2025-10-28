package handlers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"

	"posts/config"
	"posts/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// getPostsCollection ensures DB is initialized
func getPostsCollection() *mongo.Collection {
	return config.DB.Collection("posts")
}

// GetPosts handles GET /api/posts
func GetPosts(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	coll := getPostsCollection()

	cursor, err := coll.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Failed to get posts", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	for cursor.Next(ctx) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			log.Println("Decode error:", err)
			http.Error(w, "Failed to decode post", http.StatusInternalServerError)
			return
		}
		posts = append(posts, post)
	}

	if err := cursor.Err(); err != nil {
		log.Println("Cursor iteration error:", err)
		http.Error(w, "Cursor error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// CreatePost handles POST /api/posts
func CreatePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	coll := getPostsCollection()

	var t models.Post
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	t.ID = primitive.NewObjectID() // ensure consistent ObjectID type

	_, err := coll.InsertOne(ctx, t)
	if err != nil {
		http.Error(w, "Failed to create Post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(t)
}

// UpdatePost handles PATCH /api/posts/{id}
func UpdatePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	coll := getPostsCollection()

	idStr := strings.TrimPrefix(r.URL.Path, "/api/posts/")
	id, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	// Parse the incoming JSON body into a map
	var updateData map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Ensure the ID field is not overwritten
	delete(updateData, "id")
	delete(updateData, "_id")

	// Build the MongoDB update
	update := bson.M{"$set": updateData}

	// Tell MongoDB to return the updated document
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	res := coll.FindOneAndUpdate(ctx, bson.M{"_id": id}, update, opts)
	if res.Err() != nil {
		if errors.Is(res.Err(), mongo.ErrNoDocuments) {
			http.Error(w, "Post not found", http.StatusNotFound)
		} else {
			http.Error(w, "Database error", http.StatusInternalServerError)
		}
		return
	}

	var updated models.Post
	if err := res.Decode(&updated); err != nil {
		http.Error(w, "Failed to decode updated post", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}

// DeletePost handles DELETE /api/posts/{id}
func DeletePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	coll := getPostsCollection()

	idStr := strings.TrimPrefix(r.URL.Path, "/api/posts/")
	id, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	res, err := coll.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		http.Error(w, "Failed to delete post", http.StatusInternalServerError)
		return
	}

	if res.DeletedCount == 0 {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
