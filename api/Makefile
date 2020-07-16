# Makefile for shakespokemon service

quickstart: header help

help:
	@echo "  ${boldunderline}Backend Commands${normal}"
	@echo ""
	@echo "      ${bold}shell${normal}				Get an interactive shell (inside the container)"
	@echo "      ${bold}cs-check${normal}				Check code style with eslint"
	@echo "      ${bold}cs-fix${normal}				Fix code style with eslint"
	@echo "      ${bold}test${normal}				Fix code style with eslint"
	@echo "      ${bold}build${normal}				Build the latest release image"
	@echo ""

setup: start
	@docker-compose exec shakespokemon sh -c "npm i"

start:
	@running=$$(docker-compose ps shakespokemon | grep -c "Up"); \
	if [ "$$running" -eq 0 ]; then \
		docker-compose up -d shakespokemon; \
	fi;

shell: start
	@docker-compose exec shakespokemon sh

cs-check: start
	@docker-compose exec shakespokemon sh -c "npm run lint"

cs-fix: start
	@docker-compose exec shakespokemon sh -c "npm run lint:fix"

test: start
	@docker-compose exec shakespokemon sh -c "npm test:functional"

build:
	docker build .

header:
	@echo "  ${bold}Shakespearean Pokemon API${normal}"
	@echo ""

bold := "\\033[1m"
normal := "\\033[0m"
boldunderline := "\\033[1m\\033[4m"