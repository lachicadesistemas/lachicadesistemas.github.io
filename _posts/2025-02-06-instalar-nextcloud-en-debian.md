---
layout: post
title: Instalar Nextcloud en Debian 12 / GoldenDog Server
subtitle: Tu propio google drive
date: 2025-02-06
categories: [nextcloud, web, homelab, server, selfhosted]
author: Alexia
---

## Instalación y Configuración de Nextcloud en Debian 12

Nextcloud es una potente solución de software de código abierto para alojar, compartir y editar archivos inclusive entre varias personas, tal cual google 
drive o google docs. Ofrece funcionalidades similares a Dropbox y Google Drive, pero con el beneficio de tener control total sobre tus datos. Instalar y configurar 
Nextcloud en Debian 12 te garantiza un servicio en la nube seguro y privado. Esta guía te llevará paso a paso para configurar Nextcloud en tu servidor Debian 12. Pero también sirve para instalar NextCloud en dispositivos SBC (Single Board Computer) como la raspberry Pi, siempre y cuando corran RaspberryOS (debian) o Debian directamente.



### Requisitos Previos

- Un servidor con Debian 12.
- Privilegios de usuario root o sudo.
- Servidor web Apache o Nginx (en esta guía usaremos Apache).
- PHP y sus extensiones.
- Base de datos MariaDB o MySQL. (Aquí usaré MariaDB)

#### Paso 1: Actualizar Paquetes del Sistema

```apt update && apt upgrade -y```

#### Paso 2: Instalar Apache con modulo php

```apt install apache2 libapache2-mod-php -y```

Habilitar apache para que inicie automáticamente vía **systemd**

```sudo systemctl enable apache2; sudo systemctl start apache2```

#### Paso 3: Instalar PHP y Extensiones Necesarias

Nextcloud requiere PHP y algunas extensiones para funcionar correctamente. Instalalas con el siguiente comando:

```apt install php php-gd php-json php-mysql php-curl php-mbstring php-intl php-imagick php-xml php-zip -y```

#### Paso 4: Instalar y Configurar el Servidor de Base de Datos

```apt install mariadb-server mariadb-client -y```

Ejecutar el script de instalación segura:

```mysql_secure_installation```

Creá una base de datos y un usuario para Nextcloud:

```mysql -u root -p

CREATE DATABASE nextcloud;
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextclouduser'@'localhost' IDENTIFIED BY 'tu_contraseña';
FLUSH PRIVILEGES;
EXIT;
```

#### Paso 5: Descargar e Instalar Nextcloud
```
wget https://download.nextcloud.com/server/releases/latest.zip
apt install unzip
unzip latest.zip -d /var/www/html/
```

Corregir permisos en el directorio /var/www/html/

```
chown -R www-data:www-data /var/www/html/nextcloud/
chmod -R 755 /var/www/html/nextcloud/
```

#### Paso 6: Configurar Apache para Nextcloud

```sudo nano nano /etc/apache2/sites-available/nextcloud.conf```

```
<VirtualHost *:80>
  ServerAdmin admin@ejemplo.com
  DocumentRoot /var/www/html/nextcloud/
  ServerName tu-dominio.com

  Alias /nextcloud "/var/www/html/nextcloud/"

  <Directory /var/www/html/nextcloud/>
    Options +FollowSymlinks
    AllowOverride All
    Require all granted
    <IfModule mod_dav.c>
      Dav off
    </IfModule>
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/nextcloud_error.log
  CustomLog ${APACHE_LOG_DIR}/nextcloud_access.log combined
</VirtualHost>
```

Habilitar sitio y modulo rewrite:

```
a2ensite nextcloud
a2enmod rewrite
systemctl restart apache2
```

#### Paso 7: Finalizar la Instalación de Nextcloud

Completá la instalación a través de la interfaz web navegando a http://tu-dominio.com/nextcloud. Seguí las instrucciones en pantalla para configurar tu cuenta de administrador, la conexión a la base de datos y otros ajustes.


Espero que les sirva este tutorial. Si no tienen una solucion local como lets encrypt y necesitan tener cifrado en caso de que su nextcloud esté expuesto a internet, pueden utilizar otra solución gratuita como cloudflare.

Pero eso, para otro post.

Si tienen preguntas pueden enviarme un DM en instagram o discord.

Adios!

Alexia.
