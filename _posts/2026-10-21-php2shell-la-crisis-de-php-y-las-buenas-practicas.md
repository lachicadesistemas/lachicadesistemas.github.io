---
layout: post
title: "PHP2Shell: la crisis de PHP que obligó a apagar sitios en todo el mundo (y qué podemos aprender)"
subtitle: "Dos vulnerabilidades críticas, parches de emergencia y un repaso de buenas prácticas"
date: 2026-10-21 10:00:00 -0300
author: Alexia
categories: [seguridad, sysadmin, noticias]
tags: [php, seguridad, cve, php-fpm, apache, debian, parches, buenas-practicas]
lang: es
---

Hoy a la mañana, mientras me preparaba para ir a la oficina, leí la noticia y la verdad es que me agarró miedito. Lo primero que hice fue abrir el correo para ver si había alguna novedad en la lista de seguridad de Debian, a la que estoy suscripta.

Fue uno de esos días en los que quienes administramos servidores miramos el celular con miedo. Gobiernos y empresas de todo el mundo **desconectaron sitios y aplicaciones** de forma preventiva por dos vulnerabilidades críticas en **PHP**, el lenguaje que, nos guste o no, sigue moviendo buena parte de internet[^1].

Para dimensionarlo: según W3Techs, PHP está detrás de casi el **70 % de los sitios** cuyo lenguaje del lado del servidor se puede identificar, y es el motor de WordPress. Cuando PHP estornuda, la web entera se resfría.

## Qué pasó

El 21 de octubre el proyecto PHP publicó versiones de emergencia que corrigen dos fallas, bautizadas informalmente como **PHP2Shell**:

- **CVE-2026-109618** (CVSS v4.0: **9,2**): una corrupción de memoria que aparece cuando PHP se queda sin memoria (*out of memory*) mientras procesa una subida de archivos por formulario. Los datos de la petición quedan inicializados a medias y las rutinas de limpieza trabajan sobre ese estado inválido. Eso abre un camino a la ejecución remota de código[^2].
- **CVE-2026-109619** (CVSS v4.0: **9,2**): después de un error fatal queda **estado global "viejo"** en el *worker*, y una petición posterior que llega al mismo proceso puede reutilizarlo. También termina en ejecución de código[^2].

Lo que vuelve todo esto tan grave es que se trata de **ejecución remota de código sin autenticación**. No hace falta usuario ni contraseña. En el peor escenario, el de **Apache con mod_php**, los investigadores demostraron que **una sola petición HTTP** dispara el ataque durante el parseo automático del cuerpo, **antes de que se ejecute una sola línea de tu aplicación**[^2][^3]. Da lo mismo lo prolijo que esté tu código: el problema está un piso más abajo.

Según France 24, la primera falla la reportaron el 11 de agosto investigadores de la empresa Calif junto con OpenAI, y Wiz encontró los problemas por su cuenta y reportó otra el 24 de agosto. Wiz describió estas fallas como "entre las vulnerabilidades más graves descubiertas en PHP" y señaló que **llevaban décadas ahí**[^1].

## ¿Y qué puede hacer un atacante con esto?

Una ejecución remota de código sin autenticación significa que el atacante puede hacer que el proceso de PHP ejecute **código arbitrario**, es decir, el que él elija y no el de tu aplicación. A partir de ahí obtiene una *shell* en el servidor y corre **los comandos que quiera**, con los mismos privilegios que el usuario con el que corre PHP (en Debian, normalmente `www-data`). En la práctica, eso es tomar el control del servidor web. Con ese acceso puede, por ejemplo:

- **Leer tus archivos de configuración**, como el `wp-config.php` o el `.env`, donde suelen estar las contraseñas de la base de datos, las claves de APIs y las credenciales de correo.
- **Llevarse la base de datos completa**: usuarios, mails, contraseñas hasheadas, pedidos, datos de pacientes. Lo que haya.
- **Modificar tu sitio**: cambiar la portada (*defacement*), meter enlaces de spam o inyectar código que infecte o le robe datos a tus visitantes, por ejemplo en un formulario de pago.
- **Dejar una puerta trasera** (una *webshell*) para volver cuando quiera, **aunque después actualices PHP**. Por eso parchear no alcanza si ya te vulneraron.
- **Usar tu servidor para sus propios fines**: mandar spam, minar criptomonedas, sumarlo a una botnet o atacar a otros desde tu IP.
- **Saltar a otras máquinas**: si el servidor web puede ver el resto de tu red interna, se convierte en la puerta de entrada a todo lo demás.
- **Intentar convertirse en root**: combinando esto con otra falla local, puede terminar con el control total de la máquina, cifrarla y pedirte un rescate (*ransomware*).

Lo importante es que **no necesita ninguna cuenta ni que tu código tenga un bug**. Le alcanza con que tu sitio esté en internet y corra una versión vulnerable de PHP. Por eso los ministerios europeos prefirieron apagar los sitios antes que arriesgarse.

## El efecto dominó

La reacción fue inmediata. Los casos más visibles fueron los que se anunciaron públicamente en Europa[^1]:

- **Alemania:** el proveedor federal de servicios informáticos desactivó varios sitios.
- **Francia:** el Ministerio del Interior bajó temporalmente las páginas de las prefecturas.
- **Bélgica:** se vio afectado el ministerio de Asuntos Exteriores, que aclaró que no hubo explotación.
- **Países Bajos:** la federación de fútbol, los cinco principales partidos políticos, el Puerto de Rotterdam y sitios de hospitales se desconectaron por precaución.

El **CERT-EU** fue claro: hay pruebas de concepto circulando y considera *probable* que ya se estén explotando. Su recomendación central fue "*patch affected assets immediately*" y, si no se puede parchear, **sacar el servicio de internet** hasta que esté corregido[^3].

## ¿Estoy afectada? Versiones corregidas

| Rama | Versión corregida |
|------|-------------------|
| 8.5  | **8.5.12** |
| 8.4  | **8.4.27** |
| 8.3  | **8.3.36** |
| 8.2  | **8.2.35** (fin de vida el 31/12/2026) |
| 8.1 y anteriores | Sin release oficial: solo *backports* mínimos del código fuente para 7.4, 8.0 y 8.1, o paquetes de tu distribución o proveedor LTS |

Todas las versiones anteriores de cada rama son vulnerables. Las fallas afectan a cualquier PHP que atienda peticiones web: **mod_php, PHP-FPM, php-cgi, FrankenPHP y LiteSpeed**[^2][^4]. Que no haya un exploit completo demostrado para FPM **no significa que FPM esté a salvo**.

Las distribuciones recibieron los parches por adelantado. En Debian ya salió el **DSA-6574-1**, y Bookworm tiene `8.2.35-1~deb12u1` en el repositorio de seguridad[^5]. Si usás el repositorio de Remi (`rpms.remirepo.net`), tené en cuenta que lo mantiene un voluntario y no iba a tener actualizaciones el mismo día[^3].

## Lo que tenés que hacer hoy

En Debian o Ubuntu sería algo así:

```bash
sudo apt update
apt list --upgradable 2>/dev/null | grep -i php
sudo apt upgrade
```

Y acá viene el detalle que mucha gente pasa por alto:

```bash
# Esto te dice la versión del CLI...
php -v

# ...pero lo que atiende la web puede ser OTRO binario
php-fpm8.4 -v        # o la versión que corresponda
sudo systemctl restart php8.4-fpm   # y/o apache2
```

**`php -v` no siempre es el PHP que sirve tu sitio.** Y actualizar el paquete en disco **no cambia el código que ya está cargado en memoria** en los *workers*. Si no reiniciás FPM o Apache, seguís corriendo la versión vulnerable[^4]. Para confirmar, mirá la versión desde un `phpinfo()` temporal, y borralo después.

### Si no podés parchear ya mismo

Hay mitigaciones temporales. **Reducen el riesgo pero no te dejan a salvo**: "*Only an update fully fixes these vulnerabilities*"[^3].

- `session.upload_progress.enabled=0` en `php.ini` o en el pool de FPM, nunca vía `ini_set()` ni `.user.ini`.
- En PHP 8.5: `fatal_error_backtraces=0`.
- Bajar `post_max_size` a `8M` si no necesitás subidas, o a `32M` si las necesitás, con `upload_max_filesize` por debajo.
- Poner límites de tamaño, cantidad de campos, partes y encabezados en el servidor web o el proxy, y bloquear `multipart/form-data` si tu app no lo usa.
- `memory_limit=-1` fijado con `php_admin_value`, para que la aplicación no pueda pisarlo, y combinado con un límite de memoria por contenedor o cgroup. Evitá `RLIMIT_AS` y `RLIMIT_DATA`, que justamente disparan el camino vulnerable.
- Reiniciar **todos** los *workers* después de cada cambio.

Si nada de esto es posible, hacé lo que hicieron los ministerios europeos: **apagá el sitio hasta poder actualizar**. Un sitio caído unas horas es mucho mejor que un servidor comprometido.

## Las buenas prácticas que esta crisis nos recuerda

Ninguna de estas ideas es nueva, pero días como hoy separan a quien las aplica de quien las tenía "para cuando haya tiempo".

### 1. No corras versiones sin soporte

PHP 8.1 y anteriores no reciben releases oficiales. Hoy, quienes estaban en 7.4 "porque anda" dependen de un *backport* mínimo o de que su proveedor se apiade de ellos. Tener una versión con soporte no es un lujo: es lo que te permite aplicar un parche en minutos en vez de entrar en pánico. Anotá en el calendario las fechas de fin de vida (8.2 termina el **31 de diciembre de 2026**) y planificá la migración antes, no después.

### 2. Usá los paquetes de tu distribución

Las distros reciben los parches **antes del anuncio público** gracias a la divulgación coordinada. Si instalaste PHP compilado a mano o desde un repositorio de terceros, quedás fuera de ese circuito. Con `debian-security` configurado, un `apt upgrade` te resuelve el problema.

### 3. Automatizá las actualizaciones de seguridad

`unattended-upgrades` en Debian o Ubuntu, `dnf-automatic` en la familia Red Hat. Configuralo para que aplique **solo los parches de seguridad** y te mande un mail. Y no te olvides de que algo tiene que **reiniciar los servicios**: `needrestart` sirve justamente para eso.

### 4. Tené un inventario

¿Sabés cuántos servidores tuyos tienen PHP? ¿Y el NAS, el panel del hosting o ese appliance que "viene con una web de administración"? Mucho software trae PHP embebido sin que lo sepas. El CERT-EU recomienda revisar también los productos de terceros[^3]. No podés parchear lo que no sabés que existe.

### 5. Defensa en profundidad

Esta falla ocurre **antes** de tu código, así que ninguna validación en la aplicación te protege. Lo que sí ayuda son las capas de afuera:

- Un **proxy inverso o WAF** con límites estrictos de tamaño y forma de las peticiones.
- **Mínimo privilegio**: PHP-FPM con un usuario propio por sitio, sin permisos de escritura sobre el código y sin acceso a lo que no necesita.
- **Aislamiento**: contenedores, cgroups, `open_basedir`, `disable_functions` para lo que no uses. Si alguien logra ejecutar código, que el daño quede acotado.
- **Segmentación de red**: que el servidor web no pueda llegar a toda tu red interna.

### 6. Preferí PHP-FPM sobre mod_php

No es inmune, pero mod_php fue el escenario más expuesto en esta crisis. FPM además te permite separar *pools* por sitio, con usuarios y límites distintos, que es exactamente el tipo de aislamiento del punto anterior.

### 7. Logs, monitoreo y backups

Si te vulneraron antes de parchear, necesitás poder darte cuenta. Revisá los logs de acceso buscando peticiones `multipart` raras o anómalamente grandes, procesos hijos inesperados de `php-fpm` o `apache2` y archivos nuevos en el *document root*. Y tené **backups probados y fuera del servidor**: un backup que nunca restauraste es solo una esperanza.

### 8. Suscribite a las fuentes correctas

Como conté al principio, lo primero que hice hoy fue abrir el correo y fijarme en la lista de seguridad de Debian. No es casualidad: estar suscripta a [`debian-security-announce`](https://lists.debian.org/debian-security-announce/) me permite saber en minutos si ya hay un paquete corregido y qué versión instalar, sin depender de que alguien lo publique en las redes. Hacé lo mismo con la lista de tu distribución, y sumá las noticias de [php.net](https://www.php.net/) y los avisos de tu CERT nacional. Enterarte por las noticias está bien, pero enterarte **antes** está mejor.

### 9. Tené un plan para "apagar todo"

Lo que hicieron Alemania, Francia o los Países Bajos no fue improvisado: alguien tenía la autoridad y el procedimiento para decir "lo bajamos". Pensá de antemano quién decide, cómo se avisa a los usuarios y cómo se vuelve a levantar.

## Para cerrar

Hay algo que me quedó dando vueltas: estas fallas estuvieron en PHP **durante décadas**, y según Wiz su explotación superaba lo que podían encontrar los investigadores humanos[^1]. Una de las fallas la reportaron investigadores junto con OpenAI. Las mismas herramientas que hoy nos ayudan a encontrar bugs viejos también se los pueden mostrar a quien quiera explotarlos, así que la ventana entre "se publica el parche" y "está siendo explotado" se va a seguir achicando.

Y no creo que esto sea un caso aislado. En esta era de la IA, quienes administramos sistemas vamos a tener que acostumbrarnos a andar corriendo para todos lados con el matafuegos en la mano, porque crisis como la de hoy van a ser cada vez más comunes y más frecuentes. Por eso las buenas prácticas de arriba dejan de ser "lo ideal" y pasan a ser lo mínimo indispensable para no vivir apagando incendios.

Y también vale recordar que PHP es **software libre mantenido en gran parte por voluntarios**, que hoy sacaron parches para cuatro ramas activas y además *backports* para versiones que ya no tenían por qué soportar. Apoyar a la gente que se ocupa de sacar estos parches nunca está de más, y una forma de valorar su trabajo es, por ejemplo, donar a [The PHP Foundation](https://thephp.foundation/).

Mientras tanto: **actualizá, reiniciá los workers y verificá**. En ese orden.

---

[^1]: France 24, [Cinco claves de la crisis cibernética de PHP que encendió alarmas a nivel global](https://www.france24.com/es/ciencia-y-tecnolog%C3%ADas/20261021-cinco-claves-de-la-crisis-cibern%C3%A9tica-de-php-que-encendi%C3%B3-alarmas-a-nivel-global), 21 de octubre de 2026.
[^2]: Tenable, [php2shell (CVE-2026-109618, CVE-2026-109619): Frequently Asked Questions](https://www.tenable.com/blog/php2shell-cve-2026-109618-cve-2026-109619-frequently-asked-questions-about-critical-php-remote).
[^3]: CERT-EU, [Security Advisory 2026-018: Critical Vulnerabilities in PHP](https://cert.europa.eu/publications/security-advisories/2026-018).
[^4]: DEV Community, [PHP Patched the Two Critical RCE Flaws: Versions, Risk by SAPI, and Stopgaps](https://dev.to/jamilxt/php-patched-the-two-critical-rce-flaws-versions-risk-by-sapi-and-stopgaps-3oc5).
[^5]: Linuxiac, [Critical PHP Vulnerabilities Allow Remote Code Execution, Emergency Fixes Released](https://linuxiac.com/critical-php-vulnerabilities-allow-remote-code-execution/).
