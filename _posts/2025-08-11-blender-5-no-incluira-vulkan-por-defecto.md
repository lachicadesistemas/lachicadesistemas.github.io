---
layout: post
title: "Blender 5.0: Vulkan no será el render por defecto… por ahora"
subtitle: "Pero llega soporte HDR experimental en Linux con Wayland"
date: 2025-08-11
share-img: /assets/img/blender.webp
author: Alexia
tags: [blender, linux, vulkan, opengl, hdr, wayland, sysadmin]
---

**Blender 5.0** tenía planes de habilitar por defecto el backend **Vulkan** para el renderizado, manteniendo igualmente la compatibilidad con OpenGL. Sin embargo, esos planes podrían cambiar: todo apunta a que **OpenGL seguirá siendo el render por defecto** cuando la nueva versión se libere a finales de este año.

En **Blender 4.5** ya se introdujo muy buen soporte para Vulkan, con la idea de activarlo por defecto en la 5.0 para sistemas compatibles. El problema es que, durante las pruebas, algunos usuarios comenzaron a encontrarse con **limitaciones de memoria** que han puesto en pausa la decisión.

![blender]({{ '/assets/img/blender.webp' | relative_url }})


Según se discutió en la última reunión del módulo *Viewport/EEVEE*:

> *"No se espera que Vulkan se convierta en el backend por defecto en Blender 5.0. La razón es que los controladores OpenGL pueden descargar memoria de la GPU hacia la RAM del CPU. Vulkan, al ser una API de bajo nivel, no puede hacerlo. Hemos recibido reportes de varios usuarios que enfrentan este problema y necesitamos resolverlo.*
> 
> *Existen varias formas de solucionarlo, cada una con sus inconvenientes. Queremos experimentar la próxima semana con memoria dispersa (*sparse memory*). Según la especificación de Vulkan, esto permite reemplazar la memoria de la GPU detrás de un handle (imagen o buffer) usando comandos encolados. Cuando esto ocurre, podríamos dividir el graph de renderizado y realizar las cargas/sincronizaciones necesarias."*

Aunque la idea de Vulkan por defecto se retrase, quienes quieran probarlo pueden activarlo manualmente en Blender 4.5 y versiones más recientes.

---

## HDR en Linux con Vulkan y Wayland

Más allá de Vulkan, **Blender 5.0 traerá soporte experimental para HDR (High Dynamic Range) en Linux**, pero con requisitos muy concretos:

- Correr en un entorno **Wayland** (X11 no soporta HDR).  
- Usar aceleración gráfica con **Vulkan** (no OpenGL).  
- Tener un monitor compatible con **HDR**.  
- Activar la opción marcada como experimental en la configuración.

El soporte HDR en Linux aún está en fase de pruebas, ya que ha sido evaluado en un número limitado de configuraciones. Dependiendo de los resultados y feedback de la comunidad, podría salir de la categoría “experimental” pasar al lanzamiento final.

En pruebas realizadas con la versión **alpha** de Blender 5.0 sobre Ubuntu Linux y monitores como **Samsung Odyssey OLED G8 G81SF** y **ASUS ROG Swift OLED PG27UCDM**, el HDR funcionó correctamente en escenarios básicos.

Si querés seguir las novedades o colaborar con pruebas, la discusión oficial está en el hilo de DevTalk:  
[https://devtalk.blender.org/t/vulkan-wayland-hdr-support/41214](https://devtalk.blender.org/t/vulkan-wayland-hdr-support/41214)

---

📅 **Blender 5.0** está previsto para mediados de noviembre de 2025. Aunque Vulkan por defecto deberá esperar, el camino hacia un soporte más robusto en Linux sigue avanzando.
