#!/usr/bin/env bash
set -e

tor &
sleep 5
node index.js
exit
