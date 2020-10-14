#!/bin/bash

#
# You must put 7daystodie/application/Data to ./Data direcotry before execute.
#
#   1. cd THIS_PROJECT_ROOT/jig/gen-recipes
#   2. cp -R /opt/7daystodie/application/Data ./Data
#   3. ./run.sh ./Data
#

readonly DTAG="7d2d-notes-jig-gen-recipes"

docker build -t $DTAG:latest .

docker run --rm\
    -v `pwd`:/app \
    -it \
    $DTAG:latest \
    python gen_recipes.py $@

