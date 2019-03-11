package controller

import (
	"net/http"

	"github.com/labstack/echo"
)

// Route : Create echo instance
func Route() *echo.Echo {
	e := echo.New()

	e.GET("/_/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "healthy",
		})
	})

	return e
}
