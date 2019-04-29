package repository

import (
	"github.com/hudl/fargo"
	"github.com/spf13/viper"
)

func GetServiceRegistry() fargo.EurekaConnection {

	return fargo.NewConn(viper.GetString("EUREKA"))
}

func GetServiceRegistryInstance() *fargo.Instance {

	instance := &fargo.Instance{
		HostName: "docker-parking",
		App:      "parking",
		IPAddr:   "127.0.0.1",
		Port:     9090,
		DataCenterInfo: fargo.DataCenterInfo{
			Name: fargo.MyOwn,
		},
	}
	instance.SetMetadataString("service", "parking")

	return instance
}
