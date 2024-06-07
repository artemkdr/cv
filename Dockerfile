# Build stage
FROM node:18-alpine AS build 
WORKDIR /app

COPY artem-cv/package*.json ./ 
RUN npm ci

COPY artem-cv ./
RUN npm run build

# Stage 2: Final image with Python environment
FROM python:3.9-alpine
WORKDIR /app
# Copy your Python script and any additional files
COPY server/server.py .
COPY server/lib/systemd/system/python-chatbot.service /lib/systemd/system/
RUN pip3 install -r requirements.txt

# Runtime stage
FROM nginx:stable-alpine AS runtime

# Create 'www-data' user and group
RUN apk add shadow
RUN useradd -r -g www-data www-data
# Create the /var/www/html/cv folder and set ownership
RUN mkdir -p /var/www/html/cv && chown -R www-data:www-data /var/www/html/cv

COPY --from=build /app/build /var/www/html/cv
WORKDIR /app
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/etc/nginx/includes/ /etc/nginx/includes/

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]