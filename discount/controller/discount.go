package controller

import (
	"net/http"

	"github.com/sirupsen/logrus"

	"gopkg.in/go-playground/validator.v9"

	"github.com/koungkub/soa2019_group8/discount/service"
	"github.com/labstack/echo"
)

func EnterDiscountController(discounter service.Discounter) echo.HandlerFunc {
	return func(c echo.Context) error {
		err := discounter.EnterDiscount(c, "7vyJmD")
		if err != nil {
			logrus.Debug("err naja ", err)
		}

		return c.JSON(200, echo.Map{
			"messgea": "sd",
		})
	}
}

// GenerateDiscountController : generate a discount code
func GenerateDiscountController(discounter service.Discounter) echo.HandlerFunc {
	return func(c echo.Context) error {

		discounter.Clear()
		if err := c.Bind(discounter); err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "bind value error")
		}

		validateInstance := c.Get("validate").(*validator.Validate)
		err := validateInstance.Struct(discounter)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "validate value error")
		}

		discountCode, err := discounter.GenerateDiscount(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "can not generate discount code")
		}

		return c.JSON(200, echo.Map{
			"discountCode": discountCode,
		})
	}
}
