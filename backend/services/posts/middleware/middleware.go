package middleware

import (
	"log"
	"net/http"
)

// Chain applies middleware to a handler
func Chain(next http.Handler) http.Handler {
	return Logger(next)
}

// Logger logs requests
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
