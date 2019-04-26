package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/spf13/viper"

	"github.com/koungkub/soa2019_group8/parking/service"

	"github.com/labstack/echo"
)

// ExitParking : exit from parking
func ExitParking(exit service.ChargeParker) echo.HandlerFunc {
	return func(c echo.Context) error {

		reqBearer := c.Request().Header.Get("Authorization")
		bearer := reqBearer[7:]
		addressBearer := &bearer

		token, err := service.ValidateToken(addressBearer)
		if err != nil {
			return echo.NewHTTPError(http.StatusForbidden, "token error")
		}

		chargePark, err := exit.GetDiscount(viper.GetString("DISCOUNT_SERVICE_URL")+viper.GetString("DISCOUNT_SERVICE_PATH"), bearer)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "can not get discount from discount service")
		}

		totalAmount, err := exit.CalculateDiscount(c, int(token.ID), chargePark)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "can not compute expenses")
		}

		return c.JSON(200, echo.Map{
			"amount": totalAmount,
		})

	}
}

// EntranceParking : Entrance to parking
func EntranceParking(entrance service.Entrancer) echo.HandlerFunc {
	return func(c echo.Context) error {

		storeID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "id only accept type int")
		}

		entrance.SetID(storeID)

		id, err := entrance.Entrance(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "Can not entrance to parking, departmentstore id not found")
		}
		token, err := service.GenerateToken(id, 48*time.Hour)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "Generate token error")
		}

		authorizationHeader := fmt.Sprintf("Bearer %s", *token)
		c.Response().Header().Set("Authorization", authorizationHeader)

		return c.JSON(http.StatusCreated, echo.Map{
			"message": "entrance to parking success",
		})
	}
}
