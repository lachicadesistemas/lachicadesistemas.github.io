---
layout: post
title: Systemd me freeza el sistema.
subtitle: ..al final no era problema de hardware
thumbnail-img: /assets/img/systemd2.png
share-img: /assets/img/systemd2.png
tags: [systemd, troubleshooting, linux]
author: Alexia
---

Hace algún tiempo, cuando comencé a realizar tareas muy intensivas con mi PC, comenzó a tener fallas random.


Les doy un poquito de contexto: Esta PC esta armada con hardware moderno, tiene un micro _Intel_ Core i7 7700k moderno
y soporta instrucciones AMD64 v1, v2 y v3. Posee más de 1.6TB de espacio en disco de los cuales más de la mitad están
disponibles, 64GB de RAM DDR4 y la GPU es una NVIDIA RTX 3060 Lite Hash Rate. Claramente el problema no venía por el 
lado del hardware. 

## El inicio de las fallas

Todo comenzó cuando instale Red Hat Enterprise Linux 8.5. Anduvo bien un momento, pero cuando configuré el driver module nvidia (RPMFusion) comenzó con 
fallas esporádicas. Mayormente se freezaba plasmashell.

Asimismo y sin poder dar con nada interesante en dmesg o los logs de plasma, continué operando --cási-- con normalidad. 

Este sistema lo actualicé en caliente hasta RHEL 8.9 y las fallas se hacían cada vez más notorias, así que decidí migrar a Debian. 

## Una solución que no fue tal

Instalado debian 12, pensé que solucionaría muchos de los problemas, ya que con mi instalación de RHEL, mucho del software puntual que yo utilizo requirió 
que inserte modulos a mano y compile software desde el codigo fuente pisando paquetes oficiales. En teoría no debería haber traido problemas, pero, de todas
maneras --pensé-- Mejor pasarme a una distro más preparada para un desktop como Debian o Arch, que poseen una gran cantidad de paquetes para software
de escritorio y desarrollo y veremos que pasa. 

![VMWare Logo]({{ '/assets/img/hackergirl_idea.png' | relative_url }})


## Los problemas se agudizaron con Debian

A los pocos días, una vez que ya tenía configurado todo el sistema como a mi me gusta, las fallas random comenzaron a aparecer nuevamente. No se si es por
el uso que yo le doy a la maquina o que, pero si me ponía a renderizar video no podía tener más de 4-5 tabs abiertos en firefox, y si dejaba compilando
algo en C, directamente no podía tocar la maquina. Raaro < en voz de Dario Barassi, el conductor de TV >

Nuevamente no observaba ningún problema en los logs que me diera un indicio de por qué colapsaba el sistema, más aun cuando, con todo el sistema colapsado (lease plasmashell freezado, aplicaciones sin responder, etc) me aceptaba las hotkeys para pasarme a PTS y el sistema estaba barbaro. Desde la pseudoterminal tiraba un htop
y veía que los ocho núcleos del procesador estaban sin carga, como así también el uso de memoria virtual, etc.

Super raro!


## Investigando...

Inicialmente pensé que el problema estaba con KDE Plasma, ya que en google, búsquedas similares a mi problema arrojaron un bug con plasma y los drivers mesa, pero
no sólo no era mi problema, sinó que esos bugs se reportaban sobre una versión de mesa inferior a la que yo tengo instalada. Descartado.


## Finalmente detecto un patrón

Un día estaba queriendo compilar un video pesadito para mi canal, de unos 6.7GB en promedio. Naturalmente mi editor de video se tomaba su tiempo para renderizar, pero esta 
vez, se tomaba más tiempo que lo habitual. Se me ocurrió cerrar varias aplicaciones para ver si era un tema de procesos en uso y bingo. Comenzó a funcionar correctamente.

Fue allí cuando recordé que hace algún tiempo atrás había configurado un límite duro de 7000 procesos para cualquier usuario en el sistema, a pesar de que soy la única 
usuaria de este sistema. 

Eliminé la config que había creado y liberé los límites. Pero no lo resolvió.

Frustrada, por que sabía que el problema estaba viniendo por una especie de limitante de software, descubrí algo que jamás había visto o considerado.


## El culpable era SYSTEMD

Luego de investigar un poquito, vi que systemd genera un modelo de uso del sistema donde cada unidad se llama **_Slice_** y le asigna una determinada cantidad de slices a 
cada usuario. Obviamente systemd no sabe cuantos usuarios van a operar con la maquina, así que, por las dudas, crea un default que se lo aplica a cualquier usuario,
donde le da un porcentual de slices por defecto. En el caso de systemd para debian, este porcentual está seteado al 30%, es decir, un usuario local sólo puede usar,
como máximo, el 30% de los recursos de la maquina. 

Ahora todo me cerraba. 
![VMWare Logo]({{ '/assets/img/hackergirl_victoriosa.png' | relative_url }})

Lo que hice fue, entonces, ya que soy la única usuaria del sistema, asignarme casi toda la torta para mi sola:


```
cd /usr/lib/systemd/system/user-.slice.d
vim 10-defaults.conf
```

Qué se veía así:

```
#  SPDX-License-Identifier: LGPL-2.1-or-later
#
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

[Unit]
Description=User Slice of UID %j
Documentation=man:user@.service(5)
StopWhenUnneeded=yes

[Slice]
TasksMax=30%
```


Así que lo que hice fue simplemente incrementar el porcentual de TasksMax

```
[Slice]
TasksMax=70%
```
Obviamente que esto requiere que se recargue el daemon de systemd, ```systemctl daemon-reload```

Aunque en mi caso también requirió reiniciar la maquina, quizás por que mi user estaba logueada en la TTY y pseudoterm también. Ustedes me dirán. Si hacía un killall 
hubiese necesitado levantar los modulos de audio a mano y era mucho más facil y agil un ```sudo shutdown -r now```

Ni bien recuperó del restart hice un stress test que salió perfecto y luego decidí utilizar el sistema durante 1 semana con uso intensivo a ver si fallaba nuevamente o no.
Y como no volvió a fallar, decidí escribir este post.

Ojalá le sirva a alguien que experimenta cuelgues randoms y con hardware que debería soportar mucha más carga.


¡Adiós!

