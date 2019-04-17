package repository

import (
	"database/sql"

	"fmt"

	"github.com/sirupsen/logrus"

	"github.com/spf13/viper"

	_ "github.com/go-sql-driver/mysql"
)

// GetDBConnection : Get database connection
func GetDBConnection() *sql.DB {

	dbURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		viper.GetString("DB_USERNAME"),
		viper.GetString("DB_PASSWORD"),
		viper.GetString("DB_HOST"),
		viper.GetString("DB_PORT"),
		viper.GetString("DB_DATABASE"))

	db, err := sql.Open("mysql", dbURL)

	if err != nil {
		logrus.Errorf("Database URL was wrong, error is : %s", err)
		return nil
	}

	return db
}
