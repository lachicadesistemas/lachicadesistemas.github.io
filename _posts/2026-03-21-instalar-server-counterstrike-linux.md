---
layout: post
title: "Instalar Server de Counter Strike 1.6 en Linux"
subtitle: "y no morir en el intento"
share-img: /assets/img/cs.png
author: Alexia
tags: [linux, gaming, valve, steam, counterstrike]
---

La primera vez que jugué counterstrike fue hace más de 25 años. Con la versión 1.3, bastante antes de que Steam existiera,
de hecho, si se me permite chapear un poco, mi cuenta de steam es una de las más antiguas del mundo aun activas. (Maldita nerd)

Pero bueno, ahora se preguntarán, ¿Qué hace una señora de 43 instalando un server de counter strike clasico (1.6) en el 2026?

Paso a explicar:

Con mis compañeros de trabajo veníamos bromenado acerca de reunirnos a jugar unas partiditas de cs, y yo no tuve mejor idea que decir _"Hey, yo podría levantar un servercito"_, total tengo varios servers en mi laboratorio y sería para poca gente. 


Es algo que hice en el pasado unas cuantas veces y no pensé que sería laborioso. A grandes razgos recordaba que tenía que instalar steamCMD, luego metamod y por ultimo el plugin de amxmod para poder tener comandos extendidos de admin y agregarle plugins divertidos. 

Sin embargo, varias cosas han cambiado y ahora es un poco distinto el proceso si se desea tenerlo rapido y no morir en el intento.

Así que paso a explicar como lo hice en linux, instalandolo en un server **_Debian 13_**.

### Paso 1: Instalar Dependencias

```
# Habilitar 32-bit y actualizar
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install lib32gcc-s1 lib32stdc++6 curl patchelf
```

### Paso 2: Descargar SteamCMD

```
mkdir ~/steamcmd && cd ~/steamcmd
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

### Paso 3: Instalar Counter Strike

```
mkdir cs
./steamcmd.sh +force_install_dir ~/cs +login anonymous \
+app_update 90 -beta steam_legacy validate +quit
```

### Paso 4: descargar Metamod y AMX MOD

Esta parte no es necesaria para jugar con amigos pero si se desea revivir la experiencia de principios del 2000, server de cs con amxmod es la que va.

AMX Mod es un plugin para metamod, asi que hay que instalar ambos

ir a [[amxmodx.org/downloads.php](https://www.amxmodx.org/downloads.php)]

Descargar Metamod, AMX MOD Base y el plugin para tu juego, en este caso, Counter strike.

Al momento de redactar este breve articulo, los links son:

[Metamod](https://www.amxmodx.org/release/metamod-1.21.1-am.zip)
[AMX MOD BASE](https://www.amxmodx.org/amxxdrop/1.10/amxmodx-1.10.0-git5474-base-linux.tar.gz)
[AMX MOD CS](https://www.amxmodx.org/amxxdrop/1.10/amxmodx-1.10.0-git5474-cstrike-linux.tar.gz)

Creamos el directorio:
```
mkdir -p ~/cs/cstrike/addons/metamod/dlls
```
descomprimimos metamod y copiamos ```metamod.so``` alli.

nos pasamos al dir de metamod:
```
cd ~/cs/cstrike/addons/metamod/ 
creamos un nuevo archivo llamado plugins.ini
y le ponemos la siguiente línea:
linux addons/amxmodx/dlls/amxmodx_mm_i386.so
```
Ahora vamos a linkear metamod:

```
cd ~/cs/cstrike/
editamos liblist.gam, de modo que nos quede así:

game "Counter-Strike"
url_info "www.counter-strike.net"
url_dl ""
version "1.6"
size "184000000"
svonly "0"
secure "1"
type "multiplayer_only"
cldll "1" 
hlversion "1111"
nomodels "1"
nohimodel "1"
mpentity "info_player_start"
gamedll "dlls\mp.dll"
gamedll_linux "addons/metamod/dlls/metamod.so"
gamedll_osx "dlls/cs.dylib"
trainmap "tr_1"
edicts	"1800"
```

Ahora descomprimimos amxmod base y amxmod cstrike, y copiamos su contenido a
```
~/cs/cstrike/addons/ 

de modo tal que nos quede una estructura similar a esta:
alexia@vulcano:~/cs/cstrike/addons$ tree -L 2
.
├── amxmodx
│   ├── ACKNOWLEDGEMENTS.txt
│   ├── configs
│   ├── data
│   ├── dlls
│   ├── GPLv2.txt
│   ├── GPLv3.txt
│   ├── LICENSE.txt
│   ├── logs
│   ├── modules
│   ├── plugins
│   └── scripting
└── metamod
    ├── dlls
    └── plugins.ini

11 directories, 5 files
```

Y ahora la parte que más tardé en resolver, por que hasta acá lo hice relativamente rapido, pero cuando lanzaba el servidor, amxmod no cargaba. Estuve 3 horas literal intentando reparar esto, probando diferentes versiones de amxmod y de metamod, le pregunté a chatgpt, gemini, y a claude y ninguna IA daba con la solución.

También busqué en google, pero la mayoría de los casos con una falla similar citaban problemas de versión de amxmod o metamod, pero ¿Si yo descargué las tres cosas desde el sitio oficial de amxmod, por qué no funcionaba?


Hasta que se me ocurrió ir a la comunidad de amxmod y consultar allí. 
A los 5 minutos una persona me dice que le tire patchelf --clear-execstack a amxmod 

O sea:
```
patchelf --clear-execstack cstrike/addons/amxmodx/dlls/amxmodx_mm_i386.so
```

Y ahi todo tuvo sentido!
Debian 13 y los kernels mas modernos tienen una funcion llamada NX (no execute) o DEP (Data execution prevention)
Algunas librerias antiguas a veces tienen una flag que solicita un stack ejecutable.

Pero debian 13 y los kernels modernos sospechan de cualquier libreria que pida esto.

Así que cuando metamod intentaba cargar amxmod en el arranque del server, el linker dinamico del sistema (ld.so) veía que amxmodx_mm_i386.so pedia RWX para el stack. Y el sistema le decía que no sin dar mucha más info.

Al patchear el elf con --clear-execstack editamos los metadatos de la libreria, que es basicamente decirle al kernel:
_"ignorá lo que el compiler original dijo, esta librería no necesita ejecutar codigo del stack"_


### 5: Correr el server

```
cd ~/cs_server
./hlds_run -game cstrike +ip 0.0.0.0 +maxplayers 12 +map de_dust2
```

Y así finalmente podremos volver a tener un server de un juego que salió en el 2003 y aun cada tanto nos sigue sacando una sonrisa. 

Ojalá que si estuvieron quemandose las pestañas tratando de hacer andar un server de cs 1.6 y tras darse por vencidos con las IAs y google les dio este post mio, les sirva de mucha ayuda.

¡Adiós!
