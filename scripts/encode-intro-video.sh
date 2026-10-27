#!/usr/bin/env bash
# Encode a clip into the intro background video (mp4 + webm + poster) in public/video.
# Usage: scripts/encode-intro-video.sh <input> [start-seconds] [duration-seconds]
# The looks apply their colour grade in CSS, so the encode stays neutral.
set -euo pipefail

input="$1"
start="${2:-0}"
duration="${3:-15}"
out="$(dirname "$0")/../public/video"
# Busy footage compresses badly; lower WIDTH or raise the CRFs to stay around 2-3 MB per file.
width="${WIDTH:-1280}"
crf_h264="${CRF_H264:-30}"
crf_vp9="${CRF_VP9:-44}"
mkdir -p "$out"

# No audio, a 0.5s fade at both ends so the loop point is soft.
fade_out=$(awk "BEGIN { print $duration - 0.5 }")
filters="scale=${width}:-2,fps=25,fade=t=in:st=0:d=0.5,fade=t=out:st=${fade_out}:d=0.5"

ffmpeg -v error -y -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libx264 -profile:v high -crf "$crf_h264" -preset slow -pix_fmt yuv420p -movflags +faststart "$out/intro.mp4"

ffmpeg -v error -y -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libvpx-vp9 -crf "$crf_vp9" -b:v 0 -row-mt 1 "$out/intro.webm"

ffmpeg -v error -y -ss "$start" -i "$input" -frames:v 1 -vf "scale=${width}:-2" -q:v 4 "$out/intro-poster.jpg"

ls -lh "$out"
