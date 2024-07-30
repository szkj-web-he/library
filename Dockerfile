FROM node:18 AS builder
WORKDIR /app
COPY . .
WORKDIR /app
RUN yarn install && yarn build-storybook

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/storybook-static .
ENTRYPOINT ["nginx", "-g", "daemon off;"]