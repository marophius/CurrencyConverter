# STAGE 1
FROM node:20-alpine3.18 as ng-builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build


# Stage 2
FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html
COPY --from=ng-builder /app/dist/currency-converter /usr/share/nginx/html


EXPOSE 80