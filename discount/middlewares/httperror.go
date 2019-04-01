package middlewares

import (
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

// HTTPErrorHandler : Handle error was happend in service
func HTTPErrorHandler(err error, c echo.Context) {

	if errors, ok := err.(*echo.HTTPError); ok {
		logrus.Error(errors.Message)
		c.JSON(errors.Code, echo.Map{
			"message": errors.Message,
		})
	}
}
