FROM node:14.15-alpine 

WORKDIR /app 

COPY package.json .
RUN yarn
COPY . .
EXPOSE 4008

CMD ["yarn", "start:dev"]