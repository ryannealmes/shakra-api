# API

API for lack of a better name acts as a graphql layer that stitches underlying service APIs together using schema stitching. The underlying services expose a graphql endpoint and the API layer implements the relationships between these services.

## Installation

### Using docker-compose

[TODO]
- Ensure you have the [docker toolbox](https://www.docker.com/products/docker-toolbox) installed
- `cd [application_directory]`
- `docker-compose up`

### Using you local machine

- `cd [application_directory]`
- `npm install -g pm2 npm-run-all` 
- `npm install`
- `npm start`

Note that the server is run with pm2, a lightweight process manager that ensures that the server stays up and running. The `processes.json` holds all of the configuration information used when running the server. 

### pm2 info

*pm2* is a process manager. It allows you to run and manage processes. In the event that there is a failure the process will be restarted. 

- `pm2 list`
- `pm2 logs`
- `pm2 dash`
- `pm2 monit`

More can be found in there [documentation](http://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet)

## Usage

Once your server is running you will be able to access the GraphiQL interface. The url for this will depend on whether you are running things on docker or your local environment. 

`http://localhost:3000/GraphiQL`

or 

``http://[docker-machine-ip]:3000/GraphiQL``

For the docker-machine ip simply type `docker-machine ip` in your console.

## Dependencies

The API layer relies on certain services running. These include
- User service
- Goal service
See READMEs on setup.

## TODO
There is quite a lot that can still be done and that I am working on. I am not too sure on authentication. Right now this is delegated to the authentication service, but it maybe be better to have a reverse proxy that would bounce unauthorized users sooner. I don't really want traffic flowing through the architecture if I can bounce it higher up.
