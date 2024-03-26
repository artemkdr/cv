#!/bin/bash

# Define source and destination paths 
destination_dir="/var/www/html/cv"

# unzip
7z x build.7z 

# Move the file
cp -ra "build/." "$destination_dir" 

chmod +x -R /var/www/html/cv

rm -rf build
rm  build.7z

# Check if the move was successful
if [ $? -eq 0 ]; then
    echo "cv.html updated successfully."
else
    echo "Error: Failed to move the file."
    exit 1
fi

exit 0
