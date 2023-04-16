#!/usr/bin/env bash
set -e

tor &
node index.js
exit
