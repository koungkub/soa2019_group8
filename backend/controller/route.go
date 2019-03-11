package controller

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/backend/middlewares"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// Route : Create echo instance
func Route() *echo.Echo {
	e := echo.New()

	// Basic middleware
	e.Use(
		middleware.Recover(),
		middleware.Secure(),
		middleware.RequestID(),
		middleware.BodyLimit("2M"),
		middleware.GzipWithConfig(middleware.GzipConfig{
			Level: 5,
		}),
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: []string{"*"},
			AllowHeaders: []string{
				echo.HeaderOrigin,
				echo.HeaderContentType,
				echo.HeaderAccept,
				echo.HeaderAuthorization,
				echo.HeaderAcceptEncoding,
				echo.HeaderContentLength,
			},
			AllowMethods: []string{
				http.MethodGet,
				http.MethodPost,
				http.MethodPut,
				http.MethodDelete,
			},
		}),
	)

	// Custom middleware
	e.HTTPErrorHandler = middlewares.HTTPErrorHandler

	// Health check path
	e.GET("/_/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "healthy",
		})
	})

	return e
}
