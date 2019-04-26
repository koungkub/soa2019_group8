package service

import (
	"database/sql"
	"encoding/json"
	"errors"
	"math"
	"time"

	"github.com/labstack/echo"

	"github.com/koungkub/soa2019_group8/parking/circuitbreaker"
)

type ChargeParker interface {
	GetDiscount(url string, token string) ([]ChargeParking, error)
	CalculateDiscount(c echo.Context, id int, chp []ChargeParking) (float64, error)
}

type ChargeParking struct {
	Store  string `json:"store"`
	Amount int    `json:"amount"`
}

func (cp *ChargeParking) CalculateDiscount(c echo.Context, id int, chp []ChargeParking) (float64, error) {

	db := c.Get("db").(*sql.DB)
	tx, err := db.Begin()
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	defer tx.Commit()

	prepareID, err := tx.Prepare("SELECT start_time, department_store_id, status FROM Parking WHERE id=?")
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	defer prepareID.Close()

	var startTime time.Time
	var departmentStoreID int
	var statusParking string
	err = prepareID.QueryRow(id).Scan(&startTime, &departmentStoreID, &statusParking)
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	if statusParking == "exit" {
		return 0, errors.New("user was exited")
	}

	prepareDepartment, err := tx.Prepare("SELECT park_rate, discount_rate, amount_rate FROM DepartmentStore WHERE id=?")
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	defer prepareDepartment.Close()

	var parkRate, discountRate, amountRate int
	err = prepareDepartment.QueryRow(departmentStoreID).Scan(&parkRate, &discountRate, &amountRate)
	if err != nil {
		tx.Rollback()
		return 0, err
	}

	var totalDiscount int
	for _, v := range chp {
		totalDiscount += v.Amount
	}

	rateDiscount := totalDiscount / amountRate
	parkTime := time.Since(startTime)

	prepareUpdate, err := tx.Prepare("UPDATE Parking SET status='exit' WHERE id=?")
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	defer prepareUpdate.Close()

	prepareUpdate.Exec(id)

	return (math.Floor(parkTime.Hours()) * float64(parkRate)) - float64(rateDiscount), nil
}

func (cp *ChargeParking) GetDiscount(url, token string) ([]ChargeParking, error) {

	body, err := circuitbreaker.GetCircuitBreaker(url, token)
	if err != nil {
		return nil, err
	}

	resp := []ChargeParking{}

	err = json.Unmarshal(body, &resp)
	if err != nil {
		return nil, err
	}

	return resp, nil
}
