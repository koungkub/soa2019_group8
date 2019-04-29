package main

import (
	"os"
	"os/signal"

	"github.com/facebookgo/grace/gracehttp"
	"github.com/koungkub/soa2019_group8/parking/circuitbreaker"
	"github.com/koungkub/soa2019_group8/parking/logger"
	"github.com/koungkub/soa2019_group8/parking/repository"
	"github.com/koungkub/soa2019_group8/parking/route"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {

	// set up circuit breaker
	circuitbreaker.SettingCircuitBreaker()

	// About environment variables
	viper.SetConfigName("env")
	viper.AddConfigPath("./config")
	viper.AutomaticEnv()
	if err := viper.ReadInConfig(); err != nil {
		logrus.Warnf("Can not load environment variable, error is : %s\n", err)
	}
}

func main() {

	routing := route.Route()
	port := viper.GetString("PORT")
	routing.Server.Addr = port

	logger := logger.GetLog()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)

	go func() {
		<-sig

		eureka := repository.GetServiceRegistry()
		instance := repository.GetServiceRegistryInstance()

		eureka.DeregisterInstance(instance)
	}()

	logger.Info("server started on ", port)
	logger.Fatal(gracehttp.Serve(routing.Server))
}
