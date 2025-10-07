---
layout: post
title: "Brecha de seguridad en la IA de contratación de McDonald's expuso millones de datos de postulantes" 
subtitle: "Hackers probaron el password '123456' .. y Anduvo (!)"
date: 2025-07-17
share-img: /assets/img/mcdonalds.png
layout: post
author: Alexia
tags: [ciberseguridad, inteligencia-artificial, privacidad, noticias]
---

Un error de seguridad en la plataforma de selección de personal de McDonald's en Estados Unidos, gestionada por la empresa de inteligencia artificial **Paradox.ai**, permitió que hackers pudieran acceder fácilmente a los datos personales de millones de postulantes a través del sitio **McHire.com**.

### ¿Qué pasó?

El sistema utiliza un chatbot de IA llamado "Olivia" para interactuar y filtrar candidatos. Investigadores de seguridad descubrieron vulnerabilidades básicas en el backend del sistema, entre ellas el uso de credenciales de administrador extremadamente débiles, como el clásico **usuario y contraseña “123456”**.

Estas fallas permitían a cualquier persona con conocimientos técnicos mínimos acceder al historial completo de chats entre Olivia y los postulantes, incluyendo **nombre, correo electrónico y número de teléfono**. Se estima que los registros expuestos rondan los **64 millones**, aunque no todos contenían datos sensibles.

### Detalles técnicos de la brecha

- **Acceso administrativo**: No existía autenticación multifactor y las credenciales eran triviales de adivinar.
- **Enumeración de IDs**: Al modificar manualmente el número de ID de postulante en la URL o parámetros, se podía acceder a los registros de otros candidatos y ver sus datos personales y conversaciones con el bot.
- **Pruebas en ambiente real**: Los investigadores pudieron acceder a cuentas de prueba de Paradox.ai y a postulaciones simuladas, comprobando la falla.

> “El riesgo para los usuarios no era solo el acceso a sus datos personales, sino la posibilidad de que se usaran para campañas de phishing o fraudes relacionados con el proceso de contratación”, señalaron los expertos.

### Impacto

Si bien la empresa aseguró que la mayoría de los registros accedidos durante la prueba no contenían información sensible, **el potencial de explotación era altísimo**. Un atacante podría haber usado estos datos para hacerse pasar por McDonald’s y solicitar información financiera bajo pretexto de coordinar depósitos de sueldo, por ejemplo.

### Respuesta de McDonald’s y Paradox.ai

- **Paradox.ai** reconoció el problema, desactivó la cuenta vulnerable y se comprometió a implementar un programa de bug bounty para detectar fallas a tiempo.
- **McDonald’s** culpó directamente al proveedor externo y afirmó que exigió la remediación inmediata de la vulnerabilidad el mismo día que fue reportada.
- Ambas empresas aseguran que ningún tercero, fuera de los investigadores de seguridad, accedió a la información.

### Reflexión

Este incidente es un recordatorio de los riesgos de delegar procesos sensibles a plataformas de terceros, especialmente cuando involucran inteligencia artificial y manejo de datos personales a gran escala. La **seguridad básica (contraseñas seguras, autenticación multifactor, y manejo adecuado de IDs)** sigue siendo fundamental, incluso para gigantes globales como McDonald’s.

---

#### Fuente

- [WIRED: McDonald’s AI Hiring Bot Exposed Millions of Applicants’ Data](https://www.wired.com)
