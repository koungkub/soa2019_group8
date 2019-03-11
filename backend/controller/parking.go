package controller

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/backend/repository"
	"github.com/koungkub/soa2019_group8/backend/service"
	"github.com/labstack/echo"
)

// EntranceParking : User entrance to parking
func EntranceParking() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := repository.GetDBConnection()

		err := service.EntranceParkingService(db)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "Failed")
		}
		return c.JSON(http.StatusOK, echo.Map{
			"message": "ok",
		})
	}
}
