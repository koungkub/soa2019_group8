docker run --net test_soa -v $PWD:/migrations migrate/migrate -path=/migrations/ -database mysql://discount:P@ssw0rd@tcp\(mysql-discount:3306\)/Discount up 1
