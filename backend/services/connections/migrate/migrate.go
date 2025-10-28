package migrate

import (
	"context"
	"log"
	"math/rand"
	"time"

	"connections/models"
	"connections/repository"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

// MigrateAndSeed seeds initial data and relationships if DB is empty
func MigrateAndSeed(ctx context.Context, repo *repository.Neo4jRepository) error {
	exists, err := repo.HasPersons(ctx)
	if err != nil {
		return err
	}

	if exists {
		log.Println("Database already has data, skipping seeding")
		return nil
	}

	log.Println("Seeding initial data...")

	people := []models.Person{
		{ID: "1", Name: "Alice", Age: 30},
		{ID: "2", Name: "Bob", Age: 25},
		{ID: "3", Name: "Charlie", Age: 28},
		{ID: "4", Name: "David", Age: 32},
		{ID: "5", Name: "Eva", Age: 27},
	}

	// Seed people nodes
	if err := repo.SeedPersons(ctx, people); err != nil {
		return err
	}

	// Seed FRIENDS_WITH relationships randomly
	if err := seedFriendships(ctx, repo, people); err != nil {
		return err
	}

	log.Println("Seeding completed!")
	return nil
}

// seedFriendships creates random FRIENDS_WITH relationships between people
func seedFriendships(ctx context.Context, repo *repository.Neo4jRepository, people []models.Person) error {
	rand.Seed(time.Now().UnixNano())
	session := repo.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		for _, p1 := range people {
			// Each person will have 1-3 friends randomly
			numFriends := rand.Intn(3) + 1
			friendIndices := rand.Perm(len(people))
			count := 0
			for _, i := range friendIndices {
				p2 := people[i]
				if p1.ID == p2.ID {
					continue
				}

				// Create friendship only if not already exists
				_, err := tx.Run(ctx,
					`MATCH (a:Person {id:$id1}), (b:Person {id:$id2})
					 MERGE (a)-[:FRIENDS_WITH]->(b)`,
					map[string]any{"id1": p1.ID, "id2": p2.ID},
				)
				if err != nil {
					return nil, err
				}

				count++
				if count >= numFriends {
					break
				}
			}
		}
		return nil, nil
	})

	return err
}
