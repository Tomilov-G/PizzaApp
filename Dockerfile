# --- Stage 1: build ---
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Копируем package.json и package-lock.json (если есть)
    COPY package*.json ./
    
    # Устанавливаем зависимости (без optional)
    RUN npm ci --omit=optional
    
    # Копируем весь исходный код
    COPY . .
    
    # Сборка проекта
    RUN npm run build
    
    # --- Stage 2: production ---
    FROM nginx:stable-alpine
    
    # Копируем готовую сборку из builder-а в nginx
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Запускаем nginx в форграунд режиме
    CMD ["nginx", "-g", "daemon off;"]
    