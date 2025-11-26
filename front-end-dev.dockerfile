FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG VITE_BROKER_URL
ENV VITE_BROKER_URL=http://localhost:8080
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
