# ===== build 阶段 =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# ===== production 阶段 =====
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]