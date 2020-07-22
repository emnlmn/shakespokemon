# Makefile for shakespokemon service

quickstart: header help help-all

help:
	@echo "  ${boldunderline}Basic Commands${normal}"
	@echo ""
	@echo "      ${bold}setup${normal}				Setup the development environment"
	@echo "      ${bold}start${normal}				Start the development environment"
	@echo ""

setup: start
	@$(MAKE) -C api setup

start:
	$(MAKE) -C api start
	$(MAKE) -C frontend start

help-all:
	@echo "  -> ${bold}runs from ./api folder${normal}"
	@$(MAKE) -C api help
	@echo "  -> ${bold}runs from ./frontend folder${normal}"
	@$(MAKE) -C frontend help

.DEFAULT:
	@echo "[ERROR] command not found. Please run backend or fronted commands from appropriate sub-directories";

header:
	@echo "  ${bold}Shakespearean Pokemon${normal}"
	@echo ""

bold := "\\033[1m"
normal := "\\033[0m"
boldunderline := "\\033[1m\\033[4m"