#------------------------------------------------------------------------------
#
# 7daystodie Itemlist site.
# development env.
#
# cf.
# - https://jp.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
#
#------------------------------------------------------------------------------
FROM node:14-alpine

RUN apk update && apk upgrade
RUN yarn global add @vue/cli firebase

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
# and then install project dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# copy project files/directories.
COPY . .

CMD ["yarn", "serve"]

