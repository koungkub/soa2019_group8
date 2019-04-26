package logger

import (
	"net"

	logrustash "github.com/bshuster-repo/logrus-logstash-hook"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func GetLog() *logrus.Logger {

	logger := logrus.New()
	logger.SetLevel(logrus.DebugLevel)
	logger.SetFormatter(&logrus.JSONFormatter{})
	// logger.SetReportCaller(true)

	tcpConnection, err := net.Dial("tcp", viper.GetString("LOGSTASH"))
	if err != nil {
		logger.Fatal(err)
	}

	hook, err := logrustash.NewHookWithConn(tcpConnection, "discount")
	if err != nil {
		logger.Fatal(err)
	}

	logger.Hooks.Add(hook)

	return logger
}
