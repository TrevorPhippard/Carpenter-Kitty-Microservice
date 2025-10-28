package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title         string             `bson:"title" json:"title"`
	Content       string             `bson:"content" json:"content"`
	Media         []string           `bson:"media" json:"media"`
	Likes         int                `bson:"likes" json:"likes"`
	CommentsCount int                `bson:"commentsCount" json:"commentsCount"`
	UserID        string             `bson:"userId" json:"userId"`
	Text          string             `bson:"text" json:"text"`
}
