package main

import (
	"github.com/facebookgo/grace/gracehttp"
	"github.com/koungkub/soa2019_group8/discount/route"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {

	// About logging
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})
	// logrus.SetReportCaller(true)

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

	logrus.Info("server started on ", port)
	logrus.Fatal(gracehttp.Serve(routing.Server))
}
