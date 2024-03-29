FROM node:12.13.1-alpine

WORKDIR app
COPY . .

ENV NODE_OPTIONS="–max_old_space_size=4096"
RUN yarn cache clean
RUN yarn install
RUN yarn run build
#CMD ["yarn", "run", "start:prod"]
