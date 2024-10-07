#!/bin/bash
set -euxo pipefail

# This script copy the `zh-tw/404.html` to `404.html` in the built site.
# Temporary fix before gohugoio/hugo#5161 is resolved

BUILT_DIR="public"
LANG_DIR="zh-tw"

# Copy the 404.html to the root of the built site
cp $BUILT_DIR/$LANG_DIR/404.html $BUILT_DIR/404.html
