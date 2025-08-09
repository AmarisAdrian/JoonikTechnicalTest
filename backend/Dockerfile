FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --prefer-dist --no-scripts --no-autoloader \
    && composer dump-autoload

RUN mkdir -p /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chmod 777 /var/www/html/database/database.sqlite

EXPOSE 8000

CMD php artisan migrate --force --seed \
    && php artisan serve --host=0.0.0.0 --port=8000
