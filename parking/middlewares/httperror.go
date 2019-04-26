package middlewares

import (
	"github.com/koungkub/soa2019_group8/parking/logger"
	"github.com/labstack/echo"
)

// HTTPErrorHandler : Handle error was happend in service
func HTTPErrorHandler(err error, c echo.Context) {

	logger := logger.GetLog()

	if errors, ok := err.(*echo.HTTPError); ok {
		logger.Error(errors.Message)
		c.JSON(errors.Code, echo.Map{
			"message": errors.Message,
		})
	}
}
