#!/bin/sh

set -e

./bin/coverage run \
    --source src/yafowil/widget/ace \
    --omit src/yafowil/widget/ace/example.py \
    -m yafowil.widget.ace.tests
./bin/coverage report
./bin/coverage html
