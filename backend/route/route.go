package route

import (
	"github.com/koungkub/soa2019_group8/backend/controller"
	"net/http"

	"github.com/koungkub/soa2019_group8/backend/repository"

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
			Level: 3,
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
	e.Use(
		middlewares.DatabaseTransaction(repository.GetDBConnection()),
	)

	// Error handler
	e.HTTPErrorHandler = middlewares.HTTPErrorHandler

	// Health check
	e.GET("/_/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "health",
		})
	})

	e.Group("/parking")
	{
		e.GET("/entrance", controller.EntranceParking())
	}

	return e
}
