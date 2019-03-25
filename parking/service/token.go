package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/spf13/viper"

	jwt "github.com/dgrijalva/jwt-go"
)

// CustomToken : extends from jwt standard and append id
type CustomToken struct {
	ID int64 `json:"id"`
	jwt.StandardClaims
}

// GenerateToken : generate a jwt token with id
func GenerateToken(id int, expiresIn time.Duration) (*string, error) {
	time := time.Now()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, CustomToken{
		int64(id),
		jwt.StandardClaims{
			IssuedAt:  time.Unix(),
			ExpiresAt: time.Add(expiresIn).Unix(),
		},
	})

	signedToken, err := token.SignedString([]byte(viper.GetString("SECRET_KEY")))
	if err != nil {
		return nil, err
	}
	return &signedToken, nil
}

// ValidateToken : validate token
func ValidateToken(token string) (*CustomToken, error) {
	parseToken, err := jwt.ParseWithClaims(token, &CustomToken{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(viper.GetString("SECRET_KEY")), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := parseToken.Claims.(*CustomToken); ok && parseToken.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid token")
}
