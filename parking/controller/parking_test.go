package controller

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/koungkub/soa2019_group8/parking/service"

	"github.com/stretchr/testify/assert"

	"github.com/labstack/echo"
)

type TestEntrance struct {
	ID int
}

// GetID : getter id
func (ep *TestEntrance) GetID() int {
	return ep.ID
}

// SetID : setter id
func (ep *TestEntrance) SetID(id int) {
	ep.ID = id
}

func (ep *TestEntrance) Entrance(c echo.Context) (*int64, error) {
	var num int64
	num = int64(ep.ID)
	i := &num
	return i, nil
}

func TestParkingShouldBePass(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/entrance/:id")
	c.SetParamNames("id")
	c.SetParamValues("1")

	testStruct := &TestEntrance{}

	if assert.NoError(t, EntranceParking(testStruct)(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
	}
}

func TestParkingWithBadPathParam(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/entrance/:id")
	c.SetParamNames("id")
	c.SetParamValues("a")

	testStruct := &TestEntrance{}

	if assert.Error(t, EntranceParking(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

type ChargeParktest struct {
	Amount int
	Store  string
}

func (cpt *ChargeParktest) GetDiscount(url string, token string) ([]service.ChargeParking, error) {
	return nil, nil
}

func (cpt *ChargeParktest) CalculateDiscount(c echo.Context, id int, chp []service.ChargeParking) (float64, error) {
	return 0.0, nil
}

func TestExitFromParkingPass(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/exit")

	testStruct := &ChargeParktest{}

	if assert.NoError(t, ExitParking(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}
