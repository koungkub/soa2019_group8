package middlewares

import (
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo"
	"github.com/sony/gobreaker"
)

var (
	cb *gobreaker.CircuitBreaker
)

func settingCircuitBreaker() {

	var st gobreaker.Settings
	st.Name = "HTTP GET circuit breaker"

	cb = gobreaker.NewCircuitBreaker(st)
}

func getCircuitBreaker(url string) ([]byte, error) {
	body, err := cb.Execute(func() (interface{}, error) {
		resp, err := http.Get(url)
		if err != nil {
			return nil, err
		}
		if resp != nil {
			defer resp.Body.Close()
		}

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}

		return body, nil
	})

	if err != nil {
		return nil, err
	}

	return body.([]byte), nil
}

func CircuitBreaker() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {

			settingCircuitBreaker()

			c.Set("breaker", getCircuitBreaker)
			if err := next(c); err != nil {
				return err
			}

			return nil
		})
	}
}
