package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/koungkub/soa2019_group8/parking/service"

	"github.com/labstack/echo"
)

// EntranceParking : Entrance to parking
func EntranceParking(entrance service.Entrancer) echo.HandlerFunc {
	return func(c echo.Context) error {

		storeID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "{id} only accept type int")
		}

		entrance.SetID(storeID)

		id, err := entrance.Entrance(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "Can not entrance to parking, departmentstore id not found")
		}
		token, err := service.GenerateToken(id, 24*time.Hour)
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
