package service

import (
	"database/sql"
	"time"

	"github.com/labstack/echo"
)

// Entrancer : interface for easy to write test
type Entrancer interface {
	Entrance(c echo.Context) (*int64, error)
	GetID() int
	SetID(id int)
}

// EntranceParkingService : struct to store storeID from user
type EntranceParkingService struct {
	ID int
}

// GetID : getter id
func (ep *EntranceParkingService) GetID() int {
	return ep.ID
}

// SetID : setter id
func (ep *EntranceParkingService) SetID(id int) {
	ep.ID = id
}

// Entrance : insert data to database
func (ep *EntranceParkingService) Entrance(c echo.Context) (*int64, error) {

	db := c.Get("db").(*sql.DB)

	prepareStatement, err := db.Prepare("INSERT INTO Parking (status, start_time, department_store_id) VALUES (?, ?, ?)")
	if err != nil {
		return nil, err
	}
	defer prepareStatement.Close()

	response, err := prepareStatement.Exec("parking", time.Now(), ep.ID)
	if err != nil {
		return nil, err
	}

	lastInsertID, err := response.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &lastInsertID, nil
}
