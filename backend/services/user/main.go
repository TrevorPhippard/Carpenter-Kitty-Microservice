package main

import (
	"fmt"
	"log"
	"net/http"
	"user/config"
	"user/handlers"
	"user/models"
	"user/seed"
)

func main() {
	// Connect to database
	config.ConnectDatabase()

	// Migrate schema
	models.Migrate(config.DB)

	// Seed database if empty
	seed.SeedDatabase()

	// Routes
	http.HandleFunc("/users", handlers.UsersHandler)
	http.HandleFunc("/users/", handlers.UserHandler)

	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
