FROM golang:1.12-alpine AS golang-build
WORKDIR /work
ENV GO111MODULE on
ENV TZ Asia/Bangkok
ENV CGO_ENABLED 0
ENV GOOS linux

COPY go.mod /work
COPY go.sum /work
RUN apk add --update --no-cache git \
    && go mod download

COPY . /work
RUN go mod vendor \
    && go build -a -tags netgo -ldflags '-w' -o app -mod=vendor .

FROM alpine:3.9
WORKDIR /go
COPY --from=golang-build /work/app /go/app
ENV TZ Asia/Bangkok

RUN apk add --update --no-cache ca-certificates tzdata
EXPOSE 4000
CMD [ "./app" ]