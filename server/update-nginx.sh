#!/bin/bash

# Define source and destination paths
source_file="nginx.conf" 
destination_dir="/etc/nginx/" 

# Move the file
mv -f "$source_file" "$destination_dir" 

# Check if the move was successful
if [ $? -eq 0 ]; then
    echo "Nginx conf updated successfully."
else
    echo "Error: Failed to move the file."
    exit 1
fi

# Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

# Check if Nginx restarted successfully
if [ $? -eq 0 ]; then
    echo "Nginx restarted successfully."
else
    echo "Error: Failed to restart Nginx."
    exit 1
fi

exit 0