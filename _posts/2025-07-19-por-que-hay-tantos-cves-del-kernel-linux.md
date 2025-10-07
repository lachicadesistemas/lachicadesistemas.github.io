---
layout: post
title: "Avalancha de CVEs en el Kernel Linux: ¿Nueva normalidad o crisis de transparencia?"
subtitle: "Aumenta la cantidad de CVEs a niveles nunca vistos"
date: 2025-07-19
share-img: /assets/img/cve.png
layout: post
author: Alexia
tags: [ciberseguridad, inteligencia-artificial, privacidad, noticias]
---

## Un cambio radical en la gestión de vulnerabilidades

Hace casi un año que el equipo desarrollador del Kernel Linux se convirtió en **CVE Numbering Authority (CNA)**, marcando un giro historico en la manera de rastrear y divulgar vulnerabilidades en el kernel.  Pero Lejos de ser una simple “oleada” temporal, el flujo de nuevos CVEs no solo se ha mantenido sino que en 2025 crece exponencialmente y a un ritmo inédito.

En los **primeras semanas del 2025**  se registraron **134 nuevos CVEs** sólo inherentes al kernel. Para poner este dato en contexto: en todo el año 2020 se registraron 120 CVEs, en el 2021 fueron 162, en 2022, 309, y en 2023 la cuenta llegó a 290. Pero la comparación realmente llama la atención cuando miramos el total de 2024: **3.529 CVEs**, un número muy muy superior al del año previo.

---

## ¿Por qué seguimos hablando de esto?

Algunos podrían preguntarse por qué insistimos tanto en este tema. La respuesta es simple: esto no se trata solo de estadísticas. El aluvión de CVEs tiene implicancias profundas que afectan a prácticamente todos los aspectos de la gestión y seguridad en sistemas Linux.

### Principales desafíos:

- **Cumplimiento normativo:** Las organizaciones deben documentar y seguir de cerca su respuesta ante cada vulnerabilidad, lo que genera una carga administrativa colosal.
- **Evaluación de riesgos:** Con semejante volumen de CVEs, determinar cuáles suponen amenazas reales en un entorno específico se ha vuelto una tarea cada vez más compleja.
- **Saturación de recursos:** Los equipos de seguridad viven desbordados, intentando analizar, priorizar y remediar semejante cantidad de posibles vulnerabilidades.
- **Impacto operativo:** Los ciclos tradicionales de parches y ventanas de mantenimiento ya no alcanzan para el ritmo actual de divulgación de vulnerabilidades.

---

## El estado actual

La política del kernel (“casi todo bug recibe un CVE”) busca transparencia, pero ha llevado a que los equipos de seguridad deban lidiar con un promedio de **8 a 9 CVEs nuevos por día** en lo que va de 2025, solo contando vulnerabilidades del kernel—sin incluir espacio de usuario, bibliotecas, ni nada más. Este ritmo, lejos de desacelerarse, parece ir en aumento comparado incluso con la segunda mitad de 2024.
De todas maneras, yo, Alexia, al menos, estoy completamente a favor de que todo bug que represente una vulnerabilidad tenga su respectivo CVE. Sino la trazabilidad de los parches sería insostenible.

Asimismo, para quienes administramos sistemas empresariales, la elección no es sencilla: intentar seguir el ritmo de los parches tradicionales (que suelen requerir reinicios y ventanas de mantenimiento), o buscar alternativas como el *live patching* para gestionar la creciente marea de actualizaciones de seguridad es una tarea que se vuelve cada vez más compleja por obvios motivos: Las diferencias entre versiones de sistemas, la cantidad de equipos y las pequeñas ventanas de tiempo para mantenimiento fuera de los horarios productivos.

A medida que avanzamos en el 2025, resulta claro que esto no es un fenómeno pasajero sino el **nuevo estándar** para la gestión de la seguridad del kernel Linux. Es menester de las empresas y organizaciones adaptar sus estrategias y herramientas para manejar de manera eficiente todo este nuevo volumen de parches, lo que puede implicar:

- Implementar sistemas más sofisticados de priorización de vulnerabilidades.
- Adoptar soluciones de parcheo automatizado vía Ansible o similar.
- Utilizar tecnologías de *live patching* para mantener la seguridad sin interrumpir operaciones.
- Desarrollar mejores mecanismos de filtrado que permitan identificar rápidamente las vulnerabilidades realmente críticas y ordenar los parches según relevancia.

La transparencia que aporta la nueva política de CVEs es valiosísima, pero la comunidad de seguridad necesita desarrollar mecanismos más eficientes para gestionar y responder a semejante volumen de divulgaciones, incluyendo mejor categorización, evaluaciones de severidad más precisas y sistemas de filtrado inteligentes.

---

## Impacto en herramientas y automatización de seguridad

Toda esta nueva ola de vulnerabilidades expuestas tambien ha expuesto, valga la redundancia, lo obsoletas que están quedando las herramientas actuales de gestión de riesgos y seguridad.
El volumen actual de CVEs ha expuesto las limitaciones de muchas herramientas tradicionales y *scanners* de vulnerabilidades. Estos son sistemas que fueron diseñados para manejar unas pocas docenas de vulnerabilidades nuevas al mes y en la actualidad deben procesar cientos, generando varios desafíos:

- **Rendimiento de los scanners:** Los análisis tardan cada vez más y suelen trabajar sobre datos que ya quedaron obsoletos apenas terminan.
- **Falsos positivos:** El aumento en el volumen eleva también la tasa de falsos positivos, que requieren verificación manual.
- **Informes abrumadores:** Los reportes de seguridad que antes eran concisos hoy pueden tener cientos de páginas, donde las excepciones son la regla.
- **Problemas de integración:** Herramientas de automatización y sistemas SIEM están luchando para manejar semejante caudal de datos.

---

## El desafío para las distribuciones empresariales

Las distribuciones empresariales de Linux enfrentan una situación especialmente compleja. Deben:

- Analizar cada CVE para determinar su relevancia en las versiones que soportan.
- Aplicar la filosofía Debian (Adaptar y *backportear* los parches cuando es necesario.)
- Probar estas correcciones sobre sus versiones estables.
- Empaquetar y distribuir las actualizaciones.
- Documentar y comunicar todos estos cambios a sus usuarios.

Con el volumen actual de CVEs, este proceso se vuelve cada vez más difícil de sostener sin sacrificar la estabilidad que los usuarios empresariales esperan.

---

## Implicancias para compliance y auditorías

El aluvión de CVEs complica los procesos de compliance y auditoría de diversas formas:

- **Trazabilidad:** Se requiere documentar la respuesta ante cada CVE, generando trazas de auditoría cada vez más voluminosas.
- **Evaluaciones de riesgo:** Requieren más tiempo y recursos.
- **Reportes regulatorios:** Han crecido tanto en tamaño como en complejidad.
- **Tiempos de remediación:** Las ventanas estándar de mantenimiento muchas veces no alcanzan para el volumen actual.

---

## Los costos ocultos

Más allá de los desafíos técnicos, las organizaciones enfrentan costos crecientes en áreas críticas:  
Los recursos humanos se ven estirados al máximo, ya que el análisis y procesamiento de CVEs consume cada vez más tiempo. Los costos de infraestructura suben por la necesidad de más capacidad para escanear y probar parches. Además, aumenta la demanda de capacitación para los equipos de seguridad y resulta esencial invertir en nuevas herramientas o actualizaciones para poder gestionar eficientemente la carga de trabajo. Sin mencionar los costos en horas extra para el personal que requiere mantener la infraestructura fuera del horario laboral.

---

## Nuevas estrategias para una nueva realidad

Las organizaciones están adoptando distintas estrategias para hacer frente a este panorama:

- **Priorización basada en riesgo:** Foco en las vulnerabilidades que representan mayor amenaza para su entorno, aunque el análisis independiente de cada CVE lleva más tiempo (muchos CVEs de 2024 aún están "en análisis").
- **Parches sin reinicio:** Uso de tecnologías que permiten aplicar actualizaciones críticas sin reiniciar sistemas siempre que sea posible.
- **Triaje automatizado:** Desarrollo de sistemas automáticos para categorizar y priorizar CVEs.
- **Seguimiento selectivo:** Sólo seguir los CVEs que afectan su configuración puntual del kernel, lo cual suma complejidad al trabajo de backporting.

---

## Mirando al futuro

A medida que avanzamos en 2025, varias tendencias se consolidan:

- **Evolución de herramientas:** Las soluciones de seguridad tendrán que adaptarse para manejar este caudal de información.
- **Adaptación de procesos:** Las organizaciones deben agilizar su gestión de vulnerabilidades.
- **Redimensionamiento de recursos:** Habrá que revisar presupuestos y equipos dedicados a seguridad.
- **Colaboración sectorial:** La comunidad debe compartir mejores prácticas e información para afrontar este nuevo escenario.

---

## Notas finales

La evolución del desarrollo y las vulnerabilidades del kernel Linux representa un cambio fundamental en la gestión de los CVEs. Y no es algo negociable. Por que que se reporten más CVEs es lo correcto. El tema central es como aggiornarse a este nuevo volumen de reportes y patchear lo más rápido posible.

Las organizaciones deben adaptar sus prácticas de seguridad sin perder de vista la protección frente a amenazas reales. Esto puede implicar invertir en nuevas herramientas, adoptar estrategias de parcheo alternativas o, directamente, repensar el enfoque tradicional de la gestión de vulnerabilidades en Linux.

Esta claro que esto no es un caso estacional o pasajero. Esto es una **nueva normalidad.** Pero ¿Cómo lograr detectar dentro del caudal creciente de CVEs cuales requieren mayor prioridad? Ese será el gran desafío del rol de las y los administradores de sistemas en este año y los que vendrán.


Alexia.
