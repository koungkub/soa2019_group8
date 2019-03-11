// +build integration

package controller

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/labstack/echo"
)

func TestRoute(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/parking/entrance", nil)
	rec := httptest.NewRecorder

	e := echo.New()
	c := e.NewContext(req, rec)

	if assert.NoError(t, EntranceParking(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}
