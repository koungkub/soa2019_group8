docker run --net docker_soa -v $PWD:/migrations migrate/migrate -path=/migrations/ -database mysql://parking:P@ssw0rd@tcp(mysql-parking:3306)/Park up 1