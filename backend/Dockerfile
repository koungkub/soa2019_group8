FROM golang:1.12-alpine AS golang-build
WORKDIR /work
COPY . /work
ENV GO111MODULE on
ENV TZ Asia/Bangkok
ENV CGO_ENABLED 0
ENV GOOS linux
RUN apk update \
    && apk add --no-cache git \
    && go mod init github.com/koungkub/soa2019_group8 \
    && go mod tidy
RUN go build -a -tags netgo -ldflags '-w' -o app .

FROM alpine:3.8
WORKDIR /go
COPY --from=golang-build /work/app /go/app
RUN apk update \
    && apk add --no-cache ca-certificates
EXPOSE 80
EXPOSE 443
CMD [ "./app" ]