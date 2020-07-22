# Makefile for shakespokemon service

quickstart: header help

help:
	@echo "  ${boldunderline}Backend Commands${normal}"
	@echo ""
	@echo "      ${bold}setup${normal}				Setup the development environment"
	@echo "      ${bold}shell${normal}				Start the development environment"
	@echo "      ${bold}shell${normal}				Get an interactive shell (inside the container)"
	@echo "      ${bold}build${normal}				Build the latest release image"
	@echo "      ${bold}lint-check${normal}				Check code linting with eslint"
	@echo "      ${bold}lint-fix${normal}				Fix code linting with eslint"
	@echo "      ${bold}test-unit${normal}				Runs the unit test suite"
	@echo "      ${bold}test-coverage${normal}			Runs the test suite and show the total coverage"
	@echo "      ${bold}test-behaviours${normal}			Runs the behavioural test suite"
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

lint-check:
	@docker-compose run --rm shakespokemon sh -c "npm run lint"

lint-fix:
	@docker-compose run --rm shakespokemon sh -c "npm run lint:fix"

test-unit:
	@docker-compose run --rm shakespokemon sh -c "npm run test:unit"

test-coverage:
	@docker-compose run --rm shakespokemon sh -c "npm run test:coverage"

test-behaviours:
	npm run test:behaviours

build:
	docker build .

header:
	@echo "  ${bold}Shakespearean Pokemon API${normal}"
	@echo ""

bold := "\\033[1m"
normal := "\\033[0m"
boldunderline := "\\033[1m\\033[4m"