FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 3000


CMD ["npm", "start" ]
