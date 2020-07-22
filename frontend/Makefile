# Makefile for shakespokemon service

quickstart: header help help-all

help:
	@echo "  ${boldunderline}Frontend Commands${normal}"
	@echo ""
	@echo "      ${bold}setup${normal}				Setup the development environment"
	@echo "      ${bold}start${normal}				Start the development environment"
	@echo ""

setup:
	yarn install

start:
	yarn run start

header:
	@echo "  ${bold}Shakespearean Pokemon${normal}"
	@echo ""

bold := "\\033[1m"
normal := "\\033[0m"
boldunderline := "\\033[1m\\033[4m"