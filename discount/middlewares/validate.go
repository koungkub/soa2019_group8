package middlewares

import (
	"github.com/labstack/echo"
	"gopkg.in/go-playground/validator.v9"
)

// ValidatorInstance : return validate instance
func ValidatorInstance(validate *validator.Validate) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {

			c.Set("validate", validate)
			if err := next(c); err != nil {
				return err
			}
			return nil
		})
	}
}
