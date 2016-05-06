Before configure your shell to be able to run docker build

```
eval "$(docker-machine env default)"
```

Build the docker image (must be run from server folder)

```
docker build -t radum/radumicu.com-dev .
```

Start the docker container (must be run from server folder)

```
docker run -it --name radumicu.com-dev -p 8000:8000 -v ./../frontend:/static/ -v `pwd`:/app -d radum/radumicu.com-dev
```

# Development

In order to run local server for local Development run:

```bash
npm run start
```

This will run the gulp dev task `gulp start:dev`, that will compile the initial assets and watch files for changes refreshing the compiled versions.

# Deploy

In order to deploy run:

```bash
npm run build-env
```

This will run a bash script `build/build-env` that will run the following:

```
npm run build-$NODE_ENV // Based on the NODE_ENV env variable will run another script that compiles the sources (Ex production: `gulp build:production`)

// Next step will be to copy all files that need to on on the server in the dist temporary folder
.bin,controllers,lib,models,views,.env.defaults.json,.taunusrc,*.js,package.json => dist/appserver
```

# Server

sudo systemctl start radumicu.com.service

sudo systemctl stop radumicu.com.service

sudo chown -R radumicuwww:radumicuwww /var/appdata/radumicu.com

sudo -u radumicuwww HOME=/var/appdata/radumicu.com pm2 logs
