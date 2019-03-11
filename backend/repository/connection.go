package repository

import (
	"database/sql"
	"fmt"

	"github.com/sirupsen/logrus"

	"github.com/spf13/viper"
)

// DBConnection : Get database URL connection
func DBConnection() *sql.DB {

	dbURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		viper.GetString("DB_USERNAME"),
		viper.GetString("DB_PASSWORD"),
		viper.GetString("DB_HOST"),
		viper.GetString("DB_PORT"),
		viper.GetString("DB_DATABASE"))
	fmt.Println("one")
	db, err := sql.Open("mysql", dbURL)

	if err != nil {
		logrus.Errorf("Database URL was wrong error is : %s", err)
		return nil
	}

	return db
}

// GetDBConnection : Get database connection
func GetDBConnection() *sql.DB {

	db := DBConnection()
	fmt.Println("two")
	if err := db.Ping(); err != nil {
		defer db.Close()
		logrus.Errorf("Can not connect to database error is : %s", err)
		return nil
	}

	return db
}
