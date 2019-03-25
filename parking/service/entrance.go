package service

import (
	"database/sql"
	"time"
)

// EntranceParkingService : User entrance to parking
func EntranceParkingService(db *sql.DB, storeID int64) (*int64, error) {

	prepareStatement, err := db.Prepare("INSERT INTO Parking (status, start_time, department_store_id) VALUES (?, ?, ?)")
	if err != nil {
		return nil, err
	}
	defer prepareStatement.Close()

	response, err := prepareStatement.Exec("parking", time.Now(), storeID)
	if err != nil {
		return nil, err
	}

	lastInsertID, err := response.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &lastInsertID, nil
}
