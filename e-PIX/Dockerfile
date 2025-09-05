# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i --legacy-peer-deps
COPY . .

# Build-time env var passed from Cloud Build
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Make Vite pick the key via loadEnv by writing .env.production
RUN echo "GEMINI_API_KEY=$GEMINI_API_KEY" > .env.production

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY server ./server
EXPOSE 8080
CMD ["npm", "start"]


