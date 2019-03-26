package service

import (
	"database/sql"
	"time"

	"github.com/labstack/echo"
)

type Entrancer interface {
	Entrance(c echo.Context) (*int64, error)
	GetID() int
	SetID(id int)
}

type EntranceParkingService struct {
	ID int
}

func (ep *EntranceParkingService) GetID() int {
	return ep.ID
}

func (ep *EntranceParkingService) SetID(id int) {
	ep.ID = id
}

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
