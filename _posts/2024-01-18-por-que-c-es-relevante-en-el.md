---
layout: post
title: Por qué C sigue siendo relevante en el año 2024
subtitle: Y lo seguirá siendo por mucho tiempo más.
cover-img: /assets/img/clang.png
#humbnail-img: /assets/img/c.jpeg
share-img: /assets/img/clang.png
tags: [internet, programacion, c, desarrollo, RTOS, low-level, programming]
author: Alexia
---
![C Lenguaje de Programacion]({{ '/assets/img/clang.png' | relative_url }})

La ECU (Engine Control Unit) de un vehículo es una computadora que no corre ni Linux, ni Unix, ni Windows, ni nada semejante. 
Corre un sistema operativo que funciona en tiempo real y se los conoce como RTOS, por sus siglas en inglés --Real Time Operating System.
Entre sus funciones principales se encuentran el despliegue de los Airbags ante un escenario de choque, 
la aceleración y la optimización de la combustión, es decir, cantidades precisas de oxígeno y combustible dentro 
de la cámara de combustión en el momento justo de la compresión y la chispa de la bujía.  

Pero la parte que nos interesa de la ECU para este post, es la del despliegue de los airbags ante un escenario de choque.
¿Por qué? Porque una ECU, por sí sola, no puede darse cuenta si el vehículo está chocando, frenando de golpe, 
o transitando sobre una calle de tierra con pozos o de adoquín que zarandea el auto para todos lados.


Su manera de detectar frente a qué escenario se está enfrentando el vehículo es a través de un sensor inercial 
que indica aceleración y rotación sobre los tres ejes tridimensionales, miles de veces por segundo.

Cuando la suma vectorial de las tres aceleraciones supera un determinado umbral, la ECU asume que el vehículo está chocando 
y no transitando, como conté anteriormente, sobre un terreno dificultoso, y es allí donde dispara los scripts
de seguridad que despliegan los airbags.

Si se preguntan que tiene que ver la ECU con el título de este artículo, paso a explicarles:

Decidí tomar la ECU como ejemplo porque cuando un vehículo se encuentra frente a un escenario de choque, 
los scripts de seguridad deben ejecutarse, no sólamente en tiempo récord, sinó que también en un tiempo absolutamente "_predecible_".
Una mínima latencia puede ocasionar que el despliegue de los airbags suceda, o antes del impacto, 
lastimando al conductor al momento del choque real, o después del impacto, y el conductor o la conductora 
de todos modos se parte el marote contra el volante.

El lenguaje de programación C es un lenguaje que llega directo al corazón en 1 milisegundo. 
Eso es lo que tarda en llegar al hardware. Esa latencia es la interrupción del kernel. 
Y lo más maravilloso de todo es que ha sido así en 1970 y es así en el 2024.
Todo el código sigue con absoluta precisión al reloj del procesador. Es decir, la única latencia es la producida por el cristal de cuarzo.

Ahora si medimos la latencia en algún lenguaje de más alto nivel, como Python, por ejemplo, que no es mala, es desafortunadamente "_variable_".

Es por eso que, tanto para una ECU, como para cualquier otro tipo de hardware crítico, 
como los que se utilizan a menudo en la industria aeroespacial, tanto C como C++ seguirán siendo los lenguajes predilectos para estas tareas.

* Por [Alexia Michelle](https://twitter.com/alexiarsteinn) para SysArmy
