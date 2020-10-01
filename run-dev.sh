#!/bin/bash

readonly DOCKER_IMAGE="7d2d-itemlist-site:latest"
readonly EXPOSE_PORT="8080"

docker build -t ${DOCKER_IMAGE} .
docker run -it --rm \
  -v `pwd`:/app \
  -p ${EXPOSE_PORT}:8080 \
  ${DOCKER_IMAGE}

