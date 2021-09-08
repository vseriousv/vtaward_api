FROM node:12.13.1-alpine

WORKDIR app
COPY . .

RUN yarn install
RUN yarn run build
#CMD ["yarn", "run", "start:prod"]
