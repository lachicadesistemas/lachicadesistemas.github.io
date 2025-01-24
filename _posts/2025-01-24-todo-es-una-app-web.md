---
layout: post
title: Todo es una app web ahora. Y creo que está bueno
date: 2025-01-24
categories: [webassembly, web, browsers, sockets, http, https, Open Source]
Author: Alexia Michelle
---

Todo es una aplicación web ahora, menos los browsers (jaja) Pero sí. Paso a explicar:

Los navegadores, debido a su masiva adopción por parte de practicamente todo el mundo, se convirtieron en el 
estandar para correr software, en muchos casos, apropiandose inocentemente (o no) de territorio ajeno.

Lo cierto es que a medida que los browsers mejoraron en su poder y eficiencia, comenzaron a apropiarse de dominios
que antes pertenecían al mundo de las aplicaciones instalables. Y en la actualidad, para bien o para mal, todo es una maldita aplicación web.


Pensemos en el protocolo HTTP, el protocolo subyacente de la web. Comenzó como un protocolo a nivel de aplicación 
para que los navegadores intercambiaran hipertexto y multimedia (hasta ahí) con los servidores web, pero en el software moderno se ha 
convertido en un transporte de datos genérico. Estoy escribiendo esta publicación en un editor de terminal (nano) 
que luego guardaré, haré un git push a mi repositorio de github y jekyll hará su magia para que ustedes puedan leerlo en forma de articulo en mi blog. 

Hasta aquí no dije nada ni nuevo ni revolucionario. HTTP para más que hipermedios no es una idea nueva. Una nota del 
W3C de 1998 describió los beneficios de construir un sistema RPC sobre HTTP:

> El mecanismo de transporte ya está proporcionado por HTTP; no hay necesidad de otro protocolo de red. Asimismo, esto reduce el número de parsing necesario en el cliente. En general, menos código significa menos errores de software, clientes más ligeros y mayor interoperabilidad.

Notablemente, la justificación no era que HTTP fuera el mejor protocolo posible para esto. Sino que planteaba que 
HTTP __**Would get the job done**__ o, en crillo, lograría hacer la tarea. Los clientes ya eran ubicuos y permitía a 
las y los desarrolladores abocar su tiempo a construir (o adaptar) las aplicaciones en lugar de discutir que otro protocolo de red utilizar.

No es la primera vez que una cosa se inventa para una cosa y se termina usando para otra.

- el WD40 se inventó para desplazar la humedad y hoy lo usamos hasta casi de quitamanchas. Pero volviendo al mundo 
tech, - HTML comenzó como un formato para documentos de hipertexto, pero a medida que se volvió más capaz, las 
aplicaciones se lanzaron a él como un motor de diseño de interfaz de usuario multiplataforma. Y esto es en parte, lo 
que le está permitiendo a Linux ir ganandose un lugarcito cada vez mas grande en el segmento desktop, entre otras 
cosas.

- JavaScript comenzó como un lenguaje pequeño de scripting para web del lado cliente y hoy en dia lo quieren usar hasta para fritar milanesas. 
 
- WebSockets aparece como una forma para que los navegadores y los servidores tuvieran comunicación 
full duplex, pero ahora se utiliza fuera del navegador para cosas como bots de Slack, Mattermost, y monitores del mercado de valores en tiempo real. 
 
- AV1, el formato de video en streaming que transmite Netflix, comenzó como un formato 
centrado en la web y ahora está hasta integrado en algunos televisores. "smart"

- XML Fue inventado como un formato para... No, mejor no hablemos de eso.


## ¿Por qué tuvieron éxito estas tecnologías fuera del navegador? Puedo pensar en algunas razones:

- Debido a que es difícil cambiar los estándares web una vez que se publican, tienden a ser razonablemente robustos 
al cambio y lo suficientemente generales como para anticipar el futuro. Es un testimonio de la flexibilidad de HTTP 
que haya logrado transformarse en un transportador RPC, servidor de video en streaming y facilitador de conexiones a 
dúplex completo, mientras sigue pareciendo su forma original.

Esto es un poquito como lo que sucedió en california con los incendios. Los yankis saben que las casas de material 
son mejores que las de madera, pero fabricar casas de madera allí es lo normal, lo instaurado y lo que van a seguir 
haciendo.

- Las etapas de la posguerra de los browsers alimentaron inversiones masivas en software de código 
abierto de alta calidad. Google construyó el runtime V8 para hacer que Chrome fuera rápido, lo que proporcionó una 
base para que Ryan Dahl construyera Node.js. El motor de renderizado Blink de Google (y WebKit de Apple, y KJS de 
KDE por procedencia) proporciona la base para el marco de interfaz de usuario de escritorio Electron. Ambos son 
ejemplos de proyectos de código abierto que habrían sido esfuerzos técnicos gigantescos para los pequeños equipos 
que los construyeron, si no hubieran tenido tecnologías web sobre las que construir.

- Los estándares web tienden a estar libres de patentes como requisito de diseño. AV1, en particular, es un ejemplo 
de esto, donde un subproducto de la economía de los navegadores llevó a trabajos de I+D que cualquiera puede usar, 
en contraste con los estándares de codificación de video anteriores que fueron financiados por tarifas de licencia.

- Las aplicaciones que se cuelgan de la teta de los protocolos web se benefician del hecho que la vasta mayoría de las configuraciones de red permiten HTTP saliente sin mucho piripipí, ahorrandote tiempo que de otro modo perderías configurando reglas de firewall y coso. 

### Pero también existen tecnologías que están proximas a romper el cascarón y escaparse del browser. Por ejemplo:

- **WebAssembly** - El esfuerzo por hacer de WebAssembly un runtime completo fuera del navegador ya está en marcha, 
con la aparición de WASI y una lista creciente de empresas construyendo sobre WASM del lado del servidor.

- **WebGPU** - La primera generación de una API de GPU basada en el navegador, WebGL, se basó en estándares 
existentes de OpenGL. Para la próxima generación, WebGPU, los creadores de navegadores se propusieron crear una 
nueva API que aproveche las capacidades modernas de las GPU. WebGPU parece estar listo para convertirse en una capa 
de propósito general multiplataforma para aplicaciones tanto nativas como en el navegador.

- **QUIC** - QUIC, el protocolo sobre el que se asienta HTTP/3, es una innovación interesante en sí misma que tiene 
potencial para transportar tráfico no HTTP. Se desacopló intencionalmente de HTTP/3 con esto en mente. El hecho de 
que esté destinado a transportar una gran parte del tráfico global de internet significa que los cortafuegos que 
bloquean conexiones UDP desconocidas tendrán razones para hacer una excepción para QUIC. Los protocolos que se 
aprovechan de QUIC no solo se beneficiarán de las propias características de QUIC (como multiplexión, control de 
congestión, cifrado, migración de conexión del cliente); también tendrán más probabilidades de atravesar cortafuegos 
de una manera que no ha sido posible para nuevos protocolos basados en UDP.

Una de las consecuencias más visibles de todo esto es un cambio en lo que respecta a como se suele o se solía financiar el software en el pasado. En la actualidad muchas compañías lanzan estas cosas de manera libre y gratuita por que forman parte del ensamblado de sus exploradores, que al menos en el caso de google, es financiado mayormente a través del negocio de los anuncios publicitarios.

Pero supongo que a quienes militamos el mundo del software libre esto nos beneficia. Cuando un codec o un formato grafico es un negocio rentable, los coloca ineludiblemente fuera del alcance de los y las entusiastas que buscan construir cosas en base a estos proyectos de manera libre y gratuita. Son modelos de negocio que, en lo personal, estoy contenta que, al menos en un futuro cercano, no vuelvan. 
