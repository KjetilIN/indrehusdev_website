#!/usr/bin/env bash
# Encode a clip into the intro background video (mp4 + webm + poster) in public/video.
# Usage: scripts/encode-intro-video.sh <input> [start-seconds] [duration-seconds]
# The looks apply their colour grade in CSS, so the encode stays neutral.
set -euo pipefail

input="$1"
start="${2:-0}"
duration="${3:-15}"
out="$(dirname "$0")/../public/video"
mkdir -p "$out"

# 1280px wide, no audio, a 0.5s fade at both ends so the loop point is soft.
fade_out=$(awk "BEGIN { print $duration - 0.5 }")
filters="scale=1280:-2,fps=25,fade=t=in:st=0:d=0.5,fade=t=out:st=${fade_out}:d=0.5"

ffmpeg -v error -y -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "$out/intro.mp4"

ffmpeg -v error -y -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 "$out/intro.webm"

ffmpeg -v error -y -ss "$start" -i "$input" -frames:v 1 -vf "scale=1280:-2" -q:v 4 "$out/intro-poster.jpg"

ls -lh "$out"
