#!/bin/bash

SASS_BIN="./node_modules/sass/sass.js"
SASS_DIR="./scss"
TARGET_DIR="./src/yafowil/widget/ace/resources/bootstrap5"

$SASS_BIN $SASS_DIR/bootstrap5.scss --no-source-map $TARGET_DIR/widget.css