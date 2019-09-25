#!/bin/bash

docker-compose run --rm --user $(ls -lnd . | awk '{print $3}') yarn yarn $@
