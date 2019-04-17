package middlewares

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
)

// JWTValidate ; validate token before process
func JWTValidate() echo.MiddlewareFunc {

	return middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(viper.GetString("SECRET_KEY")),
		Claims:     jwt.MapClaims{},
	})
}
