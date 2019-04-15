package service

import (
	"database/sql"
	"errors"
	"time"

	"github.com/go-redis/redis"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/random"
)

// Discounter : interface for Discount
type Discounter interface {
	EnterDiscount(c echo.Context, code string) error
	GenerateDiscount(c echo.Context) (*string, error)
	Clear()
	SetParkID(parkID int)
	ListDiscount(c echo.Context) ([]Discount, error)
}

// Discount : store a name and amount of discount
type Discount struct {
	Store  string `json:"store" validate:"required,alphanum"`
	Amount int    `json:"amount" validate:"required,numeric"`
	ParkID int    `json:"-"`
}

func (d *Discount) ListDiscount(c echo.Context) ([]Discount, error) {

	db := c.Get("db").(*sql.DB)

	prepare, err := db.Prepare("SELECT store, amount, park_id FROM Discount WHERE park_id=?")
	if err != nil {
		return nil, err
	}
	defer prepare.Close()

	rows, err := prepare.Query(d.ParkID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	discount := []Discount{}

	for rows.Next() {
		var subDiscount Discount
		err := rows.Scan(&subDiscount.Store, &subDiscount.Amount, &subDiscount.ParkID)
		if err != nil {
			return nil, err
		}

		discount = append(discount, subDiscount)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return discount, nil
}

// EnterDiscount : enter a discount code and save to persistent database
func (d *Discount) EnterDiscount(c echo.Context, code string) error {

	redis := c.Get("redis").(*redis.Client)
	db := c.Get("db").(*sql.DB)

	result, err := redis.LRange(code, 0, 1).Result()
	if err != nil {
		return err
	}

	if len(result) != 2 {
		return errors.New("invalid value")
	}

	err = redis.ExpireAt(code, time.Now()).Err()
	if err != nil {
		return err
	}

	prepare, err := db.Prepare("INSERT INTO Discount (store, amount, park_id) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	defer prepare.Close()

	_, err = prepare.Exec(result[0], result[1], d.ParkID)
	if err != nil {
		return err
	}
	return nil
}

// GenerateDiscount : generate a discount code and store in inmemmory database (redis)
func (d *Discount) GenerateDiscount(c echo.Context) (*string, error) {

	redis := c.Get("redis").(*redis.Client)
	randomCode := random.String(6)

	err := redis.RPush(randomCode, d.Store, d.Amount).Err()
	if err != nil {
		return nil, err
	}

	_ = redis.Expire(randomCode, 1*time.Hour)

	return &randomCode, nil
}

// Clear : clear old value
func (d *Discount) Clear() {

	d.Store = ""
	d.Amount = 0
	d.ParkID = 0
}

// SetParkID : set id
func (d *Discount) SetParkID(parkID int) {
	d.ParkID = parkID
}
