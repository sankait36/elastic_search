FROM node:10-slim as react-build
WORKDIR /app
COPY . ./
RUN yarn
CMD [ "yarn", "start" ]