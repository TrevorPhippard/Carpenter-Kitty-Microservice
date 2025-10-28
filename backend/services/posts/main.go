package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"posts/config"
	"posts/handlers"
	"posts/middleware"
	"posts/seed"
)

func main() {
	// Load MongoDB
	config.Init()

	// Seed database if empty
	seed.Run()

	mux := http.NewServeMux()

	// Root
	mux.Handle("/", middleware.Chain(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Post API is running"))
	})))

	// API routes
	mux.Handle("/api/", middleware.Chain(http.HandlerFunc(apiHandler)))

	port := os.Getenv("POST_SERVICE_PORT")
	if port == "" {
		port = "5002"
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api")
	segments := strings.Split(strings.Trim(path, "/"), "/")

	if len(segments) == 0 || segments[0] != "posts" {
		http.NotFound(w, r)
		return
	}

	// /api/posts
	if len(segments) == 1 {
		switch r.Method {
		case http.MethodGet:
			log.Println("posts	APIHandler GetPosts called")

			handlers.GetPosts(w, r)
		case http.MethodPost:
			handlers.CreatePost(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
		return
	}

	// /api/posts/{id}
	if len(segments) == 2 {
		switch r.Method {
		case http.MethodPatch:
			handlers.UpdatePost(w, r)
		case http.MethodDelete:
			handlers.DeletePost(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
		return
	}

	http.NotFound(w, r)
}
