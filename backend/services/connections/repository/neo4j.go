package repository

import (
	"context"

	"connections/models"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type Neo4jRepository struct {
	Driver neo4j.DriverWithContext
}

// NewRepository creates a new Neo4j repository
func NewRepository(driver neo4j.DriverWithContext) *Neo4jRepository {
	return &Neo4jRepository{Driver: driver}
}

// Check if Person nodes exist
func (r *Neo4jRepository) HasPersons(ctx context.Context) (bool, error) {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close(ctx)

	exists, err := session.ExecuteRead(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		result, err := tx.Run(ctx, "MATCH (p:Person) RETURN count(p) > 0 AS exists", nil)
		if err != nil {
			return nil, err
		}
		record, err := result.Single(ctx)
		if err != nil {
			return nil, err
		}
		return record.Values[0].(bool), nil
	})
	if err != nil {
		return false, err
	}
	return exists.(bool), nil
}

// Seed initial Person data
func (r *Neo4jRepository) SeedPersons(ctx context.Context, people []models.Person) error {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		for _, p := range people {
			_, err := tx.Run(ctx,
				"CREATE (p:Person {id:$id, name:$name, age:$age})",
				map[string]any{"id": p.ID, "name": p.Name, "age": p.Age},
			)
			if err != nil {
				return nil, err
			}
		}
		return nil, nil
	})
	return err
}

// Fetch a single person
func (r *Neo4jRepository) GetPerson(ctx context.Context, id string) (*models.Person, error) {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close(ctx)

	record, err := session.ExecuteRead(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		result, err := tx.Run(ctx,
			"MATCH (p:Person {id:$id}) RETURN p.name AS name, p.age AS age",
			map[string]any{"id": id},
		)
		if err != nil {
			return nil, err
		}
		return result.Single(ctx)
	})
	if err != nil {
		return nil, err
	}

	rec := record.(neo4j.Record)
	return &models.Person{
		ID:   id,
		Name: rec.Values[0].(string),
		Age:  int(rec.Values[1].(int64)),
	}, nil
}

// Create a person
func (r *Neo4jRepository) CreatePerson(ctx context.Context, p models.Person) error {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		_, err := tx.Run(ctx,
			"CREATE (p:Person {id:$id, name:$name, age:$age})",
			map[string]any{"id": p.ID, "name": p.Name, "age": p.Age},
		)
		return nil, err
	})
	return err
}

// Update a person
func (r *Neo4jRepository) UpdatePerson(ctx context.Context, p models.Person) error {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		_, err := tx.Run(ctx,
			"MATCH (p:Person {id:$id}) SET p.name=$name, p.age=$age RETURN p",
			map[string]any{"id": p.ID, "name": p.Name, "age": p.Age},
		)
		return nil, err
	})
	return err
}

// Delete a person
func (r *Neo4jRepository) DeletePerson(ctx context.Context, id string) error {
	session := r.Driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close(ctx)

	_, err := session.ExecuteWrite(ctx, func(tx neo4j.ManagedTransaction) (any, error) {
		_, err := tx.Run(ctx,
			"MATCH (p:Person {id:$id}) DELETE p",
			map[string]any{"id": id},
		)
		return nil, err
	})
	return err
}
