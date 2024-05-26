---
layout: post
title: Tenemos que hablar sobre goldendog
subtitle: Mi proyecto de distro linux para Desktops
tags: [goldendog, linux, debian, distros, opensource, software libre]
author: Alexia
---

### ¿Qué pasa con GoldenDog?

En escencia, hay una cuestión de sindrome de la impostora detrás. Es decir, siento que aun no está lista. Cada vez que estoy por publicar la .iso
siento que aun queda mucho más por hacer, pero la verdad es que funciona bien, no tiene ni bugs ni nada.


Bueno si uno: Calamares.


Para quienes no saben, Calamares es el instalador. Es un software que se utiliza para instalar la distro en el disco duro.

Hay varios instaladores: Anaconda (Redhat, fedora, rockylinux, centos) Debian Installer (Debian) Calamares (Arch linux, GoldenDog y otros) y Ubiquity (Linux Mint, Ubuntu)

Calamares es el que mejor funciona con KDE, el entorno de escritorio con el que viene GoldenDog, pero tiene cosas que a mi no me gustan, como por ejemplo,
tiene bugs para instalar el sistema como LVM. 

Nada que un usuario avanzado/a no pueda solucionar, pero requiere que se armen las particiones primero con cfdisk, algo que no mucha gente entiende como usar.

Estoy evaluando de si shipearla asi, ya que generalmente la gente que instala una distro en una laptop NO INSTALA LVM, o bien viendo de ver si puedo
reemplazarlo por ubiquity.

Anoche hice pruebas usando debian installer, el instalador grafico de debian, pero las pruebas no salieron bien, aunque las hice sobre una distro live y no 
empaqueté el instalador en la .iso y la buildié. Resta probar eso. 


También, a nivel personal, siento que el momento que publique goldendog todo puede salir bien o todo puede salir mal. La gente puede recibirla muy bien
o la gente puede criticarmela un montón.

Por las dudas siempre aclaro que no es una distro que intente destronar ni ser mejor que ninguna otra. Es un proyecto personal mayormente para aprender
que quise compartir. 

Aun no le puse fecha al lanzamiento por que estoy resolviendo estas cosas. Pero usar si se puede usar perfectamente bien.


Otra posibilidad es que cuando salga Plasma 6 para Debian y utilice la nueva versión de Calamares para QT6, este problema con LVM esté solucionado. 

Anoche intenté compilar Calamares pero no funcionó, por que el nuevo usa qt6 y la versión de plasma de GoldenDog usa qt5. Sabia que probablemente no funcionaria
pero queria probar igual que grado de retrocompatibilidad tenía. 

Así que en resumen, es eso.

Vengo trabajando en goldendog desde el 2016, aproximadamente, y he abandonado el proyecto en reiteradas oportunidades por cuestiones similares. 

Inclusive la primera versión estaba basada en CentOS. De todas maneras cada vez que lo retomo, lo retomo con mayor conocimiento y le hago cosas mucho mejores.

Pero quiero lanzar algo, que la gente sea consciente de que es una primera versión y que en el futuro mejorará. 


Soy muy perfeccionista a veces y me juega un poco en contra.


