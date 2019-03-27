# Inspire by -> https://medium.com/@olebedev/live-code-reloading-for-golang-web-projects-in-19-lines-8b2e8777b1ea

PID      = /tmp/nodemon-golang-project.pid
GO_FILES = $(wildcard *.go)
APP      = ./app

serve: restart
	@fswatch -o . | xargs -n1 -I{}  make restart || make kill

kill:
	@kill `cat $(PID)` || true

before:
	@echo "RESTARTED ..."

$(APP): $(GO_FILES)
	@go build -o $@

restart: kill before $(APP)
	@$(APP) & echo $$! > $(PID)

.PHONY: serve restart kill before