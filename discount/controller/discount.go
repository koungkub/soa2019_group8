package controller

import (
	"net/http"

	"gopkg.in/go-playground/validator.v9"

	"github.com/koungkub/soa2019_group8/discount/service"
	"github.com/labstack/echo"
)

// ListDiscountController : list all discount from id (token)
func ListDiscountController(discounter service.Discounter) echo.HandlerFunc {
	return func(c echo.Context) error {

		bearer := c.Request().Header.Get("Authorization")

		token, err := service.ValidateToken(bearer[7:])
		if err != nil {
			return echo.NewHTTPError(http.StatusForbidden, "token invalid")
		}

		discounter.SetParkID(int(token.ID))

		information, err := discounter.ListDiscount(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "can not list discount")
		}

		return c.JSON(http.StatusOK, information)
	}
}

// EnterDiscountController : enter discount code
func EnterDiscountController(discounter service.Discounter) echo.HandlerFunc {
	return func(c echo.Context) error {

		code := c.Param("code")
		bearer := c.Request().Header.Get("Authorization")

		token, err := service.ValidateToken(bearer[7:])
		if err != nil {
			return echo.NewHTTPError(http.StatusForbidden, "token invalid")
		}

		discounter.SetParkID(int(token.ID))

		err = discounter.EnterDiscount(c, code)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "can not enter discount code")
		}

		return c.JSON(http.StatusOK, echo.Map{
			"message": "enter discount successful",
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

		return c.JSON(http.StatusCreated, echo.Map{
			"code": discountCode,
		})
	}
}
