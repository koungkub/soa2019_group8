package circuitbreaker

import (
	"io/ioutil"
	"net/http"
	"time"

	"github.com/sony/gobreaker"
)

var (
	cb *gobreaker.CircuitBreaker
)

func SettingCircuitBreaker() {

	var st gobreaker.Settings
	st.Name = "HTTP GET circuit breaker"

	cb = gobreaker.NewCircuitBreaker(st)
}

func GetCircuitBreaker(url, token string) ([]byte, error) {
	body, err := cb.Execute(func() (interface{}, error) {
		req, err := http.NewRequest(http.MethodGet, url, nil)
		if err != nil {
			return nil, err
		}

		req.Header.Set("Authorization", "Bearer "+token)
		client := &http.Client{Timeout: time.Second * 10}

		resp, err := client.Do(req)
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
