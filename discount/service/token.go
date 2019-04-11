package service

import (
	"errors"
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/spf13/viper"
)

// CustomToken : extends from jwt standard and append id
type CustomToken struct {
	ID int64 `json:"id"`
	jwt.StandardClaims
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
