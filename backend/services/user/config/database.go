package config

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=userdb port=5432 sslmode=disable"
	var err error

	// Attempt connection with retries
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			fmt.Println("Database connection established")
			return
		}
		fmt.Println("Waiting for database...")
		time.Sleep(3 * time.Second)
	}
	log.Fatal("Failed to connect to database:", err)
}
