---
layout: post
title: Update sobre la Laptop Linux Con Chip ARM64 
subtitle: Tuxedo anunció estado del proyecto SnapDragon X Elite 
gh-repo: alexiarstein/bash
gh-badge: [star, fork, follow]
#cover-img: /assets/img/artisan.png
#share-img: /assets/img/artisan.png
tags: [linux, sociedad, arm, arm64, tuxedo, snapdragon, tecnología, inteligencia artificial, ia, artisan, capitalismo, economía, noticias, actualidad]
comments: true
author: Alexia
---

![TUXEDO Elite 14 Gen1](/assets/img/tuxedo.png)

A mediados de 2024, **TUXEDO Computers** comenzó a generar expectativas con un anuncio prometedor: lanzar una laptop basada en 
Snapdragon X Elite y totalmente compatible con Linux. Esta empresa Alemana, conocida por su compromiso con el software libre, 
esperaba comenzar a despachar el equipo ese mismo año. Pero ya entrados en el segundo trimestre de 2025, parece que aún falta 
bastante para que ese objetivo se concrete.

Según comunicaron recientemente, el desarrollo del dispositivo ha sido “algo lento” por una serie de dificultades. Sin 
embargo, dieron un paso importante al publicar un *Device Tree* inicial para revisión en la lista de correo del kernel de 
Linux. Pero ese *Device Tree* está lejos de permitir una laptop funcional.

El parche del device tree  para la **TUXEDO Elite 14 Gen1** indica el siguiente nivel actual de soporte:

### Funciona:
- ✅ Touchpad  
- ✅ Teclado  
- ✅ Pantalla eDP (aunque sin control de brillo)  
- ✅ Almacenamiento NVMe  
- ✅ Puerto USB Tipo-C  
- ✅ WiFi (WiFi 7 sin probar)  
- ✅ GPU (solo con renderizado por software)  

### No funciona:
- ❌ Aceleración de GPU (hay progreso: carga el firmware pero el output es entrecortado)  
- ❌ Puerto USB Tipo-A (en desarrollo)  
- ❌ Suspensión con ahorro de energía significativo  
- ❌ Audio: parlantes, micrófonos  
- ❌ Cámara  
- ❌ Lector de huellas  

Desde entonces, hubo un parche de seguimiento trabajando en el soporte de audio para este modelo.

En una actualización reciente, **TUXEDO** también comentó que su colaboración prevista con **Qualcomm** no prosperó, pero 
ahora están trabajando junto a **Linaro**, lo que podría dar un nuevo impulso al soporte para este portátil ARM.

Por el momento, **no hay una fecha estimada de lanzamiento** para el Elite 14 Gen1. Es una lástima, considerando que otros 
portátiles ARM con Snapdragon X1 Elite ya están empezando a recibir soporte *upstream* en el kernel.

Pero tampoco sorprende demasiado: muchas laptops con este SoC enfrentan limitaciones similares en Linux, desde la falta de 
audio, aceleración gráfica o funciones básicas como teclado y touchpad. Así, varios de estos equipos todavía no están listos 
para un uso diario o productivo bajo Linux.

Alexia
