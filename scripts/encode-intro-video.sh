#!/usr/bin/env bash
# Encode one or more clips into the intro background video in public/video:
# intro-1080.{mp4,webm} for larger screens, intro-720.{mp4,webm} for phones, and a poster.
# Usage: scripts/encode-intro-video.sh <file:start:duration[:zoom:x:y]> [...]
# Segments are cropped to 16:9 and joined with short crossfades. The optional zoom (e.g. 1.5)
# punches in, with x and y (0-1) choosing which part of the frame to keep.
set -euo pipefail

out="$(dirname "$0")/../public/video"
# Quality-targeted encodes with a bitrate ceiling, so busy footage (crowds, water) can't
# balloon the files: roughly 8 MB for 1080p and 4 MB for 720p over a 20s loop.
rate_1080="${RATE_1080:-3M}"
rate_720="${RATE_720:-1500k}"
xfade=0.6
mkdir -p "$out"

# Build the input list and a filter graph that normalises, crossfades and fades the segments.
build_graph() {
  local width=$1 height=$(($1 * 9 / 16))
  inputs=()
  filters=""
  total=0
  for i in $(seq 0 $((${#segments[@]} - 1))); do
    IFS=: read -r file start duration zoom x y <<< "${segments[$i]}"
    zoom="${zoom:-1}"
    inputs+=(-ss "$start" -t "$duration" -i "$file")
    filters+="[$i:v]crop=w=iw/${zoom}:h=ih/${zoom}:x=(iw-iw/${zoom})*${x:-0.5}:y=(ih-ih/${zoom})*${y:-0.5},scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${height},hqdn3d=1.5:1.5:6:6,fps=25,setsar=1,format=yuv420p[s$i];"
    if [ "$i" -eq 0 ]; then
      last="s0"
      total="$duration"
    else
      offset=$(awk "BEGIN { print $total - $xfade }")
      filters+="[$last][s$i]xfade=transition=fade:duration=${xfade}:offset=${offset}[x$i];"
      last="x$i"
      total=$(awk "BEGIN { print $total + $duration - $xfade }")
    fi
  done
  fade_out=$(awk "BEGIN { print $total - 0.5 }")
  filters+="[$last]fade=t=in:st=0:d=0.5,fade=t=out:st=${fade_out}:d=0.5[v]"
}

encode() {
  local width=$1 name=$2 rate=$3
  build_graph "$width"
  # Lossless-ish intermediate so the VP9 encode doesn't inherit H.264 artefacts.
  ffmpeg -v error -y "${inputs[@]}" -filter_complex "$filters" -map "[v]" -an \
    -c:v libx264 -crf 12 -preset fast -pix_fmt yuv420p "$tmp/$name.mkv"
  ffmpeg -v error -y -i "$tmp/$name.mkv" -an \
    -c:v libx264 -profile:v high -crf 20 -maxrate "$rate" -bufsize "$rate" -preset slow -tune film \
    -pix_fmt yuv420p -movflags +faststart "$out/$name.mp4"
  ffmpeg -v error -y -i "$tmp/$name.mkv" -an \
    -c:v libvpx-vp9 -crf 28 -b:v "$rate" -row-mt 1 -deadline good -cpu-used 2 \
    "$out/$name.webm"
}

segments=("$@")
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
encode 1920 intro-1080 "$rate_1080"
encode 1280 intro-720 "$rate_720"

# Poster from just after the fade-in.
ffmpeg -v error -y -ss 0.8 -i "$out/intro-1080.mp4" -frames:v 1 -q:v 6 "$out/intro-poster.jpg"

echo "Total length: ${total}s"
ls -lh "$out"
