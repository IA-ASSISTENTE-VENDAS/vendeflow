FROM node:18-slim

# Instala o navegador leve Chromium e as dependências necessárias de graça
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Configura o diretório de trabalho do robô
WORKDIR /usr/src/app

# Copia os arquivos de configuração e instala as ferramentas do WhatsApp
COPY package*.json ./
RUN npm install

# Copia o restante do código do robô
COPY . .

# Comando mágico para dar partida no VendeFlow
CMD ["node", "index.js"]
