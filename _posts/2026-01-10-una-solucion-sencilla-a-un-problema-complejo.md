---
layout: post
title: Una solución sencilla a un problema complejo.
share-img: /assets/img/goldendog-grub.jpg
tags: [linux, software, programación]
author: Alexia 
---

En otro capitulos de _Historias de una desarrolladora backend armando una distro linux_, quería compartir con ustedes que desde que comencé con el desarrollo de GoldenDog Linux 2 muchas cosas han sucedido. Fundamentalmente por que no solo se trataba de lanzar una versión modernizada de goldendog, sinó que también se trataba de modernizar el flujo de trabajo para que sea lo más similar al del desarrollo de un sistema operativo linux profesional.

Así que GoldenDog 2 son dos desarrollos en simultaneo, por un lado el desarrollo de todo el "Como se construye GoldenDog", es decir el diseño del workflow y todo el tooling, y luego el desarrollo de la distro propiamente dicha.

Lo normal es ir testeando en hardware virtualizado que es mas sencillo que estar instalando en un equipo real hasta lograr resolver los problemas inherentes al desarrollo y luego si testear en hardware real.

El problema que comencé a observar es que varios virtualizadores como vmware "cachean" la iso. Entonces si se instaló una version de pruebas de GoldenDog, puede en algunos casos instalar la misma versión aun si se le indica que use una iso recien descargada.

La primera solución fue la de comenzar a versionar las iso. 

Antes, todas, indistinto del build eran "goldendog-testing.iso"

Luego comenzaron a ser versionadas siguiendo el ritmo del changelog

```goldendog-<version>.iso```

Esto solucionaba parcialmente el tema, pero el nuevo formato de tooling de goldendog permite construir goldendog para otras arquitecturas, y si bien ahora el foco está puesto en x86-64, es muy posible que pronto salgan builds para ARM, por ejemplo, entonces nuevamente cambié la nomenclatura para que refleje:

```goldendog-<version>-<arch>.iso```

Y es así como las vemos hoy, por ejemplo, ```goldendog-2.0.6-amd64.iso```


Sin embargo esto no previno del todo el problema de cache, un colega hizo un video resaltando errores en goldendog que ya habían sido corregidos, y esto sucedió por que estuvo haciendo una review con una iso cacheada.

Así que la solución real, en vez de estar adivinando si la iso es la correcta revisando cambios dentro del build una vez instalado fue mas sencilla de lo que parece. 

El instalador en su grub ahora muestra la versión del build:

![goldendog-grub.jpg](/assets/img/goldendog-grub.jpg)

Algo tan sencillo como esto permitirá, de ahora en adelante, saber si la iso que se está cargando en el virtualizador coincide con la versión que está mostrando el instalador. 


Simple y efectivo. (por ahora)

-- Alexia.