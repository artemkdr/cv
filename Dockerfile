# Build stage
FROM node:18-alpine AS build 
WORKDIR /app

COPY artem-cv/package*.json ./ 
RUN npm ci

COPY artem-cv ./
RUN npm run build

# Runtime stage
FROM ubuntu:latest AS runtime
RUN apt-get update
RUN apt-get install -y nginx
# install python
WORKDIR /app
RUN apt-get install -y python3 pip
RUN python3 -m pip install setuptools flask virtualenv google-cloud-aiplatform --break-system-packages
#RUN virtualenv /app/venv/
#RUN source /app/venv/bin/activate
#RUN /app/venv/bin/pip install google-cloud-aiplatform


# Copy your Python script and any additional files
WORKDIR /app
COPY server/server.py /home/fishbounce/
COPY server/lib/systemd/system/python-chatbot.service /lib/systemd/system/


# Create 'www-data' user and group
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