#!/bin/sh
for file in *.svg; do
  inkscape --export-filename="${file%.svg}.eps" "$file"
done