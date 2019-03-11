package main

import (
	"os"

	"github.com/koungkub/soa2019_group8/backend/controller"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

var (
	port = os.Getenv("PORT")
)

func init() {

	// About log
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetReportCaller(true)

	// About environment variables
	viper.SetConfigName("env")
	viper.AddConfigPath("./config/")
	viper.AutomaticEnv()
}

func main() {

	route := controller.Route()

	logrus.Fatal(route.Start(port))
}
