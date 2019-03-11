package controller

import (
	"github.com/koungkub/soa2019_group8/backend/repository"
	"github.com/labstack/echo"
)

// EntranceParking : User entrance to parking
func EntranceParking() echo.HandlerFunc {
	return func(c echo.Context) error {
		db := repository.GetDBConnection()

	}
}
