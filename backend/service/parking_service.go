package service

import (
	"database/sql"
	"time"
)

// EntranceParkingService : User entrance to parking
func EntranceParkingService(db *sql.DB) error {
	stmt, err := db.Prepare("INSERT INTO `parking` (`status`, `rate`, start_time) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec("parking", 200, time.Now())
	if err != nil {
		return err
	}
	return nil
}
