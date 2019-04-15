package controller

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"gopkg.in/go-playground/validator.v9"

	"github.com/koungkub/soa2019_group8/discount/service"
	"github.com/stretchr/testify/assert"

	"github.com/labstack/echo"
)

var (
	codeTest           = "Asdf5"
	generateSuccessful = `{"store": "central","amount": 100}`
	token              = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjo1MTU0OTkzMTQ4LCJpYXQiOjE1NTQ5OTY3NDh9.0c2K2miwiBMvauwjwdAqt3ZREgKomAYYBPYp2aKVVDo"
)

type DiscountTest struct {
	Store  string
	Amount int
	parkID int
}

func (d *DiscountTest) ListDiscount(c echo.Context) ([]service.Discount, error) {
	return nil, nil
}

func (d *DiscountTest) SetParkID(parkID int) {

}

func (d *DiscountTest) Clear() {

}

func (d *DiscountTest) GenerateDiscount(c echo.Context) (*string, error) {
	return &codeTest, nil
}

func (d *DiscountTest) EnterDiscount(c echo.Context, code string) error {
	if code == codeTest {
		return nil
	}
	return errors.New("code error")
}

func TestListDiscount(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/discount")

	testStruct := &DiscountTest{}

	if assert.NoError(t, ListDiscountController(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestEnterDiscountFailure(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/discount/:code")
	c.SetParamNames("code")
	c.SetParamValues("qwerty")

	testStruct := &DiscountTest{}

	if assert.Error(t, EnterDiscountController(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestEnterDiscountTokenFailure(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token+"a")
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/discount/:code")
	c.SetParamNames("code")
	c.SetParamValues("qwerty")

	testStruct := &DiscountTest{}

	if assert.Error(t, EnterDiscountController(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestEnterDiscountPass(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Authorization", token)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.SetPath("/parking/discount/:code")
	c.SetParamNames("code")
	c.SetParamValues(codeTest)

	testStruct := &DiscountTest{}

	if assert.NoError(t, EnterDiscountController(testStruct)(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestGenerateDiscountPass(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(generateSuccessful))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	c.Set("validate", validator.New())
	c.SetPath("/admin/discount")

	testStruct := &DiscountTest{}

	if assert.NoError(t, GenerateDiscountController(testStruct)(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
	}
}
