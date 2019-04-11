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
			},
			AllowMethods: []string{
				http.MethodGet,
				http.MethodPost,
			},
		}),
	)

	// Custom middleware
	e.Use(
		middlewares.DatabaseTransaction(repository.GetDBConnection()),
		middlewares.KeyValueTransaction(repository.GetRedisConnection()),
		middlewares.ValidatorInstance(validator.New()),
	)

	// Error handler
	e.HTTPErrorHandler = middlewares.HTTPErrorHandler

	// Health check
	e.GET("/_/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "health",
		})
	})

	admin := e.Group("/admin")
	{
		admin.POST("/discount", controller.GenerateDiscountController(new(service.Discount)))
	}

	parking := e.Group("/parking")
	{
		parking.GET("/discount/:code", controller.EnterDiscountController(new(service.Discount)))
	}

	return e
}
