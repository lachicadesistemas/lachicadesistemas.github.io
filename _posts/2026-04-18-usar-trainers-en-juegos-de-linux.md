---
layout: post
title: "Como usar trainers tipo WeMod en Linux"
date: 2026-04-18
author: Alexia
tags: [linux, hacking, gaming, modding]
---

## ¿Por qué usar un trainer?

Existen algunos juegos que no vienen con una consola de desarrollo ni modo creativo y a veces queremos explorar assets o límites y para ello posiblemente necesitemos alterar manualmente algunas regiones de memoria.



O bien algunas personas simplemente quieren hacer trampita en algunos juegos colocandose inmortalidad o cosas así.

Para correr trainers de windows en juegos de windows en Linux hay que seguir algunos pequeños pasos:


## Descargar wemod-launcher

```git clone https://github.com/DeckCheatz/wemod-launcher```

por ahora dejarlo clonado ahi, en nuestro homedir esta bien.

Por algun motivo el launcher no me permitió registrar una cuenta, pero sí loguearme con una cuenta existente, asi que fui por fuera del trainer y me registré: [wemod.com/join](https://wemod.com/join)


También tuve que descargar algunos paquetes adicionales:

```sudo apt install python3-tk```


El creador de wemod-launcher en github recomienda correr el trainer usando la version GE de glorious eggroll de proton y da una serie de pasos para lograr este fin, como yo ya uso proton GE ignoré todos esos pasos.


Pero pueden descargar los distintos releases de proton GE desde aquí (https://github.com/GloriousEggroll/proton-ge-custom/releases)[https://github.com/GloriousEggroll/proton-ge-custom/releases] y agregarlos a su instalación de steam.

luego tenemos que agregar, en las propiedades del juego con el que queremos hacer trampita, la ruta a wemod launcher del siguiente modo: ```/home/usuarioaqui/wemod-launcher/wemod %command%``` 

![Steam props](/assets/img/steam-props.png)


Una vez hecho esto, ir al directorio clonado de wemod-launcher, correr el script de wemod e instalarlo, da dos opciones, sólo para ese prefix o para todos los juegos, recomendaría que elijan para todos los juegos así no tienen que instalarlo una y otra vez.


Con esto hecho, simplemente lanzar el juego, se abrirá wemod como si estuvieran en windows, se pueden loguear con la cuenta que crearon y listo, a hacer trampita.

