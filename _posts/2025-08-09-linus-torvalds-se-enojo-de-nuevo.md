---
layout: post
title: "Linus Torvalds se enojó de nuevo"
subtitle: "Esta vez con desarrolladores de RISC-V del kernel"
date: 2025-08-09
share-img: /assets/img/linus-riscv.png
author: Alexia
tags: [linux, kernel, torvalds, risc-v, sysadmin]
---

En otra muestra de su ya conocida franqueza, Linus Torvalds rechazó el *pull request* de actualizaciones para la arquitectura **RISC-V** que buscaban entrar en la nueva versión del kernel **Linux 6.17**.  
El motivo: llegaron tarde en la *merge window* y, según sus propias palabras, el código es “basura”.

El viernes, apenas un par de días antes de cerrar la ventana de cambios (que finaliza el domingo con el lanzamiento de Linux 6.17-rc1), el equipo de RISC-V envió su propuesta. Entre las novedades se incluían:

- Soporte de **RISC-V IOMMU** para sistemas basados en ACPI.  
- Soporte ACPI BGRT para mostrar logos de fabricante durante el arranque.  
- *Errata workarounds*.  
- Soporte para la extensión **Xmipsexectl**.  
- Lectura del tipo de MMU desde el *Device Tree*.  
- Mejoras de rendimiento para rutinas de intercambio de endianness.  
- Soporte para **kprobetrace**.  
- Soporte para extensiones **MPXY** y **RPMI SBI**.  
- Soporte para **Control-Flow Integrity** en procesos de espacio de usuario.

Sin embargo, Torvalds no solo cuestionó la demora, sino que también criticó duramente la inclusión de funciones genéricas que, en su opinión, degradan la calidad del código.

Esto fue lo que escribió en la *mailing list*:

> **"No. Esto es basura y llegó demasiado tarde. Pedí *pull requests* tempranos porque es de público conocimiento que estaré de viaje, y si no podés seguir esa regla, al menos enviá *pull requests* **buenos**.**
> 
> Esto agrega varias porquerías que no son específicas de RISC-V a archivos de cabecera genéricos.
> 
> Y cuando digo 'porquería' lo digo en serio. Es algo que nadie debería mandarme, y mucho menos, enviarlo tarde en la ventana de integración.
> 
> Como esta loca e inútil `make_u32_from_two_u16()` 'helper'.
> 
> Esa función hace que el mundo sea activamente un peor lugar para vivir. Es basura inútil que vuelve incomprensible cualquier uso, y es **PEOR** que no usar ese estúpido 'helper'.
> 
> Si escribís el código como `(a << 16) + b`, sabés lo que hace y cuál es la palabra alta. Quizás necesites un *cast* para evitar que 'b' tenga bits altos que contaminen el resultado, así que tal vez no sea exactamente *bonito*, pero tampoco será erróneo o incomprensible.
> 
> En cambio, si escribís `make_u32_from_two_u16(a,b)` no tenés la más m%&$ idea de cuál es el orden de palabras. En otras palabras, lo hiciste **PEOR**, y encima lo agregaste a un archivo genérico no relacionado con RISC-V, donde la gente supuestamente podría usarlo para empeorar *otro* código también.
> 
> Así que no. Cosas como estas tienen que ser rechazadas. No van en archivos genéricos y mucho menos como un envío tardío durante la ventana de integraciones.
> 
> Quedan avisados: no más *pull requests* tardíos y no más porquería fuera del árbol de RISC-V.
> 
> Ahora, *espero* que no haya porquería dentro de las partes específicas de RISC-V, pero eso es su elección. Los archivos genéricos no se contaminan con cosas locas. Y mandar un gran *pull request* el día antes de que cierre la ventana con la esperanza de que esté demasiado ocupado para prestar atención no es una estrategia ganadora.
> 
> Así que van a tener que intentarlo de nuevo en la 6.18. **TEMPRANO** en esa ventana. Y sin basura"
> 

En resumen: los cambios para RISC-V tendrán que esperar a la próxima version, estoy hablando del kernel **Linux 6.18** más hacia finales del año, y llegar a tiempo… y sin “helpers” que, para Linus, hacen que el mundo sea un lugar peor.

---
**Fuente original:** [LKML](https://lkml.org/)
