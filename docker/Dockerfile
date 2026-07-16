FROM drupal:10-php8.3-apache

RUN apt-get update && apt-get install -y \
    curl git default-mysql-client vim wget

# Install php thigs
RUN apt-get update && apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    mv composer.phar /usr/local/bin/composer && \
    php -r "unlink('composer-setup.php');"

# Install drush launcher
RUN wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar && \
    chmod +x drush.phar && cp drush.phar /usr/local/bin/drush

RUN composer config --no-plugins allow-plugins true

RUN rm -rf /var/www/html/*

COPY apache-drupal.conf /etc/apache2/sites-enabled/000-default.conf
COPY docker-php-memlimit.ini /usr/local/etc/php/conf.d/docker-php-memlimit.ini

WORKDIR /app
