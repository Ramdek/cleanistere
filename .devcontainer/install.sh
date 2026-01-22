#!/usr/bin/env bash
# Script to setup dev env needed packages & config

set -xeo pipefail

sudo apt-get update
sudo apt-get install nodejs npm
npm install --save-dev eslint stylelint htmlhint