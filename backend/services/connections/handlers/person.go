package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"connections/models"
	"connections/repository"
)

type PersonHandler struct {
	Repo *repository.Neo4jRepository
}

func NewPersonHandler(repo *repository.Neo4jRepository) *PersonHandler {
	return &PersonHandler{Repo: repo}
}

func (h *PersonHandler) CreatePersonHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var p models.Person
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.Repo.CreatePerson(context.Background(), p); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func (h *PersonHandler) PersonHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/persons/"):]
	ctx := context.Background()

	switch r.Method {
	case http.MethodGet:
		person, err := h.Repo.GetPerson(ctx, id)
		if err != nil {
			http.Error(w, "Person not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(person)
	case http.MethodPut:
		var p models.Person
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		p.ID = id
		if err := h.Repo.UpdatePerson(ctx, p); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(p)
	case http.MethodDelete:
		if err := h.Repo.DeletePerson(ctx, id); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "deleted"})
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
