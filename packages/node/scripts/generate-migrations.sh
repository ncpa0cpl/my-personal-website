#!/bin/bash

if [ -z "$1" ]
    then
        echo "No migration name supplied"
        exit 0
fi

yarn orm migration:generate ./src/database/migrations/$1