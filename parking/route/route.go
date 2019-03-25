package route

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/parking/controller"
	"github.com/koungkub/soa2019_group8/parking/repository"

	"github.com/koungkub/soa2019_group8/parking/middlewares"
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

	parking := e.Group("/parking")
	{
		parking.GET("/entrance", controller.EntranceParking())
	}

	return e
}
