#!/usr/bin/env bash
set -e

start tor &
node index.js
