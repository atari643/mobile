FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY vite.config.ts ./vite.config.ts
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-8080}"]