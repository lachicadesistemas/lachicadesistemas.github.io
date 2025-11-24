---
layout: post
title: "Qué es Secure Boot y cómo funciona Shim en Linux"
subtitle: "Una cadena de confianza que protege… y a veces complica"
share-img: /assets/img/art202501xxsecureboot.png
date: 2025-01-XX
author: Alexia
tags: [linux, secureboot, shim, uefi, seguridad, kernel, foss, oss, arranque]
---

Secure Boot suele presentarse como una capa extra de protección que evita que software no autorizado se ejecute durante el arranque. En teoría es una gran idea. En la práctica, para quienes usamos Linux, muchas veces termina siendo una fuente de problemas, instalaciones fallidas y horas revisando foros.

En este artículo te cuento de forma clara qué es Secure Boot, cómo funciona Shim (la herramienta clave que permite que Linux pueda arrancar con Secure Boot activado), cuándo conviene desactivarlo y cómo firmar tu propio kernel si usás una distro custom.

---

## ¿Qué es Secure Boot?

Imaginá que tu computadora es un castillo y al frente hay un guardia que sólo deja pasar a quienes tienen una credencial válida. Ese guardia es Secure Boot.

Secure Boot es un estándar de seguridad incluido dentro de UEFI (el reemplazo moderno del BIOS). Su objetivo es impedir que malware del tipo bootkit o rootkit se ejecute antes de que cargue el sistema operativo. Para lograrlo, sólo permite arrancar software que tenga una firma criptográfica válida.

Si algo intenta cargarse sin firma, el firmware lo bloquea. Así de simple.

---

## ¿Cómo funciona Secure Boot?

Secure Boot se basa en una cadena de confianza. Cada eslabón verifica al siguiente usando distintos tipos de claves:

- **PK (Platform Key):** la clave raíz del sistema, generalmente en manos del fabricante del equipo (Dell, Lenovo, HP, etc.).
- **KEK (Key Exchange Key):** valida qué otras claves se consideran confiables.
- **Base de permitidos (DB):** lista de firmas aprobadas.
- **Base de bloqueados (DBX):** firmas de software inseguro o revocado.

Durante el arranque, el firmware revisa que cada programa esté firmado con una clave válida. Si algo no coincide, se detiene ahí mismo.

---

## ¿Qué es Shim y por qué es tan importante?

El problema es que Linux no siempre viene firmado con claves que los fabricantes incluyen por defecto. Windows sí, pero Linux no.

Ahí entra en juego **shim**.


Shim es un pequeño ejecutable firmado con una clave que **UEFI ya confía** (generalmente, la de Microsoft). Esto permite que el firmware lo cargue sin quejarse. Una vez en memoria, shim actúa como puente:

1. Se carga porque está firmado con una clave reconocida por UEFI.
2. Shim incluye una clave propia de la distribución (por ejemplo, la clave de Debian o Fedora).
3. Con esa clave verifica y carga el siguiente bootloader —generalmente GRUB— que está firmado con la misma clave interna.
4. GRUB, a su vez, verifica y carga el kernel firmado por la distro.

Así se construye una **cadena de confianza**:  
UEFI → Shim → GRUB → Kernel

La ventaja de este mecanismo es que permite que las distribuciones mantengan su propio proceso de firma sin depender completamente de Microsoft, aun cuando se usa la confianza inicial que provee el firmware.

Este proceso no sólo funciona para Linux: BSD y otros sistemas operativos alternativos pueden hacer exactamente lo mismo.

![Shim](/assets/img/shim.png)

## ¿Por qué Secure Boot importa?

Secure Boot bloquea:

- Bootkits y rootkits que se inyectan antes del sistema operativo.
- Binarios manipulados o no autorizados.
- Software que intente cargar sin firma válida.

Es una capa de defensa real contra una clase de malware muy peligrosa y difícil de remover.

---

## ¿Cuándo podría ser necesario desactivar Secure Boot?

Aunque Secure Boot aporta seguridad, también puede convertirse en un obstáculo:

- **Distros sin firma oficial:** algunas distribuciones no incluyen shims firmados, por lo que no pueden arrancar.
- **Drivers propietarios:** especialmente los de GPU, suelen fallar al instalarse si Secure Boot está activado.
- **Bootloaders modificados o personalizados:** no tienen firmas válidas.
- **Kernels custom:** si compilás tu propio kernel, no va a pasar la verificación.

En homelabs, entornos de desarrollo o configuraciones experimentales, desactivar Secure Boot da más libertad.

---

## ¿Qué distros soportan Secure Boot?

Hoy casi todas las grandes distribuciones incluyen shim y bootloaders firmados:

- Ubuntu  
- Fedora  
- openSUSE / SUSE  
- Debian  
- Linux Mint  
- Zorin  
- Red Hat  

La compatibilidad es mucho mejor que hace años, aunque sigue habiendo casos problemáticos.

Un ejemplo recordado fue el fiasco de **Ubuntu 21.04**, cuyo shim nuevo tenía incompatibilidades con firmwares EFI antiguos. Muchos equipos quedaron inbooteables tras una actualización hasta que Canonical lanzó un parche. Varios usuarios tuvieron que degradar sus shims para volver a arrancar.

---

## ¿Qué pasa si tengo una distro custom o un kernel propio?

Buena pregunta —y acá viene la parte práctica.

Si querés mantener Secure Boot activado incluso con un kernel compilado por vos, necesitás:

- Firmar tu kernel con tu propia clave.
- Registrar esa clave en el firmware usando **MOK (Machine Owner Key)**.
- Instalar el kernel firmado para que forme parte de la cadena de confianza.

Para simplificar todo el proceso, podés usar mi herramienta:

👉 **Kernel Installer:**  
https://github.com/alexiarstein/kernelinstall

Mi programa descarga, configura, compila e instala el kernel estable más reciente, y además te permite **firmar tu propio kernel** y registrarlo en el firmware con mokutil.  
Esto te da un kernel personalizado pero totalmente compatible con Secure Boot.

---

## Reflexiones finales

Secure Boot divide opiniones, y con razón.

Por un lado, es una tecnología para proteger contra amenazas reales. Por otro, muchas veces siente que el ecosistema está pensado más para Windows que para Linux, lo cual genera fricciones. A simple vista parece mas una tactica del tipo "Vendor Lock-in" Cuando el proveedor te obliga a usar su propio software para arrancar el sistema y no te da la libertad de usar software alternativo que otra cosa.

En mi experiencia personal, mantener Secure Boot activado suele romper la instalación de drivers propietarios. En varias distros como Pop!_OS secureboot trae mas problemas que beneficios. Inclusive la vasta mayoría de los usuarios Linux no suelen activarlo. 

Por suerte ahora hay más alternativas y herramientas como Kernel Install permiten a las y los entusiastas del software libre a contar con las ventajas de secureboot sin caer en las garras de microsoft.

Si alguna vez te pasó que tu distro no arrancaba con Secure Boot, o que GRUB quedaba bloqueado sin explicación, probablemente la causa esté en esta cadena de firmas y verificaciones.

Conocer cómo funciona ayuda muchísimo a diagnosticar problemas… y evitar dolores de cabeza.

