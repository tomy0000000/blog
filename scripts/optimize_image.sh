#!/bin/bash
#
# This script processes images in the current directory by:
#
# - Resize to a maximum side of 2560 pixels
# - Strip metadata
# - convert to JPEG format
#
# Optimized images will be tagged with an extended attribute to avoid reprocessing.
#
# Usage:
#
# cd content/posts/some-post
# ../../../scripts/optimize_image.sh
#
# or
#
# (at the root of the project)
# scripts/optimize_image.sh content/posts/some-post

# Match files extensions case-insensitively
shopt -s nocaseglob

# Resize images to a maximum side of 2560 pixels
MAX_SIDE=2560

# Read first args as the directory to process
dir="${1:-.}"

for img in "${dir}"/*.{heic,jpg,jpeg,png,webp}; do
    # Skip if the file does not exist
    if ! [ -f "$img" ]; then
        continue
    fi

    # Skip if the file is already optimized
    if xattr -p tech.tomy.blog.image-optimized "$img" 2> /dev/null | grep -q "true"; then
        echo "Skipped ${img}"
        continue
    fi

    # Convert to JPEG
    new_file="${img%.*}.jpg"
    magick \
        "${img}" \
        -resize "${MAX_SIDE}x${MAX_SIDE}\\" \
        -strip \
        -quality 85 \
        "${new_file}"
    echo "Converted ${img} to ${new_file}"
    xattr -w tech.tomy.blog.image-optimized true "${new_file}"
done
