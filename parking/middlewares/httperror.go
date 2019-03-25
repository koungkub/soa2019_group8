package middlewares

import (
	"github.com/labstack/echo"
)

// HTTPErrorHandler : Handle error was happend in service
func HTTPErrorHandler(err error, c echo.Context) {

	if errors, ok := err.(*echo.HTTPError); ok {
		c.JSON(errors.Code, echo.Map{
			"message": errors.Message,
		})
	}
}
