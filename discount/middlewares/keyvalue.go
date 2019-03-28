package middlewares

import (
	"github.com/go-redis/redis"
	"github.com/labstack/echo"
)

// KeyValueTransaction : set update redis as middleware
func KeyValueTransaction(redis *redis.Client) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {

			c.Set("redis", redis)
			if err := next(c); err != nil {
				return err
			}
			return nil
		})
	}
}
