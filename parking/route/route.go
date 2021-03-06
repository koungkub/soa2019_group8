package route

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/parking/service"

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
				echo.HeaderAccessControlExposeHeaders,
			},
			AllowMethods: []string{
				http.MethodGet,
				http.MethodPost,
			},
			ExposeHeaders: []string{
				echo.HeaderAuthorization,
			},
		}),
	)

	// Custom middleware
	e.Use(
		middlewares.DatabaseTransaction(repository.GetDBConnection()),
	)

	// Service registry
	eureka := repository.GetServiceRegistry()
	instance := repository.GetServiceRegistryInstance()

	eureka.RegisterInstance(instance)
	eureka.HeartBeatInstance(instance)
	eureka.UpdateInstanceStatus(instance, "UP")

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
		parking.GET("", controller.GetTimeController(new(service.ParkingTimeService)), middlewares.JWTValidate())
		parking.GET("/exit", controller.ExitParking(new(service.ChargeParking)), middlewares.JWTValidate())
		parking.GET("/entrance/:id", controller.EntranceParking(new(service.EntranceParkingService)))
	}

	return e
}
