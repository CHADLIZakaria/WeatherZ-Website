FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx ng build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/weather-z /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]