---
layout: post
title: Compilando e instalando el kernel Linux
subtitle: ¿Por qué? No hay porque.
thumbnail-img: /assets/img/kernelinstall.jpg
share-img: /assets/img/kernelinstall.jpg
tags: [nerd, geek, linux, kernel, c, programming, programacion, coding]
author: Alexia
---

### ¿Por qué compilar mi propio kernel?

En realidad nunca tuve planes de compilar un kernel. Soy usuaria de [debian](https://www.debian.org), con seguridad, desde hace 21 años, previo a eso usaba slackware
Y si conocen slackware entienden perfectamente lo que eso significa. 

Desde que me pasé a debian no tuve motivos para utilizar otro sistema. Es una distro que cumple con todo lo que necesito. Así que genuinamente no he tenido necesidad de cambiarle el kernel, jamás.

Sin embargo, instalarle un nuevo kernel y ver que funciona genera cierta satisfacción --dificil de poner en palabras pero que mis lectores habituales, mayormente nerds como yo, seguramente entienden a lo que me refiero. 

Así que dije, _¿Por qué no?_


Compilemos el último kernel. Bueno, el kernel más reciente pero _stable_. Y esto es importante.


Meterle un kernel inestable a un debian es un sinsentido total. La fortaleza más grande de debian es justamente su estabilidad, es decir, que los paquetes que llegan a su repositorio stable han pasado por una gran cantidad de filtros de control y testeo.  Así que sacarle una pieza central como el kernel para reemplazarlo por uno de juguete es una chiquilinada. 

Asimismo, el factor aprendizaje es igual de importante en la ecuación. A la hora de crear una puede ignorar completamente el parrafo que escribí previamente y preparar un ambiente seguro donde se pueda sacrificar un debian en pos de adquirir expertise. 

En realidad no se sacrifica nada por que en el peor de los escenarios si el kernel nuevo no funciona se puede reiniciar y bootear con el kernel original y listo. 


Pero lo que disparó la curiosidad en realidad fue que hace algunas semanas, en una comunidad debian en la que participo, un participante hizo un posteo contando como gracias a un repositorio en github y siguiendo una serie de pasos pudo compilar el último kernel. 

Me dió mucha curiosidad, debo admitir. Así que fui a mirar el repositorio que había publicado y me gustó mucho como lo habían hecho, pero consideré que era bastante vueltero también y quizás yo podría hacer algo similar pero de manera más sencilla. 

Y ahí me puse a codear.

En un primer momento hice un script en bash muy rudimentario que hacia exactamente lo mismo que hace ahora, primero verifica que los paquetes necesarios para compilar el kernel y realizar todas las tareas en el antes durante y después estén instalados, luego descarga el último kernel stable desde [kernel.org](https://kernel.org) lo configura, lo compila lo instala y listo.

Hice una prueba con una maquina virtual con debian 12 y funcionó bien. El proceso demoró unas 3:30hs. 

Así que ahí pensé reescribirlo pero en C. No por un motivo en particular. Me encantaría decirles que fue para que el programa se ejecute más rapido, consuma menos energía y menos recursos, lo que es técnicamente cierto. Pero es mentira. No fue ese el motivo. 

Sino que tenía ganas de jugar con C un rato. De hecho el código no es tanto más distinto a lo que sería un script en bash del montón. Es más un programa de control que una aplicación. No reemplaza herramientas como git, wget, tar, rsync u otros, sino que las utiliza mediante la funcion ```system()``` de la standard lib.

Ejemplo:

```
// Creo una funcion llamada "run" que en realidad usa la función system
int run(const char *cmd) {
    printf("\n Running: %s\n", cmd);
    int r = system(cmd);
    if (r != 0) {
        fprintf(stderr, " Command failed: %s (exit %d)\n", cmd, r);
        exit(EXIT_FAILURE);
    }
    return r;
}
```

Luego se puede utilizar de la siguiente forma:
```
run("sudo apt install -y "
    "build-essential libncurses-dev bison flex libssl-dev libelf-dev "
    "bc wget tar xz-utils fakeroot curl git debhelper libdw-dev rsync locales");

```

![Screenshot Alexia Kernel Installer]({{ '/assets/img/kernelinstall.jpg' | relative_url }})

Luego pensé en darle una pequeña interfaz "gráfica" (una TUI en realidad) así que la hice en _Dialog_ y el programa (me da cosa llamarlo programa a este engendro)
se fija primero que dialog esté instalado, sinó lo instala y reinicia el programa.


Y ahí está funcionando. 

Hace lo mismo que antes. Instala los paquetes, descarga el kernel, lo configura para debian (Si, por ahora debian sólamente) genera la imagen en .deb con el header, lo instala y lo único que el usuario tiene que hacer es reiniciar el sistema y elegir el nuevo kernel desde el menú de grub. 

Lo probaré en alguna distro base ubuntu en algún momento. Pero por ahora sólo funciona en debian o en cualquier distro que use debian como upstream directo (mismos repos, kernel etc) como por ejemplo Goldendog (mi "distro") o Linux Mint LMDE. Si hay otras mas avisenme por que no soy muy de estar al día con los cientos de miles de clones de debian que andan dando vueltas por ahí.

Ahora está corriendo en un server mío físico que tiene debian 12 y se está tomando su tiempo. Lo ejecuté a las 18:06, son las 22:28 y aun sigue allí. Superó el record de la VM de 3:30hs. Cabe aclarar que este servidor es un equipo del año 2010 con un procesador de 2 núcleos y 4G de ram. 


Pero por ahora parece que todo funciona bien. 

Con respecto al idioma yo generalmente suelo desarrollar y comentar en inglés no por que me pinte ser cipaya sino por que me gusta ser prolija con lo que tengo planes de lanzar al público como código libre. Para recibir colaboración más adelante más que nada.

Algo que suelo hacer, y esto ya es más un pensamiento en voz alta que algo relacionado con el motivo de este blog post, es comentar en castellano durante la primera fase de desarrollo, cuando aun no sólo estoy desarrollando y ordenando el código sino también mis ideas.

Luego muchos de esos comentarios desaparecen, o los traduzco, o mejoro el código para que sea facil de leer, pero he publicado código con las strings en inglés y mis comentarios en castellano en el pasado así que aprovecho esta oportunidad para disculparme a todas las personas que no son de habla hispana que se toparon con algo de código mío en el pasado y no entendieron un carajo. 

No mentira, no me arrepiento de nada. Viva la lengua española.

Creo que ya excedi el límite diario de monólogos innecesarios. Mejor lo cierro aquí, guardo y tiro push. 

En breve estará disponible en mi repositorio. No se cuando, estimo que en un par de días más. 


¡Nos vemos pronto!

-- Alexia.