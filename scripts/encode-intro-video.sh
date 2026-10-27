#!/usr/bin/env bash
# Encode one or more clips into the intro background video (mp4 + webm + poster) in public/video.
# Usage: scripts/encode-intro-video.sh <file:start:duration[:zoom:x:y]> [...]
# Segments are cropped to 16:9 and joined with short crossfades. The optional zoom (e.g. 1.5)
# punches in, with x and y (0-1) choosing which part of the frame to keep. The looks apply their
# colour grade in CSS, so the encode stays neutral.
set -euo pipefail

out="$(dirname "$0")/../public/video"
# Busy footage compresses badly; lower WIDTH or raise the CRFs to stay around 2-3 MB per file.
width="${WIDTH:-1280}"
height=$((width * 9 / 16))
crf_h264="${CRF_H264:-30}"
crf_vp9="${CRF_VP9:-44}"
xfade=0.6
mkdir -p "$out"

inputs=()
filters=""
total=0
offset=0
for i in $(seq 0 $(($# - 1))); do
  segment="${@:$((i + 1)):1}"
  IFS=: read -r file start duration zoom x y <<< "$segment"
  zoom="${zoom:-1}"
  inputs+=(-ss "$start" -t "$duration" -i "$file")
  filters+="[$i:v]crop=w=iw/${zoom}:h=ih/${zoom}:x=(iw-iw/${zoom})*${x:-0.5}:y=(ih-ih/${zoom})*${y:-0.5},scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},fps=25,setsar=1,format=yuv420p[s$i];"

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

# Fade from and to black at the ends so the loop point is soft.
fade_out=$(awk "BEGIN { print $total - 0.5 }")
filters+="[$last]fade=t=in:st=0:d=0.5,fade=t=out:st=${fade_out}:d=0.5[v]"

ffmpeg -v error -y "${inputs[@]}" -filter_complex "$filters" -map "[v]" -an \
  -c:v libx264 -profile:v high -crf "$crf_h264" -preset slow -pix_fmt yuv420p -movflags +faststart "$out/intro.mp4"

ffmpeg -v error -y -i "$out/intro.mp4" -an -c:v libvpx-vp9 -crf "$crf_vp9" -b:v 0 -row-mt 1 "$out/intro.webm"

# Poster from just after the fade-in.
ffmpeg -v error -y -ss 0.8 -i "$out/intro.mp4" -frames:v 1 -q:v 4 "$out/intro-poster.jpg"

echo "Total length: ${total}s"
ls -lh "$out"
