package middlewares

import (
	"database/sql"

	"github.com/labstack/echo"
)

// DatabaseTransaction : set up database as middleware
func DatabaseTransaction(db *sql.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {

			c.Set("db", db)
			if err := next(c); err != nil {
				return err
			}
			return nil
		})
	}
}
