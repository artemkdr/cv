# Stage 1: Build React application (can be customized based on your setup)
FROM node:alpine AS build-react
WORKDIR /artem-cv
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Final image with Python environment
FROM python:3.9-alpine

# Copy React build artifacts from stage 1
COPY --from=build-react /artem-cv/build /client

WORKDIR /

RUN pip install -r Flask
RUN pip install vertexai

# Copy your Python script and any additional files
COPY server.py .
COPY . .

EXPOSE 8080  

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "server:app"]
