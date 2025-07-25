# Etapa de build
FROM node:20 AS builder  

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

# Etapa de produção
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]