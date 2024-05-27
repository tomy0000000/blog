#!/bin/bash
# 
# This script processes images in the current directory by:
# 
# - Resize to a maximum side of 2560 pixels
# - Strip metadata
# - convert to JPEG format
# 
# Usage:
# 
# cd content/posts/some-post
# ../../../scripts/optimize_image.sh
# 

# Match files extensions case-insensitively
shopt -s nocaseglob

# Resize images to a maximum side of 2560 pixels
MAX_SIDE=2560

for img in *.{heic,jpg,jpeg,png}; do
    if [ -f "$img" ]; then
        magick \
            "$img" \
            -resize "${MAX_SIDE}x${MAX_SIDE}\\" \
            -strip \
            -quality 85 \
            "${img%.*}.jpg"
        echo "Converted $img to ${img%.*}.jpg"
    fi
done
