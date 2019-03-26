FROM golang:1.12-alpine AS golang-build
WORKDIR /work
COPY . /work
ENV GO111MODULE on
ENV TZ Asia/Bangkok
ENV CGO_ENABLED 0
ENV GOOS linux

RUN apk update \
    && apk add --no-cache git \
    && go mod tidy \
    && go mod vendor
RUN go build -a -tags netgo -ldflags '-w' -o app -mod=vendor .

FROM alpine:3.8
WORKDIR /go
COPY --from=golang-build /work/app /go/app
ENV TZ Asia/Bangkok

RUN apk update \
    && apk add --no-cache ca-certificates \
    && apk add --no-cache tzdata
EXPOSE 80
EXPOSE 443
EXPOSE 3000
CMD [ "./app" ]