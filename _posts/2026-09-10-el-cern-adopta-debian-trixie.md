---
layout: post
title: "CERN le dice adiós a Red Hat: por qué migra más de 2.200 sistemas a Debian 13 Trixie"
date: 2026-09-10
author: Alexia
categories: [linux, sysadmin, noticias]
tags: [debian, trixie, cern, redhat, rhel, infraestructura]
---

Hay noticias del ecosistema Linux que pasan desapercibidas y otras que realmente llaman la atención. Esta es una de las segundas: el **CERN**, el laboratorio europeo de física de partículas, anunció que va a migrar más de **2.200 computadoras industriales y sistemas embebidos** de su infraestructura de control de aceleradores desde el ecosistema Red Hat hacia **Debian 13 "Trixie"**, con el objetivo de completar la transición antes de que termine 2026.

La novedad la presentaron los ingenieros del CERN Federico Vaga y Nikos Tsipinakis durante una charla en la MiniDebConf Winterthur, en Suiza, a fines de agosto de 2026. No se trata de rumores ni trascendidos: el propio **Debian Publicity Team** lo confirmó el 1 de septiembre en su canal oficial de micronoticias, compartiendo la grabación completa de la presentación[^1]. Vale la pena ir a esa fuente primaria para separar el titular llamativo de lo que realmente está pasando a nivel técnico.

## Primero lo importante: qué es lo que NO cambia

Antes de asumir que el CERN reemplazó por completo su infraestructura por Debian, conviene precisar el alcance. La migración es **específica y acotada**: afecta a los llamados *Accelerator Front-End Systems*, es decir, las computadoras de tiempo real que controlan de forma directa el hardware del acelerador, distribuidas a lo largo de 43 kilómetros cuadrados y conectadas a unos 17.000 dispositivos.

Lo que se mantiene sin cambios:

- Los **centros de datos** del CERN, que continúan operando sobre RHEL y AlmaLinux.
- Las **estaciones de trabajo de operadores** (consolas de supervisión), también bajo RHEL/AlmaLinux.
- La computación experimental a gran escala (el procesamiento masivo de datos del LHC), que no forma parte de este proyecto.

En resumen: es un cambio quirúrgico sobre la capa crítica de control del acelerador, no un reemplazo institucional global.

## ¿Por qué el cambio de rumbo respecto a Red Hat?

Esta es la parte más interesante desde la perspectiva de infraestructura. El CERN tiene un historial largo ligado a Red Hat: utilizó **Scientific Linux** (basado en RHEL), migró a **CentOS** en 2015 y posteriormente adoptó **AlmaLinux** tras los cambios en el modelo de CentOS.

El detonante no pasó únicamente por licencias o costos de soporte. Según explicaron en la charla, las políticas de compilación recientes de Red Hat —optimizadas para arquitecturas x86-64 más modernas— comenzaron a dejar sin soporte a parte del hardware embebido especializado que el CERN necesita mantener en el acelerador. Continuar en esa línea hubiese requerido un rediseño de hardware con un costo estimado, según un análisis interno de riesgos de 2023, de unos **5,4 millones de francos suizos**.

Ante ese escenario, se evaluaron en paralelo CentOS Stream y Debian, resultando esta última la opción elegida.

## El cronograma y los desafíos operativos

Un detalle técnico fundamental: en un acelerador de partículas **no se despliegan cambios como en un entorno web tradicional**. Los ciclos operativos se rigen por ventanas estrictas: períodos de funcionamiento activo, paradas técnicas y paradas largas (*long shutdowns*). La migración tiene que encajar necesariamente en esos huecos de mantenimiento; no hay margen para actualizaciones continuas en caliente fuera de ventana.

Para gestionar miles de equipos de manera consistente en este entorno, implementaron un esquema de gestión declarativa: un controlador supervisa el estado deseado frente al desplegado y **redespliega automáticamente** ante cualquier discrepancia, reemplazando viejas prácticas basadas en empujar configuraciones a mano por NFS.

Respecto al ciclo de vida, se evaluaron dos caminos a largo plazo:

1. **Plan A:** desarrollar sobre Bookworm durante 2026, migrar a Trixie como versión base con soporte extendido entre 2026 y 2030, y luego saltar a Debian 15 ("Duke").
2. **Plan B:** mantenerse en Trixie bajo soporte extendido (ELTS, a través de Freexian) hasta 2033 sin saltos intermedios.

Una alternativa intermedia —mantener Bookworm bajo soporte extendido durante todo el período— fue descartada.

## El estado actual del proyecto

Un punto clave para poner la noticia en perspectiva: para fines de agosto solo había **algunas decenas de máquinas** corriendo Debian en producción. Los "2.200 sistemas" representan la **meta del proyecto**, no el estado actual. El grueso del despliegue masivo se concentra en los meses que restan del año.

## Reflexión desde la administración de sistemas

Cuando trabajás en infraestructura crítica sabés que la estabilidad y la previsibilidad no se negocian. Ver a una organización con los requerimientos técnicos del CERN validar a Debian como base para control industrial en tiempo real dice mucho sobre la solidez del proyecto, y en particular sobre la madurez de **Debian Trixie**.

Además, deja una lección valiosa sobre arquitectura: diseñar plataformas que no queden atadas a los caprichos de una única distribución o proveedor corporativo es una ventaja estratégica indispensable a largo plazo.

Habrá que seguir de cerca cómo avanza el despliegue hacia fin de año. Si logran cumplir los plazos, va a ser uno de los casos de estudio en entornos industriales y científicos más relevantes de los últimos años.

---

### Fuentes

- **Fuente primaria:** [Debian micronews](https://micronews.debian.org/2026/1788286274.html), Debian Publicity Team (1° de septiembre de 2026), con enlace a la [grabación completa de la charla](https://meetings-archive.debian.net/pub/debian-meetings/2026/MiniDebConf-Winterthur/ch2026-53-controlling-cerns-accelerators-with-debian.av1.webm) "Controlling CERN's Accelerators with Debian" en el archivo oficial de encuentros de Debian.
- Contexto adicional (cronograma, costos de hardware y antecedentes con Red Hat): The Register, Phoronix e InfoQ.

*¿Cómo ven este movimiento del CERN hacia Debian en sistemas de misión crítica? Se agradecen comentarios y opiniones.*

[^1]: [https://micronews.debian.org/2026/1788286274.html](https://micronews.debian.org/2026/1788286274.html)