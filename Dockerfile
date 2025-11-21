# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                       # or yarn install --frozen-lockfile
COPY . .
RUN npm run build -- --mode production   # creates /app/dist

# ---------- Final stage ----------
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config if you need Vue Router history mode
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
