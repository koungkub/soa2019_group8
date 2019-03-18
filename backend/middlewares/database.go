package middlewares

import (
	"database/sql"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

func DatabaseTransaction(db *sql.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {

			c.Set("db", db)

			if err := next(c); err != nil {
				logrus.Warnf("Database middleware failed, error is : %s", err)
				return err
			}
			return nil
		})
	}
}
