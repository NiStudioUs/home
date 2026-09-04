#!/bin/bash

echo "Searching for Flutter projects..."

# Find all pubspec.yaml files, excluding common non-flutter or generated directories
find . -type d \( -name "node_modules" -o -name ".git" -o -name "build" -o -name ".dart_tool" \) -prune -o -name "pubspec.yaml" -print | while read -r pubspec_file; do
    dir=$(dirname "$pubspec_file")
    echo ""
    echo "========================================"
    echo "Running flutter pub get in $dir"
    echo "========================================"
    (cd "$dir" && flutter pub get)
done

echo ""
echo "Finished updating all Flutter projects!"
