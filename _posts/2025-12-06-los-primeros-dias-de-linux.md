---
layout: post
title: "Los primeros días de Linux (The early days of Linux)"
date: 2025-12-06
author: Alexia
tags: [linux, software libre, historia]
---
Este es un artículo escrito por el amigo personal de Linus Torvalds, Lars Wirzenius. Originalmente publicado en LWN.net. He decidido traducirlo al español por su gran valor historico y cultural.

El resto del artículo no ha sufrido modificaciones por mí.


Me llamo Lars Wirzenius, y estuve allí cuando Linux comenzó. Linux es ahora un éxito global, pero sus comienzos fueron bastante más humildes.

Estos son mis recuerdos de los primeros días de Linux, su creación y el inicio de su camino hacia lo que es hoy.

Comencé mis estudios de ciencias de la computación en la Universidad de Helsinki en el otoño de 1988, y conocí a Linus Torvalds, quien era el otro nuevo estudiante de habla sueca en ciencias de la computación ese año.

Hacia el final de ese primer año, obtuvimos acceso a un servidor Unix, y accidentalmente encontré Usenet, el sistema de discusión, al escribir mal `rm` como `rn`, el lector de Usenet. Le conté a Linus sobre ello y pasamos demasiado tiempo explorando esto.

Después del primer año, ambos nos fuimos a hacer el servicio militar obligatorio, aunque en lugares diferentes.

Regresamos a nuestros estudios universitarios en el otoño de 1990, y ambos tomamos el curso de programación en C y Unix, que incluía también una buena cantidad de teoría sobre la arquitectura del kernel de Unix.

Esto nos llevó a leer sobre otros kernels de sistemas operativos, como QNX y Plan 9. Linus y yo discutíamos con cierto entusiasmo sobre cómo debería construirse correctamente un sistema operativo.

Teníamos todo el exceso de confianza de estudiantes universitarios de segundo año de 20 años. Es mejor para todos que esto no haya quedado grabado para la posteridad.

En enero de 1991, Linus compró su primera PC en una tienda local que ensamblaba computadoras por partes. La PC tenía una CPU 386, que era relativamente lujosa en ese momento, porque Linus quería explorar la multitarea.

Además, como venía de un Sinclair QL con una CPU Motorola 68008 de 32 bits, quería una CPU de 32 bits y no quería bajar a una de 16 bits, por lo que un 286 no era una opción. La primera PC de Linus tenía la friolera de 4 megabytes de RAM y un disco duro.

Consiguió una copia del juego Prince of Persia, que ocupó la mayor parte de su tiempo libre durante los siguientes meses.

Más tarde también compró una copia de MINIX, porque después de usar Unix en la universidad, quería algo así en casa también.

## As y Bs

Después de terminar el juego, Linus comenzó a aprender el lenguaje assembly para el chip Intel.

Un día me mostró un programa que hacía multitarea. Una tarea o hilo escribía un flujo de la letra "A" en la pantalla, la otra "B"; los cambios de contexto eran visualmente obvios cuando el flujo de As se convertía en Bs. Esta fue la primera versión de lo que más tarde se conocería como el kernel de Linux.

Linus expandiría más tarde el programa y escribiría la mayor parte en C.

Durante este tiempo, a finales de la primavera de 1991, escribí una implementación de la función `sprintf()` de C para él, ya que aún no había aprendido a escribir funciones con listas de argumentos variables.

Quería ahorrarle el dolor de tener una función diferente para cada tipo de valor a escribir. El núcleo de este código todavía está en el kernel, como `snprintf()`.

A medida que pasaba el tiempo, Linus mejoraba su incipiente kernel y seguía implementando cosas nuevas.

Después de un tiempo, tenía controladores para el teclado y el puerto serie, emulación de secuencias de escape de terminal VT100 para la pantalla, y podía usarlo para marcar a través de un módem a la universidad para leer Usenet desde casa. ¡Ciencia ficción!

Un día, Linus intentó accidentalmente usar su disco duro para marcar a la universidad, lo que resultó en que su sector de arranque maestro comenzara con "ATDT" y el número de teléfono del grupo de módems de la universidad. Después de recuperarse de esto, implementó permisos de archivos en su kernel.

En agosto de 1991, Linus mencionó su nuevo kernel en público por primera vez, en el grupo de noticias comp.os.minix. Esto incluía la frase "Estoy haciendo un sistema operativo (gratuito) (solo un pasatiempo, no será grande y profesional como gnu)". Tanta humildad.

El sistema se llamó inicialmente Freax. Unas semanas más tarde, Linus le pidió a Ari Lemmke, uno de los administradores de ftp.funet.fi, que subiera el primer archivo tar. Ari eligió el nombre Linux. La versión inicial todavía contiene el nombre original incrustado en uno de los archivos fuente.

Durante este tiempo, la gente estaba interesada en probar esta cosa nueva, por lo que Linus necesitaba proporcionar un método de instalación e instrucciones.

Como solo tenía una PC, vino a visitarme para instalarlo en la mía. Dado que su computadora se había utilizado para desarrollar Linux, que simplemente había crecido sobre su instalación de Minix, nunca se había instalado realmente antes.

Por lo tanto, la mía fue la primera PC donde se instaló Linux. Mientras esto sucedía, yo estaba tomando una siesta, y recomiendo este método de instalación de Linux: dormir la siesta, mientras Linus hace el trabajo duro.

Las primeras versiones de Linux usaban una licencia que prohibía el uso comercial. Algunos de los primeros colaboradores sugirieron un cambio a una licencia de software libre.

En el otoño de 1991, Richard Stallman visitó Finlandia y llevé a Linus a una charla dada por Stallman. Esto, la presión de los colaboradores y mi insistencia finalmente convencieron a Linus de elegir la licencia GNU GPL en su lugar, a principios de 1992.

Durante las vacaciones de Navidad, Linus implementó memoria virtual en Linux. Esto hizo que Linux fuera un sistema operativo mucho más práctico en máquinas baratas con poca memoria.

## 1992

El año 1992 comenzó con el famoso debate con Andrew Tanenbaum, quien es profesor universitario y autor de MINIX. Tenía algunas opiniones sobre Linux y su arquitectura.

Linus tenía opiniones sobre MINIX. El debate ha sido descrito como una guerra de llamas (flame war), pero en realidad fue bastante civilizado en retrospectiva.

Más importante para el éxito futuro de Linux fue que el sistema X11 fue portado a él, haciendo de 1992 el año del escritorio Linux.

Yo había elegido contribuir en el lado de la comunidad, en lugar de directamente al kernel, y ayudé a responder preguntas, escribir documentación y cosas por el estilo.

También dirigí un boletín de corta duración sobre Linux, que es principalmente interesante por publicar la primera entrevista con Linus. El boletín fue reemplazado efectivamente por el grupo de noticias comp.os.linux.announce.

La primera distribución de Linux también se inició en 1992: Softlanding Linux System o SLS.

Al año siguiente, SLS se transformó en Slackware, lo que inspiró a Ian Murdock a iniciar Debian en 1993, con el fin de explorar una estructura de desarrollo más basada en la comunidad. Algunas otras distribuciones seguirían en los años venideros.

En 1993, tanto Linus como yo fuimos contratados como asistentes de enseñanza en la universidad. Pudimos compartir una oficina.

Esa habitación tenía una PC, que Linus se apropió y usó para el desarrollo de Linux. Yo estaba feliz con una terminal DEC para acceder a Usenet.

Un día, Linus estaba aburrido y la PC del trabajo se sentía lenta. Pasó el día reescribiendo el analizador de línea de comandos del kernel de Linux en lenguaje assembly, para ganar velocidad. (Eso fue, por supuesto, bastante inútil, y el analizador sería reescrito nuevamente en C más tarde, por portabilidad. Su velocidad no importa).

Un par de años después, pasó días jugando Quake, supuestamente para probar la gestión de memoria del kernel, aunque eso fue con una PC más nueva. Hubo mucha diversión en esa habitación, y no hubo bromas en absoluto. Ninguna en absoluto.

En algún momento, Linux ganó soporte para Ethernet y TCP/IP. Eso significaba que uno podía leer Usenet sin tener que usar un módem.

Por desgracia, el código de red inicial de Linux era ocasionalmente un poco tosco, habiendo sido escrito desde cero. En un momento dado, Linux enviaba algunos paquetes rotos que derribaban todas las máquinas Sun en la red.

Como era difícil arreglar el kernel de Sun, Linux fue prohibido en la red de la universidad hasta que se solucionó su error. No tener acceso a Usenet desde el propio escritorio es un gran motivador.

## 1.0

En la primavera de 1994 sentimos que Linux estaba terminado. Acabado. Nada más que añadir. Uno podía usar Linux para compilarse a sí mismo, leer Usenet y ejecutar muchas copias del programa xeyes a la vez.

Decidimos lanzar la versión 1.0 y organizamos un evento de lanzamiento. Se invitó a la prensa informática finlandesa, e incluso una estación de televisión envió un equipo.

La mayor parte del evento consistió en compilar ceremonialmente Linux 1.0 en segundo plano, mientras Linus y otros hablaban sobre qué era Linux y para qué servía. Linus explicó que el Unix comercial para una PC era tan caro que era más fácil escribir el tuyo propio.

En 1995, Linus y yo hicimos un curso de ingeniería de software en la universidad, que consistía principalmente en un gran proyecto práctico. Esto se construyó sobre Linux, por supuesto.

Insistí en que se usara un sistema de control de versiones. Había sido testigo de estudiantes en cursos anteriores haciendo el tipo de control de versiones a gritos: los estudiantes compartían un árbol de fuentes sobre NFS y gritaban "Estoy editando este archivo" cuando cambiaban algo.

Esto no me parecía un método efectivo, así que insistí en CVS, del que acababa de enterarme. Esta experiencia es la razón por la que a Linus no le gusta CVS y durante años se negó a usar cualquier control de versiones más allá de subir archivos tar a sitios FTP.

Ese año fue también cuando Linux fue portado por primera vez a una nueva arquitectura por Linus. Le habían dado una máquina DEC Alpha.

Más tarde conseguiría la máquina para usarla como terminal para leer Usenet. Otras personas portaron Linux a otras arquitecturas, pero eso no resultó en que yo consiguiera más máquinas para leer Usenet.

En 1997, Linus se graduó y se mudó a los EE. UU. para trabajar en Transmeta. Yo acepté un trabajo en una universidad diferente en el área de Helsinki.

En los años siguientes, sucedieron muchas cosas. Resultó que todavía faltaban algunas características en Linux, así que la gente trabajó en ellas.

Se acuñó el término "código abierto" (open source) e IBM invirtió una tonelada de dinero en el desarrollo de Linux. Netscape publicó una versión de su navegador web como código abierto.

Saltando algunos detalles y muchos años, el código abierto básicamente se apoderó del mundo. LWN se inició y cubrió gran parte de esta historia semana a semana.

En 1991, Linus escribió que Linux "no será grande y profesional como GNU".

En 2023, Linux se ejecuta en todos los continentes, en todos los océanos, en miles de millones de dispositivos, en órbita y en Marte. Nada mal para lo que comenzó como dos hilos, escribiendo flujos de As y Bs en la pantalla.

[Link al artículo original en LWM.net](https://lwn.net/Articles/928581/)