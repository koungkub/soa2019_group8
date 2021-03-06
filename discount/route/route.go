package route

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/discount/controller"
	"github.com/koungkub/soa2019_group8/discount/service"
	"gopkg.in/go-playground/validator.v9"

	"github.com/koungkub/soa2019_group8/discount/repository"

	"github.com/koungkub/soa2019_group8/discount/middlewares"
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
		middlewares.KeyValueTransaction(repository.GetRedisConnection()),
		middlewares.ValidatorInstance(validator.New()),
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

	discount := e.Group("/discount")
	{
		discount.GET("", controller.ListDiscountController(new(service.Discount)), middlewares.JWTValidate())
		discount.GET("/:code", controller.EnterDiscountController(new(service.Discount)), middlewares.JWTValidate())
		discount.POST("/code", controller.GenerateDiscountController(new(service.Discount)))
	}

	return e
}
