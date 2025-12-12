FROM node:20-alpine

WORKDIR /app

# Build-time переменные для Vite
ARG VITE_YANDEX_METRIKA_ID
ARG VITE_YANDEX_METRIKA_ENABLED

# Преобразуем ARG в ENV для использования в npm run build
ENV VITE_YANDEX_METRIKA_ID=${VITE_YANDEX_METRIKA_ID}
ENV VITE_YANDEX_METRIKA_ENABLED=${VITE_YANDEX_METRIKA_ENABLED}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Создаем директорию для статики
RUN mkdir -p /app/dist

# Копируем собранные файлы в dist
CMD ["sh", "-c", "cp -r /app/dist/* /static/landing-frontend/"] 