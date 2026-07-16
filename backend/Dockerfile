FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev
RUN npx prisma generate

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["node", "server.js"]