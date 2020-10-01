#------------------------------------------------------------------------------
#
# 7daystodie Itemlist site.
# development env.
#
# cf.
# - https://jp.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
#
#------------------------------------------------------------------------------
FROM node:lts-alpine

RUN apk update && apk upgrade
RUN yarn add @vue/cli

WORKDIR /app

COPY . .
RUN yarn install

EXPOSE 8080
CMD ["yarn", "serve"]

