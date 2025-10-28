package main

import (
	"context"
	"log"
	"net/http"

	"connections/handlers"
	"connections/migrate"
	"connections/repository"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

func main() {
	driver, err := neo4j.NewDriverWithContext("neo4j://localhost:7687", neo4j.BasicAuth("neo4j", "password", ""))
	if err != nil {
		log.Fatal(err)
	}
	defer driver.Close(context.Background())

	repo := repository.NewRepository(driver)

	if err := migrate.MigrateAndSeed(context.Background(), repo); err != nil {
		log.Fatal(err)
	}

	personHandler := handlers.NewPersonHandler(repo)

	http.HandleFunc("/persons", personHandler.CreatePersonHandler)
	http.HandleFunc("/persons/", personHandler.PersonHandler)

	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
