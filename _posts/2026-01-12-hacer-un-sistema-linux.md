---
layout: post
title: Hacer un sistema Linux no es algo sencillo.
share-img: /assets/img/ilustrativa.jpg
tags: [linux, software, programación]
author: Alexia 
---

Desde que comencé con el proyecto GoldenDog Linux y he estado compartiendo mis avances con mis colegas, amigos y entusiastas de la informática en internet, he recibido numerosos mensajes de apoyo y preguntas. Pero la más recurrente es: ¿Cuando sale?

Y esa pregunta es muy dificil de responder, por que la respuesta más honesta es: _Saldrá cuando esté lista_. 

Lo que pasa es que responder algo así podría malinterpretarse como soberbia, y la gente que pide la distro la está pidiendo por que también tiene un gran entusiasmo, también tiene expectativas, y considero que está mal dejarlos sin respuesta, pero la diferencia entre su entusasmo y el mío es que no logran dimensionar la complejidad detrás y el impacto de cada decisión de diseño.

Armar un sistema operativo estilo Unix como Linux es muy muy complejo. 

Perdón, armar un respin de debian lo puede hacer cualquiera, pero armarlo bien no. Eso es otra cosa, de otro orden.

Sentarse un rato a hacer autocrítica, dejar los egos de lado, comprender el propósito, el ¿Por qué estoy haciendo esto? ¿Para qué lo estoy haciendo? ¿Con qué objetivos?

Por que ensamblar un sistema operativo es mucho más que la satisfacción de sentarse a contemplar la obra terminada y decir: Yo hice esto con mis propias manos.

Eso está bien para un compositor musical o un artista plástico, pero no para un sistema operativo. Aquí la responsabilidad es mucho mayor, y lo digo sin desmerecer a los artistas --y muchos de ustedes, queridos lectores recurrentes, saben que yo además de nerd, también soy música. 

Pero a un sistema operativo, a diferencia de una escultura o una pieza muscial, se le confían claves bancarias, transacciones digitales, compras online, fotos familiares, recuerdos, claves y documentos personales, credenciales de acceso a tu empresa, etc etc etc.  No es chiste esto. Los usuarios te confían prácticamente todo lo que tienen. Y eso hay que honrarlo. 

Es por eso que GoldenDog está pensada desde 3 pilares y en el siguiente orden:

1. Seguridad
2. Privacidad
3. Simplicidad

Y, parafraseando a Linus Torvalds describiendo Unix: No hay que confundir simplicidad con falta de sofisticación. Se requiere de mucho diseño e inteligencia para desarrollar algo que funcione bien y de manera simple.

Entonces me encuentro en esa etapa. Donde los avances son cautos, donde la seguridad es prioridad, donde cada cambio se prueba bajo diferentes contextos. Y todo eso demanda tiempo.

Yo ya tengo muy claro como va a ser el producto terminado. No estoy improvisando. Lo que sucede es que cada cosa nueva tiene que llevarse muy bien con el resto de las cosas que ya existen. Es lo que llamamos en desarrollo de software _Cohesion and Coupling_ o Cohesión y acoplamiento. Es decir, por un lado que tan especifica es una cosa y por otro lado que tan interdependientes son las cosas entre sí. Lo ideal en cualquier pieza de software es lograr tener un alto grado de cohesión y un bajo grado de acoplamiento. Esto significa que cada cosa hace algo muy puntual y que las cosas también sean independientes entre sí. Si los marié no se preocupen, lo explico de otro modo:

Si goldendog fuera un solo paquete, y una parte se rompiera, o tuviera un bug, tendría que reemplazar el paquete entero. O dejaría de funcionar la suite completa. En cambio si goldendog son muchos paquetes independientes, donde cada uno cumple una determinada funcion, tal como los fusibles de un coche, podemos reemplazar el que no funciona bien sin arruinar todo el sistema eléctrico.

Y todo eso requiere diseño. Mucho. 

![goldendog-grub.jpg](/assets/img/ilustrativa.jpg)
_imagen ilustrativa generada artificialmente con google gemini(IA)_


En el pasado, cuando instalar linux era algo complejo e instalarle software, más. Era razonable que las diferentes distros preinstalaran muchas cosas para hacerle la vida más facil a la gente. Era comun encontrar una distro orientada a desarrollo grafico con muchas herramientas de edicion, u otra a desarrollo web con lo suyo y así.

Y esa conducta de creer que una distro es mas o menos según la cantidad de software que trae preinstalado aun persiste pero no tiene mucho sentido en el mundo actual. hoy 2026 lo que hay que evaluar no es eso sinó: 

a - Que tan limpio está el sistema
b - Que tan facil es instalarle cosas

Si yo le preinstalo, por ejemplo,el navegador chrome al usuario en goldendog, algo que a un usuario le demanda 2 minutos de su tiempo entrando en la pagina de chrome y descargando el .deb, sentiría que lo estoy insultando. 


Por eso goldendog no preinstala prácticamente nada. El slogan es: Construida para no estorbar. Y esa es la idea. Un sistema que es sistema, esta ahí, funcionando. Sin estorbar. 

Sin pavadas, sin bloat. Un entorno limpio y seguro para que el usuario tenga la libertad de instalar lo que le interese y configurarlo a su manera.

Pero tampoco está pensada desde la arrogancia de no escuchar a tus usuarios y personas que desean colaboarar. 


Hace un tiempo por ejemplo, yoyo, un colega, probando goldendog mostró como le gustaba usarlo con las fuentes de ubuntu. Mirando su video dije: Tiene razón. Se ve mucho más bonito. Y entonces decidí agregarlas. 


Otro colega mio, Juan, instaló goldendog en una macbook y me dijo que no le funcionaba el audio: Y pensé esto es una necesidad real, muchas personas posiblemente se topen con el mismo problema en el futuro, entonces desarrollamos documentación para corregir ese error en las macbook intel.

Mantener ese balance entre escuchar a los usuarios pero al mismo tiempo ser consistentes con la visión del producto de principio a fin es lo que considero que hace que un sistema tenga identidad propia.

Y todas estas cosas demandan tiempo. 

No quiero aburrirlos con los pormenores técnicos por que además para eso pueden seguir [el changelog](https://goldendoglinux.org/es/changelog)

Pero luego de estas palabras, si pudiera responder esa pregunta inicial creo que sería: 

Este sistema lo estoy desarrollando principalmente para mí. Y cuando yo esté segura que está listo, cuando yo lo instale en mis equipos principales y lo use a diario, ahí la compartiré con todos ustedes pero no antes. Pero por ustedes. Por que es un sistema que también se lo instalaré a mi pareja, a mi madre, a compañeros de trabajo.  

Si la distro no está lista para mi uso diario (Y ustedes saben lo detallista que soy con la ciberseguridad y las buenas prácticas) entonces estaría siendo deshonesta con todos ustedes si se las doy a ustedes primero. Yo no haría algo así. 