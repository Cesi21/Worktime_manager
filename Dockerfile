# Izberite ustrezno osnovno sliko za gradnjo
FROM node:slim as build

# Nastavite delovni imenik v kontejnerju
WORKDIR /app

# Kopirajte package.json in package-lock.json
COPY package*.json ./

# Namestite odvisnosti
RUN npm install firebase react react-router-dom resize-observer-polyfill react-testing-library canvas @grpc/grpc-js@latest

# Kopirajte vse datoteke iz lokalnega imenika v delovni imenik kontejnerja
COPY . .

# Zgradite aplikacijo
RUN npm run build

# Faza za izvajanje
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]