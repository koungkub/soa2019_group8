package controller

import (
	"net/http"

	"github.com/koungkub/soa2019_group8/parking/service"
	"github.com/labstack/echo"
)

// GetTimeController : get time from database
func GetTimeController(parkingTime service.ParkingTime) echo.HandlerFunc {
	return func(c echo.Context) error {

		bearer := c.Request().Header.Get("Authorization")[7:]

		addressBearer := &bearer
		token, err := service.ValidateToken(addressBearer)
		if err != nil {
			return echo.NewHTTPError(http.StatusForbidden, "token invalid")
		}

		err = parkingTime.GetTime(c, int(token.ID))
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "get time error")
		}

		err = parkingTime.GetDepartmentStore(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, "get departmentstore error")
		}

		return c.JSON(http.StatusOK, parkingTime)
	}
}
