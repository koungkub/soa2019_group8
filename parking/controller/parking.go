package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/koungkub/soa2019_group8/parking/service"

	"github.com/labstack/echo"
)

// EntranceParking : Entrance to parking
func EntranceParking() echo.HandlerFunc {
	return func(c echo.Context) error {

		db := c.Get("db").(*sql.DB)
		storeID, _ := strconv.Atoi(c.Param("id"))

		id, err := service.EntranceParkingService(db, int64(storeID))
		if err != nil {
			return echo.NewHTTPError(422, "Can not entrance to parking")
		}
		token, err := service.GenerateToken(id, 24*time.Hour)
		if err != nil {
			return echo.NewHTTPError(422, "Generate token error")
		}

		authorizationHeader := fmt.Sprintf("Bearer %s", *token)
		c.Response().Header().Set("Authorization", authorizationHeader)

		return c.JSON(http.StatusCreated, echo.Map{
			"message": "entrance to parking success",
		})
	}
}
