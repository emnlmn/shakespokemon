# Shakespokemon 

An application to retrieve Pokemon with shakespearean description.


## API

*GET* `/pokemon/{pokemon_name}`

Retrieve the translated shakespearean Pokemon.

## Setup development environment

### Requirements
- docker
- docker-compose
- make

---
In order to setup your local development environment follow those steps:

Clone the project repository
```bash
git clone git@github.com:emnlmn/shakespokemon.git
```

Move to the project folder
```bash
cd shakespokemon
```

Use make to start the setup procedure
```bash
make setup
```

### Start the application locally
If you need to start the backend and frontend application development environments you can use this command to shortcuts the whole procedure
```bash
make start
```

## List of commands
You can invoke make form the project root to show the whole list of commands you can invoke for both backend and frontend applications.

```bash
make
``` 

### Build the docker image
In order to build the docker image for the backend application follow those steps

From the project root, move to `api` folder
```bash
cd api
```

Start the build process
```
make build
```

The build process will create an image tagged as `shakespokemon:latest` 

You can also test your fresh built image using docker
```
docker run -it -e SERVER_PORT=8080 -p 8080:8080 shakespokemon:latest
```
And you can then access the server at `http://localhost:8080/pokemon/{pokemon_name}` 

### Testing
For run the test suites for the backend application you can leverage the make helpers, from the `api` folder

Behavioural tests (Behat)
```
make test-behaviours
```

Unit tests
```
make test-unit
```
