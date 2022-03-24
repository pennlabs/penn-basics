FROM node:10-buster

LABEL maintainer="Penn Labs"

WORKDIR /app/

# Copy project dependencies
COPY package*.json /app/
COPY package-lock.json /app/

# Install project dependencies
ENV NODE_ENV "production"

RUN npm install

# Copy project files
COPY . /app/

RUN npm run build

CMD ["npm", "run", "start"]
