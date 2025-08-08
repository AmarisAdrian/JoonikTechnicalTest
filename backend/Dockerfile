FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    unzip \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .
RUN composer install --prefer-dist --no-scripts --no-autoloader \
    && composer dump-autoload

EXPOSE 8000

CMD bash -c "\
until mysql -h ${DB_HOST} -u${DB_USERNAME} -p${DB_PASSWORD} -e 'select 1'; do \
  sleep 3; \
done; \
php artisan migrate --force; \
php artisan serve --host=0.0.0.0 --port=8000"



