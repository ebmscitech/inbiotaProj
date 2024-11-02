# Build image PHP dengan Apache
FROM php:8.3-apache

# Instalasi ekstensi PHP yang dibutuhkan dan Node.js
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    npm \
    && docker-php-ext-install gd pdo pdo_mysql \
    && a2enmod rewrite

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Instalasi Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy seluruh file proyek ke dalam container
COPY . .

# Instal dependensi PHP dan build assets frontend untuk produksi
RUN composer install --no-dev --optimize-autoloader && \
    npm install && \
    npm run build

# Set permission untuk folder Laravel yang diperlukan
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Ekspose port
EXPOSE 8000

# Jalankan Apache di latar belakang
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
