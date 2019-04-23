package controller

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/labstack/echo"
)

var (
	token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjo1MTU0OTkzMTQ4LCJpYXQiOjE1NTQ5OTY3NDh9.0c2K2miwiBMvauwjwdAqt3ZREgKomAYYBPYp2aKVVDo"
)

type TestParkingTime struct {
	StartTime         time.Time `json:"startTime"`
	DepartmentStoreID int       `json:"-"`
	ParkRate          int       `json:"parkRate"`
	DiscountRate      int       `json:"discountRate"`
	AmountRate        int       `json:"amountRate"`
}

func (t *TestParkingTime) GetTime(c echo.Context, i int) error {

	return nil
}

func (t *TestParkingTime) GetDepartmentStore(c echo.Context) error {

	return nil
}

func TestGetInformationPass(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking")

	testStruct := new(TestParkingTime)

	if assert.NoError(t, GetTimeController(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}
