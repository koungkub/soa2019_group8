package service

import (
	"testing"
	"time"
)

func TestGenerateToken(t *testing.T) {
	var i int64 = 1

	id := &i
	_, err := GenerateToken(id, 1*time.Hour)
	if err != nil {
		t.Fatal("generate token failure")
	}
}

func TestGenerateAndVerifyToken(t *testing.T) {
	var i int64 = 1

	id := &i
	token, err := GenerateToken(id, 1*time.Hour)
	if err != nil {
		t.Fatal("generate token failure")
	}

	result, err := ValidateToken(token)
	if err != nil {
		t.Fatal("validate not passed")
	}
	if result.ID != i {
		t.Fatalf("token id was wrong, expect %d", i)
	}
}
