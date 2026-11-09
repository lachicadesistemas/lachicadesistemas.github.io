---
layout: post
title: "Internet funciona gracias a gente que donó su tiempo"
subtitle: "De Linux a Wikipedia: el software y el conocimiento que se construyen en el bazar"
tags: [software libre, open source, linux, comunidad, historia]
author: Alexia
---

Esta semana leí una nota publicada en [MIT Press Reader](https://thereader.mitpress.mit.edu/from-linux-to-wikipedia-how-volunteers-build-the-internet) que me dejó pensando bastante. La escribieron Benjamin Mako Hill, Christian Pentzold y Aaron Shaw, autores del libro *Peer Production* (MIT Press), y cuentan algo que quienes trabajamos en esta industria vemos a menudo pero que pocas veces nos detenemos a pensar: **una parte enorme de lo que hace funcionar internet fue construida por personas que nadie contrató para hacerlo**.

Y mientras la leía me acordé de uno de mis libros *tech* de cabecera, que leí ya hace unos cuantos años: *La catedral y el bazar*, de Eric S. Raymond. Así que en esta humilde columna, queridos lectores, intentaré concatenar ambas.

## Solo por diversión

En agosto de 1991, un estudiante finlandés de 21 años mandó un mensaje al grupo de noticias `comp.os.minix`:

> *"I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386(486) AT clones."*


Era Linus Torvalds, y ese "hobby" es Linux. En su libro *Just for Fun* (2001, escrito junto a David Diamond), dice que desarrolló Linux **_Solo por diversión_**. Hoy corre en prácticamente todos los servidores del planeta, en las 500 supercomputadoras más potentes del mundo, en los celulares Android, en routers, televisores, autos y en la Raspberry Pi que tengo conectada a la tele. Y en el camino se comió a los Unix propietarios de Sun, HP e IBM, empresas con miles de ingenieros y presupuestos enormes.

La frase de la nota que más me gustó es justamente sobre eso: Linux agarró casi todos los aspectos de cómo se desarrollaba software propietario *"y los tiró por la ventana"*. No había un jefe de producto, ni un roadmap aprobado por una gerencia, ni un equipo asignado. Había un código publicado, una lista de correo y gente que mandaba parches porque quería. De hecho al día de hoy, el kernel sigue desarrollándose vía email.

## Wikipedia: el experimento que no debería haber funcionado

El otro gran ejemplo de la nota es Wikipedia, y la historia es todavía más contraintuitiva.

Antes de Wikipedia existió **Nupedia**: una enciclopedia online, libre, pero hecha bajo la vieja usanza. Los artículos los escribían expertos y pasaban por un proceso de revisión de varias etapas. Era rigurosa, ordenada y... casi no producía nada. En su primer año tenía apenas un puñado de artículos terminados.

Wikipedia nació en 2001 casi como un experimento paralelo: *¿y si dejamos que cualquiera edite?* Sonaba a la mejor receta para el desastre. Hoy tiene **unos 68 millones de artículos** en más de 300 idiomas. Solo la versión en inglés se construyó con más de mil millones de ediciones, hechas por más de 121 millones de cuentas y millones de personas anónimas, casi todas voluntarias. Y la enciclopedia "seria" quedó como una nota al pie de su historia.

La nota también menciona un caso que no conocía: **GuttenPlag Wiki**. En 2011, mientras preparaba el programa de una materia, un profesor de derecho, Andreas Fischer-Lescano, encontró pasajes sospechosos en la tesis doctoral de Karl-Theodor zu Guttenberg, por entonces ministro de Defensa de Alemania. Un usuario de Twitter levantó el tema y pidió ayuda, y muchos voluntarios se sumaron a un wiki creado para eso. En un par de días ya habían marcado cientos de páginas con plagio documentado. Unas dos semanas después, zu Guttenberg renunció a todos sus cargos. Nadie coordinaba eso desde arriba: era gente con tiempo, ganas y una herramienta para colaborar.

## La catedral y el bazar

Acá es donde vuelvo a Raymond. En 1997 escribió un ensayo (después convertido en libro) donde contrapone dos formas de construir software:

- **La catedral**: el software se construye como una catedral medieval, por un grupo reducido de arquitectos, en aislamiento, con un plan cuidadoso, y solo se muestra cuando está "terminado". Así trabajaban las empresas, pero también muchos proyectos libres de la época, como Emacs o GCC.
- **El bazar**: un mercado ruidoso, caótico, donde todo el mundo opina, publica, prueba y corrige. Así trabajaba Linux.

Raymond pensaba que el bazar no podía funcionar para algo tan complejo como un sistema operativo. Linux le demostró que estaba equivocado, y entonces hizo el experimento él mismo con un programa propio, **fetchmail**, para entender por qué funcionaba.

De ahí salen algunas frases que todavía se citan:

- *Todo buen software nace de una curiosidad que el desarrollador quiere explorar* (Raymond lo dice con una expresión en inglés, *"scratching a developer's personal itch"*, que es más o menos similar en concepto). Es decir, no es un ticket que alguien asigna: es la respuesta a un problema que apareció mientras se investigaba algo que generaba intriga.
- *"Publicá temprano. Publicá seguido. Y escuchá a tus usuarios."*
- Y la más famosa, que bautizó como **ley de Linus**: *"Con suficientes ojos, todos los bugs son superficiales."* ¿Por qué? Porque, entre nosotros, es más fácil aplicar un patch que encontrar un bug. Lo difícil es dar con el problema, y cuanta más gente mira el código, más chances hay de que alguien lo encuentre.

El ensayo tuvo un impacto concreto: en 1998 influyó en la decisión de Netscape de liberar el código de su navegador, lo que terminó dando origen a Mozilla y, años después, a Firefox.

## Por qué funciona (y por qué las empresas no lo pueden copiar del todo)

Yochai Benkler, un profesor de derecho, le puso nombre a esto a principios de los 2000: **producción entre pares basada en lo común** (*commons-based peer production*). La idea es que, cuando el costo de colaborar baja casi a cero (gracias a internet), aparece una tercera forma de organizarse que no es ni el mercado ni la empresa.

Una empresa funciona con jerarquía: alguien decide qué se hace, lo asigna y controla que se cumpla. Eso tiene ventajas, pero también costos enormes: reuniones, cosas que requieren aprobación, prioridades que cambian según el trimestre, proyectos que se cancelan porque no cierran en una planilla, etcetera.

En el bazar, en cambio:

- **Cada quien elige en qué trabajar.** Quien sabe de drivers de red arregla drivers de red; quien sabe de historia bizantina escribe sobre historia bizantina. La asignación de tareas se resuelve sola.
- **El trabajo es modular.** Se puede aportar una línea de código o una coma en un artículo sin entender el proyecto entero.
- **Todo es público.** Cualquier persona puede revisar, discutir y corregir. Los errores se ven, y eso también es una forma de control de calidad.
- **La motivación no es (solo) la plata.** Es aprender, resolver un problema propio, la reputación, el placer de hacer algo bien o simplemente sentir que se está devolviendo algo a la sociedad.

Lo vivo de cerca como parte de la comunidad Debian: una distribución que mantiene, desde hace más de 30 años, una comunidad de cerca de mil desarrolladores mayormente voluntarios, que se organizan con un [Contrato Social](https://www.debian.org/social_contract), votaciones y debates interminables en listas de correo. Desde afuera parece un caos. Desde adentro, es una de las bases más estables sobre las que se puede montar un servidor.

## ¿Qué puede aprender una empresa del bazar?

Leyendo todo esto me queda una pregunta: ¿No será que, en muchos casos, la burocracia es la enemiga de la creatividad? Y en un momento en el que salen exploits nuevos todas las semanas y se necesitan soluciones que nadie pensó antes, ¿No les convendría a quienes manejan equipos negociar un poco de rigidez a cambio de que su gente más creativa pudiera desarrollar todo su potencial?

Ojo: el bazar **no es la ausencia de estructura**. Linux tiene una jerarquía de mantenedores muy exigente y cada parche se revisa en público; Debian tiene políticas y votaciones. La diferencia es *para qué* existe el proceso. Hay **burocracia**, que existe para controlar a la gente o repartir culpas (aprobaciones, formularios, "esto siempre se hizo así"), y hay **estructura**, que existe para proteger el resultado (revisión de código, tests, estándares claros). El bazar te da libertad sobre *en qué* trabajás y *cómo*, pero es estricto con *qué entra*.

Y ni siquiera el bazar se salva de la burocracia. Los autores de la nota lo dicen sin vueltas: los proyectos que crecen tienden a formalizarse, y terminan siendo comunidades abiertas que al mismo tiempo son *"organizaciones muy estructuradas y burocráticas"*. Wikipedia hoy tiene políticas, guías de estilo y procesos para resolver disputas que pueden intimidar a cualquiera que quiera hacer su primera edición. O Debian mismo, que tiene reglas sumamente estrictas --y en algunos casos innecesariamente vuelteras-- para poder contribuir. O sea, la burocracia no es un problema exclusivo de las empresas: es lo que le pasa a cualquier organización que crece y deja de preguntarse por qué existe cada regla. La diferencia está en si alguien se toma el trabajo de revisarlas y en muchos casos la historia nos demuestra que no se revisan tan seguido ¿No?

Y hay datos que respaldan esto: las investigaciones de DORA (resumidas en el libro *Accelerate*) encontraron que los comités que aprueban cada cambio antes de pasar a producción **no reducen las fallas**, sino que ralentizan todo el proceso. Mientras tanto, del otro lado, los atacantes trabajan como un bazar: prueban, iteran, comparten herramientas y publican rápido.

### ¿Y si ponemos de moda el día de la creatividad?

Una idea concreta: que **un día a la semana cada persona del equipo tenga una mañana o una tarde completa para un proyecto propio**, algo que le sirva a la empresa pero cuya iniciativa venga de la persona. Sin reuniones, sin mensajes, sin guardias, sin "¿tenés un minuto?". Nada de *context switching*.

Curiosamente, así funciona buena parte del trabajo pago en el software libre. Según los autores de la nota, cuando alguien aporta a estos proyectos como parte de su empleo, en general la empresa no le dice *en qué* trabajar.

No es una idea nueva:

- **3M** tiene desde hace décadas su "15% del tiempo", y suele citarse como el origen de los Post-it.
- **Google** popularizó el "20% del tiempo", al que se le atribuyen proyectos como Gmail (aunque con los años, según varios ex empleados, se volvió más un "120% del tiempo": el proyecto personal se hacía *encima* del trabajo normal).
- **Atlassian** hace sus *ShipIt days*: 24 horas para construir lo que quieras y mostrarlo al final.

Lo de Google deja una lección importante: **si el tiempo no está protegido de verdad, no existe**. Siempre va a haber un incidente, un deadline o una reunión más urgente. Por eso me gusta la idea de un bloque fijo, en el calendario de todos, que la gerencia defienda como si fuera una guardia.

¿Qué podría salir de ahí en un equipo de sistemas o de seguridad? Ese script que automatiza la tarea que todos odian. Reglas de detección para una técnica que viste en un informe la semana pasada. Un laboratorio para reproducir el último CVE y entender si afecta a la empresa. Mejorar la documentación interna que nadie tiene tiempo de escribir. Exactamente el tipo de cosas que nunca se tienen en cuenta cuando se implementa algo pero que reducen considerablemente la deuda técnica acumulada. 

Y para que funcione al estilo bazar, le agregaría dos cosas:

- **Que sea visible.** "Publicar temprano en el ciclo de desarrollo y publicar seguido": una demo corta cada tanto, un canal donde cada uno cuenta en qué anda. No como control, sino para que otros se sumen, opinen o reutilicen.
- **Que equivocarse esté permitido.** Si el proyecto no llegó a nada y eso se castiga, la próxima vez nadie va a querer probar algo arriesgado. Un experimento que no funcionó también es aprendizaje para un experimento futuro que quizás sí funcione.

Un último matiz: con sacar reglas no alcanza. Si el equipo está sobrecargado, apagando incendios todo el día, esa mañana libre se va a usar para descansar o para ponerse al día, y está bien que así sea. La creatividad necesita margen, no solo permiso.

## No todo es romántico

Ahora, sería deshonesto quedarme solo con la parte linda. Hay varios matices que vale la pena decir.

### Hoy, mucho de ese trabajo es pago

Linux ya no es "solo un hobby" ni algo que Torvalds continúa haciendo "Solo por diversión". Torvalds cobra por mantenerlo desde hace años, y los informes de la Linux Foundation muestran que **la gran mayoría de los aportes al kernel son realizados por desarrolladores pagos por empresas**: Intel, Google, Red Hat, Meta, Huawei, AMD y muchas más. No porque sean generosas, sino porque les conviene que el sistema sobre el que corren sus negocios funcione bien.

Eso no contradice la idea del bazar; en cierto modo la confirma. Las empresas descubrieron que les sale más barato colaborar en algo común que construir cada una su propia catedral. Pero conviene no idealizar: el bazar también puede tener patrocinio y a las pruebas me remito.

### Hay proyectos críticos sostenidos por una o dos personas

Si miramos a la vereda de enfrente el escenario es un poco más sombrío: existe muchísimo software del cual depende medio planeta y que lo mantienen una o dos personas, en su tiempo libre y sin cobrar. La nota cita un estudio de Charles Schweik y Robert English que encontró que **casi la mitad de los proyectos de software libre exitosos tienen un solo desarrollador**, que escribe el código por su cuenta y lo comparte con el mundo. Ahí no hay bazar: hay una persona sola con su puesto. Hay un [chiste de xkcd](https://xkcd.com/2347/) que lo resume perfecto: toda la infraestructura digital moderna como una torre gigante apoyada sobre un bloquecito que *"algún tipo en Nebraska mantiene desinteresadamente desde 2003"*.

No es una exageración:

- **Heartbleed (2014)**: el bug en OpenSSL que expuso memoria de una enorme cantidad de servidores HTTPS. En ese momento, la biblioteca que cifraba buena parte de internet la mantenía básicamente **un solo desarrollador a tiempo completo**, y el proyecto recibía unos pocos miles de dólares por año en donaciones.
- **xz (2024)**: un atacante pasó **dos años** ganándose la confianza del mantenedor de `xz`, una herramienta de compresión que estaba sola y quemada, hasta conseguir permisos y meter un backdoor que apuntaba a SSH en las distribuciones Linux. Lo descubrió por casualidad un ingeniero, Andres Freund, que notó que sus conexiones SSH tardaban medio segundo más de lo normal.

Estos casos dejan en evidencia algo incómodo de la ley de Linus: **los ojos tienen que existir**. Que el código sea abierto permite que alguien lo revise, pero no garantiza que alguien lo esté haciendo.

### El bazar no está abierto para todos

"Cualquiera puede contribuir" suena muy lindo, pero en la práctica no es tan así. La propia nota lo reconoce: la producción entre pares avanzó sobre todo en el Norte Global y refleja los intereses de las personas con más recursos y más formación digital. Adentro de las comunidades también aparecen jerarquías y relaciones de poder, y **el sexismo y el acoso pueden estar muy extendidos**.

Incluso cuando un proyecto dice que da la bienvenida a quien llega, los obstáculos son muchos: herramientas difíciles, reglas no escritas, respuestas cortantes en una lista de correo, la sensación de que tu primer aporte tiene que ser perfecto. Al final, quienes logran entrar suelen ser los que ya tenían mucha formación y mucha experiencia en internet.

Muchas veces me preguntan si alguna vez me discriminaron por ser mujer en sistemas, y generalmente respondo que yo tuve la bendición de vivir en una burbuja. Nunca sufrí malos tratos por ser mujer en sistemas, y quizás tuve mucha suerte. Trabajo en una institución hermosa que cuida mucho el bienestar de sus empleadas; el último 8M, por ejemplo, me eligieron para dirigir el taller. 

Pero no siempre fue así. En empleos anteriores la diferencia sí era más notoria, y no necesariamente como acoso o sexismo explícito, sino de formas más silenciosas: ascensos que nunca llegaban, o que llegaban tarde, aun siendo más capaz que compañeros que habían entrado después que yo. Y la brecha salarial existió. Por suerte en mi empleo actual no sucede, pero también debo reconocer que instituciones como la mía son lamentablemente la excepción y no la regla.

En las comunidades de software libre, mi experiencia también depende mucho de dónde. Soy parte de **Debian Argentina**, y la comunidad Debian en general es muy estricta con estas cosas: tiene un [Código de Conducta](https://www.debian.org/code_of_conduct) y una [declaración de diversidad](https://www.debian.org/intro/diversity), y se los toma en serio. Es un ambiente muy sano y libre de discriminación y a nadie le importa si sos mujer, varón o lo que seas: si sos buena gente y contribuís, nadie te falta el respeto. 


Esa diferencia muestra algo importante: en una comunidad donde nadie te paga ni te puede obligar, el ambiente no se cuida solo. Depende de que la comunidad decida explícitamente que importa, lo ponga por escrito y lo haga cumplir. Debian es la prueba de que se puede.

Esto importa por algo más que justicia: si el bazar solo lo atiende un tipo de persona, el software y el conocimiento que produce reflejan solo los problemas y las curiosidades de esa gente. Menos diversidad es, literalmente, menos ojos.

### Los bienes comunes también se pueden cercar

La nota del MIT Press también advierte sobre las plataformas que viven del trabajo voluntario pero no son un bien común. El caso que mencionan es Reddit: la gente aporta posts, votos y comentarios gratis, pero el contenido siempre fue de la empresa. Durante años lo dejó circular casi como si fuera de todos, hasta que las empresas de IA empezaron a recolectar sus datos de forma masiva. En 2023, antes de salir a la bolsa, Reddit restringió el acceso y empezó a cobrarlo, y muchos de sus voluntarios más comprometidos se rebelaron.

Los autores mencionan otros ejemplos parecidos: en YouTube o Yelp la gente aporta contenido gratis mientras otros cobran por publicidad, y Airbnb convirtió en negocio algo que comunidades como Couchsurfing hacían sin plata de por medio.

Y la IA lleva esto todavía más lejos: hoy buena parte de lo que construyeron voluntarios durante décadas (código en GitHub, artículos de Wikipedia, respuestas en foros) se usa para entrenar modelos de IA comerciales, mientras los mismos proyectos reciben tráfico de bots que les sube los costos de infraestructura. Lo común se sigue produciendo de forma comunitaria, pero cada vez más gente lo explota de forma privada.

## Conclusión

Cada vez que levanto un servidor pienso un poco en esto. El sistema operativo, el servidor web, la base de datos, OpenSSH, `curl`, el editor con el que escribo este post, la mitad de la documentación que consulto... casi nada de eso existe porque una empresa decidió que era un buen negocio. Existe porque alguien tenía un problema, lo resolvió, y decidió compartirlo de manera desinteresada en la gran mayoría de los casos.

Raymond lo vio hace casi 30 años: el bazar, con todo su desorden, puede construir cosas que la catedral no. Lo que quizás no anticipó del todo es lo frágil que puede ser cuando damos por sentado que siempre va a haber alguien del otro lado.

Quizás deberíamos pensar un poco en lo que Orwell nos intentó mostrar en su obra *Rebelión en la granja*, donde lo ideal sería no terminar pareciéndonos tanto a eso contra lo que nos habíamos rebelado: un bazar que se burocratiza hasta volverse catedral, o bienes comunes que terminan cercados y convertidos en negocio de unos pocos.

Así que supongo que un poco el valor de todo esto es su impacto cultural. Si yo comparto mi conocimiento yo no lo pierdo, pero ahora ustedes también lo tienen, esa es básicamente la diferencia entre cultura y mercantilismo. Por eso es menester intentar contribuir de algún modo u otro, porque el bazar funciona en tanto y en cuanto alguien se acerca a atender un puesto cada tanto.


-- Alexia.

---

**Fuentes y lecturas:**

- [From Linux to Wikipedia: How Volunteers Build the Internet – The MIT Press Reader](https://thereader.mitpress.mit.edu/from-linux-to-wikipedia-how-volunteers-build-the-internet)
- [*Peer Production* – Benjamin Mako Hill, Christian Pentzold y Aaron Shaw (MIT Press)](https://penguinrandomhouse.com/books/828109/peer-production-by-benjamin-mako-hill-christian-pentzold-and-aaron-shaw)
- [*The Cathedral and the Bazaar* – Eric S. Raymond](http://www.catb.org/~esr/writings/cathedral-bazaar/)
- *Just for Fun: The Story of an Accidental Revolutionary* – Linus Torvalds y David Diamond
- [*Coase's Penguin, or, Linux and The Nature of the Firm* – Yochai Benkler](https://arxiv.org/abs/cs/0109077)
- *Accelerate: The Science of Lean Software and DevOps* – Nicole Forsgren, Jez Humble y Gene Kim
- [xkcd 2347: Dependency](https://xkcd.com/2347/)
- [Contrato Social de Debian](https://www.debian.org/social_contract)
