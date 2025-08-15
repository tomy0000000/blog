#!/bin/bash
set -euxo pipefail

# This script reads the img service host, and download all static resources from
# the host to static dir. Run this before hugo build.

PARAMS_TOML="config/_default/params.toml"
STATIC_DIR="static"
STATIC_RESOURCES=(
    "android-chrome-192x192.png"
    "android-chrome-512x512.png"
    "apple-touch-icon.png"
    "favicon-16x16.png"
    "favicon-32x32.png"
)


# Read image host
image_host="$(python3 -c "import tomllib, sys; print(tomllib.load(open(sys.argv[1],'rb'))['services']['img'])" "$PARAMS_TOML")"

# Download resources
for file in "${STATIC_RESOURCES[@]}"; do
    wget "${image_host}/${file}" -O "${STATIC_DIR}/${file}"
done
