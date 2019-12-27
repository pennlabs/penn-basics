FROM node:10-buster

MAINTAINER Penn Labs

WORKDIR /app/

# Copy project dependencies
COPY package*.json /app/
COPY package-lock.json /app/

# Install project dependencies
RUN npm install --production=true

# Copy project files
COPY . /app/

CMD ["npm", "start"]
