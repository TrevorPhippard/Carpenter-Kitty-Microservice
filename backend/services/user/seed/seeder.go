package seed

import (
	"fmt"
	"user/config"
	"user/models"
)

func SeedDatabase() {
	var count int64
	config.DB.Model(&models.User{}).Count(&count)
	if count == 0 {
		users := []models.User{
			{Name: "Alice", Email: "alice@example.com", Password: "password1"},
			{Name: "Bob", Email: "bob@example.com", Password: "password2"},
			{Name: "Charlie", Email: "charlie@example.com", Password: "password3"},
		}
		for _, user := range users {
			config.DB.Create(&user)
		}
		fmt.Println("Seeded database with sample users.")
	} else {
		fmt.Println("Database already has users, skipping seeding.")
	}
}
