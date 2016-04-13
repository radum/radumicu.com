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
