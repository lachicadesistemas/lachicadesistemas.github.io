---
layout: post
title: "Windows NT y VMS: La historia Completa"
subtitle: "Que similitudes y diferencias tienen?"
date: 2025-06-17
layout: post
author: Alexia
tags: [historia, ciencia, tecnologia, sistemas opreativos, vms, microsoft, windows, industria, tecnología]
---

# Windows NT y VMS: La historia completa

Mientras la industria debate si NT es digno para el mundo empresarial, muchos se sorprenderían al enterarse de la estrecha conexión entre NT y un sistema operativo empresarial ya consolidado.

## ¿NT es realmente "nueva tecnología"?

Cuando Microsoft lanzó la primera versión de Windows NT en abril de 1993, la campaña de marketing enfatizaba el “NT” (New Technology) en el nombre del sistema operativo. Microsoft promocionó NT como un sistema de vanguardia, con todas las funciones esperadas en un OS para estaciones de trabajo y servidores pequeños o medianos. Aunque NT era un sistema nuevo en 1993, con una API fresca (Win32) y nuevas herramientas de gestión, las raíces de la arquitectura e implementación de NT se remontan a mediados de los años 70.

Ahora... el resto de la historia: te invito a un breve recorrido por la genealogía de NT, que nos lleva hasta Digital y su sistema VMS. La mayoría de los desarrolladores líderes de NT, incluido el arquitecto principal de VMS, vinieron de Digital, y su experiencia influyó enormemente en NT. Después de repasar los orígenes, vamos a ver las similitudes (más que casuales) entre NT y VMS, y cómo reaccionó Digital al lanzamiento de NT.

---

## Breve historia de NT

La historia de NT está íntimamente ligada a David N. Cutler, su arquitecto jefe. Tras graduarse de Olivet College, Michigan, en 1965, Cutler trabajó en DuPont. Aunque la computación no era su primer amor, en DuPont usó máquinas Digital para simulaciones y rápidamente aprendió de software. Decidió dedicarse al desarrollo de sistemas operativos y entró en Digital en 1971, trabajando en la famosa "Mill" de Maynard, Massachusetts, en sistemas para la familia PDP-11. El primero de estos, el RSX-11M, incorporó muchos de los conceptos y principios de diseño que luego aparecerían en NT. Era un sistema para control industrial y de manufactura.

En 1975, Digital se dio cuenta de que la competencia desarrollaba procesadores de 32 bits, lo que amenazaba a la arquitectura PDP de 16 bits. Gordon Bell, figura legendaria e ingeniero jefe, impulsó el desarrollo de este nuevo procesador, que terminó llamándose VAX. Cutler integró el equipo inicial y, junto con Dick Hustvedt y Peter Lipman, diseñó el OS VMS para VAX. Los objetivos incluían compatibilidad retroactiva con los procesadores PDP-11 y suficiente flexibilidad para servir tanto a escritorios como a servidores empresariales. VMS fue compatible con RSX-11M y adaptable a máquinas de distintos tamaños. En esa época, Digital apostaba la empresa a VAX y VMS. Años después, Bill Gates afirmaría que Microsoft también “apostaba la empresa” a NT 5.0.

En 1977, Digital anunció el VAX-11/780 y VMS 1.0, con los primeros envíos en 1978. Como líder del proyecto y uno de los principales arquitectos, Cutler siguió desarrollando VMS, pero comenzó a inquietarse dentro de Digital. En 1981, amenazó con irse, y la empresa le concedió un equipo de 200 ingenieros para iniciar un centro en Seattle, donde desarrollarían una nueva arquitectura de CPU y un sistema operativo para el futuro: Prism (hardware) y Mica (software).

En 1988, los ejecutivos de Digital cancelaron el proyecto y despidieron a muchos de sus miembros. Cutler decidió irse, pero antes Microsoft se enteró y vio la oportunidad de contratarlo. Cuando dejó Digital, VMS iba por la versión 5.0.

En agosto de 1988, Bill Gates lo contrató, bajo la condición de que pudiera llevarse a unos 20 ex Digital, incluidos varios ingenieros de Prism. Microsoft accedió sin dudar: un arquitecto de sistemas como Cutler era un hallazgo, y Gates creía que el futuro de la empresa dependía de crear un OS que compitiera con UNIX.

El nombre interno del proyecto fue OS/2 NT, porque la idea era suceder a OS/2 manteniendo su API. Pero el éxito de Windows 3.0 en 1990 cambió el rumbo: seis semanas después de su lanzamiento, Microsoft rebautizó el proyecto como Windows NT y adoptó Win32 como la API oficial. Gates decidió que la compatibilidad con las aplicaciones de Windows 3.x y soporte para partes de DOS, OS/2 y POSIX fueran objetivos centrales. Desde 1990 hasta el lanzamiento público de NT en agosto de 1993, el equipo de Cutler trabajó a toda velocidad, con más de 200 ingenieros y testers involucrados.

---

## Tabla 1: Traducción de términos entre VMS y NT

| Término VMS                      | Equivalente en NT         |
| -------------------------------- | ------------------------- |
| Interrupt Priority Level (IPL)   | Interrupt Request Level (IRQL) |
| Asynchronous System Trap (AST)   | Asynchronous Procedure Call (APC) |
| Fork Procedure                   | Deferred Procedure Call (DPC) |
| I/O Request Packet (IRP)         | I/O Request Packet (IRP)  |
| Bug Check                        | Bug Check                 |
| System Service                   | System Service            |
| sys.exe                          | ntoskrnl.exe              |
| Paged Pool                       | Paged Pool                |
| Nonpaged Pool                    | Nonpaged Pool             |

---

## NT y VMS: Dos sistemas, muchas similitudes

La mayoría de los diseñadores de NT trabajaron antes en VMS en Digital; algunos, incluso, directamente con Cutler. ¿Cómo evitaron que las decisiones de diseño de VMS se trasladaran a NT? Muchos creen que los conceptos de VMS migraron a NT, pero pocos saben cuán similares son realmente a nivel kernel (más allá del chiste de Usenet: si incrementás cada letra de VMS obtenés WNT – Windows NT).

Como en UNIX y la mayoría de los OS comerciales, NT tiene dos modos de ejecución: modo usuario y modo kernel. En modo usuario corren las aplicaciones y entornos OS/2, DOS y POSIX. Son componentes no privilegiados: no pueden acceder directamente al hardware ni a la memoria del kernel, y necesitan invocar al kernel para recursos o acceso físico.

El kernel se ejecuta en modo privilegiado, con acceso directo a memoria y hardware. Se compone de varios subsistemas ejecutivos responsables de la gestión de recursos: el Process Manager, I/O Manager, Virtual Memory Manager, Security Reference Monitor y un microkernel encargado de la planificación y las interrupciones. Los drivers de dispositivo se cargan dinámicamente, y el Hardware Abstraction Layer (HAL) oculta las particularidades de la CPU y motherboard.

La API nativa de NT (casi no documentada) es la que usan las aplicaciones en modo usuario para interactuar con el kernel. Se espera que las apps usen Win32, DOS, OS/2, POSIX o Win16, y estos entornos interactúan con el kernel en nombre de la aplicación.

VMS no tiene diferentes "personalidades" de OS, pero su kernel y subsistemas ejecutivos son claros predecesores de NT. Los desarrolladores de Digital escribieron el kernel de VMS casi todo en ensamblador de VAX; Microsoft lo reescribió en C para lograr portabilidad. En esencia, reescribieron VMS en C, optimizando, limpiando, puliendo y agregando nuevas capacidades. No fue un simple “copypaste”: también crearon una nueva API (Win32), nuevo sistema de archivos (NTFS), subsistema gráfico y entorno de administración, manteniendo compatibilidad hacia atrás con DOS, OS/2, POSIX y Win16.

---

## Tabla 2: Similitudes significativas entre VMS y NT

| VMS                                                   | NT                                               |
| ----------------------------------------------------- | ------------------------------------------------ |
| Scheduler con 32 niveles de prioridad                 | Scheduler con 32 niveles de prioridad            |
| Nunca baja la prioridad por debajo de la programada   | Igual                                           |
| Boosting para controlar procesos que consumen CPU     | Igual                                           |
| Soporte de SMP                                        | Soporte de SMP                                  |
| Kernel threads desde VMS 7.0                          | NT 3.1 usa kernel threads                       |
| Uso intensivo de archivos mapeados en memoria         | Igual                                           |
| Memoria virtual con paginación por demanda            | Igual                                           |
| Working sets con algoritmo basado en reloj            | Igual                                           |
| Balance Set Manager usa swapping                      | En NT no usa swapping                           |
| Modelo de drivers por capas                           | Igual                                           |
| I/O asíncrono basado en paquetes                      | Igual                                           |
| Recursos como objetos administrados por Object Manager| Igual                                           |
| Subsistema de seguridad con ACLs                      | Igual                                           |
| MONITOR                                               | Performance Monitor                             |
| BACKUP                                                | NT Backup                                       |

---

### Procesos, memoria y drivers

Los procesos de NT son prácticamente idénticos a los de VMS. En ambos, el scheduler tiene 32 niveles de prioridad; el proceso con mayor prioridad siempre corre, y los de igual prioridad se reparten por turnos (round-robin). Los 16 niveles altos son de tiempo real, y los bajos son dinámicos, subiendo por eventos como entrada de usuario. El scheduler nunca baja una prioridad por debajo de la programada, y aplica “boosting” para rescatar procesos que no reciben CPU hace tiempo. Ambos OS soportan SMP.

Una diferencia clave: en NT los procesos pueden tener uno o más threads; en VMS, los kernel threads recién llegaron en la versión 7.0 (1995), después de NT. De hecho, Digital fue adaptando mejoras de NT, y viceversa (ejemplo: soporte de threads en modo usuario en NT 4.0, basado en VMS).

En administración de memoria, ambos usan mapas de memoria virtual, archivos mapeados, paginación por demanda y working sets para limitar el uso de RAM por proceso. El Balance Set Manager de VMS puede intercambiar (swapear) procesos enteros a disco y volverlos a RAM, algo que Microsoft no implementó igual en NT.

En cuanto a drivers y manejo de I/O, ambos soportan drivers apilados (stackable), asíncronos, y permiten extensibilidad al agregar o quitar drivers de diferentes niveles. Así, se puede intercalar, por ejemplo, un driver de disco tolerante a fallos entre el driver de disco y el de sistema de archivos, para hacer mirroring o striping. El esquema de prioridades y arquitectura de drivers en NT deriva directamente de VMS.

El Object Manager administra recursos como objetos con referencia y control uniforme. La seguridad en NT, basada en listas de control de acceso (DACL), proviene de la implementación de VMS (que agregó DACLs en 1984). Incluso el Performance Monitor y la herramienta de backup de NT derivan de las utilidades MONITOR y BACKUP de VMS.

---

## Cuando Digital descubrió el parecido...

En 1997, la revista Business Week contó que los ingenieros de Digital notaron el parecido y lo reportaron a la gerencia. En vez de demandar, Digital y Microsoft hicieron un acuerdo: Microsoft entrenaría técnicos de NT en Digital, promovería NT y OpenVMS como parte de soluciones integradas, y garantizaría soporte NT para procesadores Alpha. Además, Microsoft pagó entre 65 y 100 millones de dólares a Digital.

---

## La evolución de NT y VMS

Aunque Microsoft presenta a NT como un OS “hecho en casa”, su historia y arquitectura son mucho más antiguas. A lo largo de los 90, Digital agregó muchas características de NT a VMS, y Microsoft sumó avances de VMS a NT. Ejemplo: VMS soporta clustering desde 1984, y memoria de 64 bits desde 1996; NT incorporó clustering recién a fines de los 90 y el soporte de 64 bits llegaría varios años después. NT incorporó por primera vez threads en kernel, logs de eventos a nivel sistema y una base de configuración llamada Registry, mientras que VMS agregó threads en la versión 7.0 y el Registry llegará en la 7.2.

Ahora que Compaq adquirió Digital, ¿seguirá evolucionando VMS o NT sellará el destino de su antecesor? Lo que es seguro: NT seguirá creciendo y su origen quedará cada vez más lejos en el tiempo.

---

## Antes de cerrar-

Este artículo no es de mi autoría. Yo hice una traducción del artículo original, que lleva el mismo título y fue escrito por Mark Russinovich, Actualmente CEO de Azure, en el año 1998. 
Lo que leeran a continuación es una traducción de sus palabras. El motivo por el cual decidí trasladar este artículo aquí es por que lo consideré de gran valor educativo e historico.
No he podido encontrar la fuente original ya que todos citan a [Este link](https://www.itprotoday.com/server-virtualization/windows-nt-and-vms-the-rest-of-the-story) pero el sitio del link
no existía en 1998.
