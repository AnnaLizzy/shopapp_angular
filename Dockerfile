# Sử dụng hình ảnh có sẵn của Node để xây dựng ứng dụng Angular
FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN ng build --prod

# Sử dụng hình ảnh Nginx để phục vụ ứng dụng đã xây dựng
FROM nginx:alpine

COPY --from=builder /app/dist/my-angular-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
