package main

import (
	"github.com/koungkub/soa2019_group8/backend/controller"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {

	// About logging
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetReportCaller(true)

	// About environment variables
	viper.SetConfigName("env")
	viper.AddConfigPath("./config")
	viper.AutomaticEnv()
	if err := viper.ReadInConfig(); err != nil {
		logrus.Fatalf("Can not load environment variable error is : %s\n", err)
	}
}

func main() {

	route := controller.Route()

	logrus.Fatal(route.Start(viper.GetString("PORT")))
}
