FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY . /app

EXPOSE 3000

CMD ["npm", "ci", "&&", "npm", "start" ]
