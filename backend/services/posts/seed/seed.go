package seed

import (
	"context"
	"log"

	"posts/config"
	"posts/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Run() {

	coll := config.DB.Collection("posts")
	ctx := context.Background()

	count, _ := coll.CountDocuments(ctx, bson.M{})
	if count > 0 {
		return // already seeded
	}

	posts := []models.Post{
		{
			ID:     primitive.NewObjectID(),
			UserID: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
			Text:   "Exploring the wonders of Go programming!",
			Content: "Go, also known as Golang, is an open-source programming language designed by Google. " +
				"It makes it easy to build simple, reliable, and efficient software. " +
				"Many developers are drawn to its simplicity and performance.",
			Media: []string{
				"https://picsum.photos/seed/123/200/300",
				"https://picsum.photos/seed/456/200/300",
			},
			Likes:         527,
			CommentsCount: 42,
		}, {
			ID:     primitive.NewObjectID(),
			UserID: "c4e1f2a3-8b7d-4c6a-9d8e-3f2b1c4d5e6f",
			Text:   "Diving into the world of Rust programming!",
			Content: "Rust is a systems programming language focused on safety, speed, and concurrency. " +
				"It empowers developers to write robust and memory-efficient code. " +
				"Many are attracted to its fearless approach to memory management.",
			Media: []string{
				"https://picsum.photos/seed/789/200/300",
				"https://picsum.photos/seed/101/200/300",
			},
			Likes:         342,
			CommentsCount: 19,
		},
	}

	var docs []interface{}
	for _, t := range posts {
		docs = append(docs, t)
	}

	_, err := coll.InsertMany(ctx, docs)
	if err != nil {
		log.Printf("Failed to seed posts: %v", err)
		return
	}

	log.Println("Seeded posts collection")
}
