package repository

import (
	"github.com/go-redis/redis"
	"github.com/spf13/viper"
)

// GetRedisConnection : return redis connection
func GetRedisConnection() *redis.Client {

	redis := redis.NewClient(&redis.Options{
		Addr:     viper.GetString("REDIS_HOST"),
		Password: viper.GetString("REDIS_PASSWORD"),
		DB:       viper.GetInt("REDIS_DATABASE"),
	})

	return redis
}
