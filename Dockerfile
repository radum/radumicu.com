# FROM node:latest
FROM node:5.10.1

MAINTAINER radum

RUN mkdir /home/src

# Commands will run in this directory
WORKDIR /home/src

# Add all our code inside that directory that lives in the container
ADD package.json package.json

RUN npm install

# ADD . /home/server

# Expose the server port
# EXPOSE 8080

# Start the server
# CMD ["npm", "start"]
