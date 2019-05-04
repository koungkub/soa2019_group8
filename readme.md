# Parking Hour

[![CircleCI](https://circleci.com/gh/koungkub/soa2019_group8.svg?style=svg)](https://circleci.com/gh/koungkub/soa2019_group8)

## All service

* [discount service](https://github.com/koungkub/soa2019_group8/tree/master/discount)
* [parking service](https://github.com/koungkub/soa2019_group8/tree/master/parking)

## How to serve it like a boss

```bash
$ docker-compose up -d --build
```

and migrate database

```bash
$ cd parking/migration
$ ./migrate.sh
```

```bash
$ cd discount/migration
$ ./migrate.sh
```

```bash
$ docker-compose restart parking discount
```

## Docker hub

* [docker hub](https://hub.docker.com/u/koungkub)

## Slide

[slide](https://docs.google.com/presentation/d/1gKa8vxkEBo9d89NVRiW57tena3CZwMn7ghlrfdm7E8w/edit?usp=sharing)

## API document

using [cotton](https://github.com/chonla/cotton)

* [doc](https://github.com/koungkub/soa2019_group8/tree/master/doc)

## Testing

run test all service

```bash
$ go test -v -cover ./...
```

run test specific service not like a boss

```bash
$ go test -v -cover ./${service.Name}/...
```
