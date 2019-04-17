package service

import (
	"database/sql"
	"time"

	"github.com/labstack/echo"
)

// ParkingTime : interface for parkingtimeservice
type ParkingTime interface {
	GetTime(echo.Context, int) error
	GetDepartmentStore(echo.Context) error
}

// ParkingTimeService : entity for parking
type ParkingTimeService struct {
	StartTime         time.Time `json:"startTime"`
	DepartmentStoreID int       `json:"-"`
	ParkRate          int       `json:"parkRate"`
	DiscountRate      int       `json:"discountRate"`
	AmountRate        int       `json:"amountRate"`
}

// GetDepartmentStore : get departmentstore from DepartmentStore table
func (ps *ParkingTimeService) GetDepartmentStore(c echo.Context) error {

	db := c.Get("db").(*sql.DB)

	prepare, err := db.Prepare("SELECT park_rate, discount_rate, amount_rate FROM DepartmentStore WHERE id=?")
	if err != nil {
		return err
	}
	defer prepare.Close()

	err = prepare.QueryRow(ps.DepartmentStoreID).Scan(&ps.ParkRate, &ps.DiscountRate, &ps.AmountRate)
	if err != nil {
		return err
	}

	return nil
}

// GetTime : get time from Parking
func (ps *ParkingTimeService) GetTime(c echo.Context, id int) error {

	db := c.Get("db").(*sql.DB)

	prepare, err := db.Prepare("SELECT start_time, department_store_id FROM Parking WHERE id=?")
	if err != nil {
		return err
	}
	defer prepare.Close()

	err = prepare.QueryRow(id).Scan(&ps.StartTime, &ps.DepartmentStoreID)
	if err != nil {
		return err
	}

	return nil
}
