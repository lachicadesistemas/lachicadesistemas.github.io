---
layout: post
title: "¿Qué es un byte?"
subtitle: "por qué son 8 bits y por qué es tan importante en informática."
date: 2025-07-15
share-img: /assets/img/tecnologia-2025-05-18.png
layout: post
author: Alexia
tags: [byte, bit, historia, etimologia, informatica]
---


# ¿Qué es un byte?


Todos nuestros dispositivos electrónicos hablan un mismo idioma, o mejor dicho, un sistema de numeración específico.

Los sistemas de numeración más conocidos son el decimal, el octal (base 8) el hexadecimal (base 16) y el binario (base 2).

Todos estos equipos hablan binario. Desde tu computadora, tu telefono móvil y hasta tu televisor inteligente, y la unidad básica de ese lenguaje es el famoso 
**bit** (que significa _binary digit_).  
Pero, ¿qué es un **byte** y por qué todo el mundo habla de ellos como si fueran la moneda oficial de la informática?

## El bit: el átomo de la información digital

Antes de hablar de byte, vamos con el bit:  
Un **bit** es la unidad mínima de información. Puede valer **0** o **1**.  
Es como una lucecita que puede estar apagada (0) o encendida (1).  De hecho es eso. Es un pulso eléctrico. Pero si quieren saber mas miren mi video en youtube sobre Historia de la computación donde hablo en profundidad de todo esto.

Volviendo al bit, la cosa es que los bits por si sólos no pueden hacer demasiado, es por eso que se agrupan en grupitos de 8.

## ¿Por qué 8 bits? - El origen del byte

Como acabo de mencionar, un **byte** es simplemente un grupo de **8 bits**.

Pero… ¿por qué 8 y no 5, 6 o 10?  
Bueno por que en la decada del 60, cuando IBM diseñaba sus primeras computadoras, necesitaban una manera estándar de almacenar un **caracter** (una letra, un número, un signo de puntuación).  
Después de probar diferentes opciones, se dieron cuenta que con 8 bits podían representar **256 combinaciones distintas** (de 00000000 a 11111111), más que suficiente para todos los caracteres del alfabeto, números, símbolos y hasta algunas instrucciones especiales.

Es decir, un “byte” era la cantidad mínima de información suficiente para almacenar un carácter.  

En los primeros años, hubo “bytes” de 6, 7 o incluso 9 bits, pero el de 8 bits ganó la batalla.

Así que si bien no hay nada que indique que un byte tiene que tener 8 bits, este fue el estandar creado por IBM y se quedó para siempre.

## El orígen etimológico de la palabra “byte”

La palabra **byte** no existía antes de la computación.  
Fue inventada en 1956 por **Werner Buchholz**, un ingeniero de IBM. Él quería un término para diferenciar un conjunto de bits de otras unidades, y para evitar errores de tipeo con “bit”, le cambió la letra **i** por una **y**. Así que pasó a llamarse byt, que al pronunciarlo (en ingles) suena como el verbo morder (bite) y de ahi a byte.


## ¿Para qué sirve un byte?

Un byte puede almacenar, por ejemplo:

- Una letra (como la A, la ñ, o el símbolo $)
- Un número entre 0 y 255
- Un color en una imagen muy básica
- Un comando para un programa

Y cuando se encadenan varios bytes, ya empezamos a hablar de otras unidades de medida como **kilobytes (KB)**, **megabytes (MB)**, **gigabytes (GB)**, etcétera.

## Resumiendo

Un **byte** es:

- 8 bits juntos.
- La unidad básica de almacenamiento en computadoras.
- Suficiente para guardar un carácter o número pequeño.
- Un invento de los años 50, que sigue vigente hasta hoy.

Así que la próxima vez que veas cuánto pesa una foto, o cuánta memoria tiene tu computadora, ahora sabés que, en el fondo, todo se reduce a la cantidad de caracteres que tu memoria ram o tus discos pueden almacenar, o a que velocidad tanta cantidad de caracteres se pueden transferir.
---

## ¿Por qué un megabyte son 1024 kilobytes y no 1000?

Acá hay una historia divertida (¡y un poco polémica!) sobre los múltiplos en informática.

En la vida cotidiana, usamos el sistema decimal: 1 kilómetro = 1000 metros, 1 kilogramo = 1000 gramos. Pero en computación, los múltiplos suelen ser potencias de 2, no de 10.  
¿Por qué? Porque las computadoras usan el sistema binario, donde todo se basa en ceros y unos.

### Potencias de 2: la clave del asunto

- 1 kilobyte (KB) = **1024 bytes**  
- 1 megabyte (MB) = **1024 kilobytes**  
- 1 gigabyte (GB) = **1024 megabytes**

Esto ocurre porque 1024 es **2^10** (2 elevado a la décima potencia).  
Elegir 1024 y no 1000 hace que el conteo “encaje perfecto” en la arquitectura binaria de la memoria y almacenamiento de una computadora.

### ¿Entonces, 1000 o 1024?

Originalmente, los ingenieros usaban “kilo” para referirse a 1024 porque es muy cercano a 1000, pero no exactamente igual.  
Eso generó confusión. Para la mayoría de la gente, “kilo” siempre fue mil. Por eso, en los años 90, un comité internacional propuso nuevos nombres para evitar líos:

- **1 kibibyte (KiB) = 1024 bytes**  
- **1 kilobyte (kB) = 1000 bytes**  
- **1 mebibyte (MiB) = 1024 KiB**  
- **1 megabyte (MB) = 1000 kB**

Pero… la mayoría de la industria siguió usando “kilobyte” y “megabyte” para referirse a 1024.  
Por eso, cuando comprás un disco o una memoria, a veces ves menos espacio disponible: los fabricantes usan 1 MB = 1.000.000 de bytes (decimal), pero la compu lo calcula en base 1024 (binario).  
¡Así que no te están robando, solo están usando otra definición!

---

**Resumen rápido:**  
- En informática tradicional:  
  - **1 KB = 1024 bytes**  
  - **1 MB = 1024 KB**  
  - Porque la base es binaria (potencias de 2)
- En el sistema internacional:  
  - **1 kB = 1000 bytes**  
  - Pero esto casi no se usa en la vida real digital

  ### Y para ir cerrando.. Sabian que sus discos de 1TB tienen menos de "1TB"?

Seguro alguna vez compraste un disco rígido, pendrive o memoria que prometía tener **1 TB** (terabyte), pero cuando lo conectaste a la computadora… ¡aparecían menos de 1 TB disponibles!  
¿Te estafaron? ¡No! Es solo un truco de unidades.

**Los fabricantes de discos** cuentan el terabyte en sistema decimal:  
- **1 TB = 1.000.000.000.000 bytes** (mil millones de bytes)

**Pero tu sistema operativo** lo calcula en sistema binario:  
- **1 TiB (tebibyte) = 1.099.511.627.776 bytes** (1024^4)

Entonces, cuando tu compu recibe esos mil millones de bytes y los divide en bloques de 1024, el resultado es menos de 1 “TB” en términos binarios:



_Por Alexia Michelle_