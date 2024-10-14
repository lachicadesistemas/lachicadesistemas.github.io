---
layout: post
title: ¿Por qué el puerto para SSH es el 22?
subtitle: A alguien se le ocurrió colocarlo ahí
#cover-img: /assets/img/kernel.jpg
share-img: /assets/img/hackergirl_idea.png
tags: [filesystems, linux, reiserfs, ext3, ext4, xfs, fat, ntfs]
author: Alexia
---

La historia comenzó en la primavera del año 1995. Una época donde los protocolos más utilizados eran **telnet** y **ftp**.

Fue otro finlandés, no _Linus Torvalds_ pero sí egresado de la Universidad de Helsinki, quién, además de inventar **_SSH_** eligió el puerto 22.

El objetivo era que SSH (Secure Shell) reemplazara tanto a telnet (Puerto 23) como a ftp (puerto 21). Y el puerto 22 estaba libre en esos años.
Por lo cual resultaba muy conveniente que fuera justo ese, entre el 21 y el 23. 

Una vez decidido el puerto, había que pedirlo. Pero ¿A quién?

Los puertos eran delegados por el IANA (Internet Assigned Numbers Authority) así que, tal como lo había hecho Linus 4 años antes cuando anunció el kernel,
Tatu Ylonen, también lo hizo por e-mail pero enviado al IANA.


En su correo, escribió lo siguiente:

> He escrito un programa para conectarse de manera segura desde una maquina hacia otra en una red insegura. Provee muchas mejoras en seguridad y funcionalidades en comparacion a protocolos e implementaciones como rlogin y telnet. En particular, previene IP, DNS y outing spoofing. Mi plan es distribuir este software de manera libre en internet y que se adopte su uso lo más posible. Me gustaría poder obtener el registro de un puerto para ello. El numero debería ser preferentemente en el rango del 1-255 así puede ser utilizado en el campo WKS en nameservers. Envio el RFC para el protocolo a continuación. Me gustaría poder publicar este software durante la semana. En este momento estoy utilizando el puerto 22 y el nombre para el software es "ssh" por "Secure Shell". Muchas gracias. 
Tatu Ylonen <ylo@cs.hut.fi> 

Al día siguiente recibió una respuesta del IANA:

> Tatu, hemos asignado el puerto 22 a "ssh". A partir de ahora sos el punto de contacto.


Así fue como nació SSH y con el puerto 22 asignado por el IANA. 

El 12 de julio de 1995 se anunció la versión beta de ssh-1.0.0. 


Si bien el puerto 22 es default en cualquier instalación que conocemos, es igualmente conocido que para utilizar otro puerto, aun uno registrado para otros usos (ej, el 80 --y no no esuchen ssh en el 80!) es algo que
se puede configurar facilmente desde sshd_config 

Al utilizar el comando ssh, si no se le pasa el parametro -p y el puerto no-estandar por argumento, ssh asume el puerto 22. 


Espero que hayan aprendido algo nuevo en el día de hoy. 

¡Adiós!


