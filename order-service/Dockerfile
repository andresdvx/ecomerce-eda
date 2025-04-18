FROM node:latest

WORKDIR /app

# Instalar dependencias globales
RUN npm install -g ts-node-dev typescript

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Correr en modo desarrollo
CMD ["ts-node-dev", "--respawn", "src/index.ts"]
