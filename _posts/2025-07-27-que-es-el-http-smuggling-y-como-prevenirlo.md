---
layout: post
title: "HTTP Request Smuggling: qué es y cómo prevenirlo"
subtitle: "Un ataque silencioso que puede comprometer tu infraestructura"
date: 2025-07-27
share-img: /assets/img/httpsmuggling.png
author: Alexia
tags: [seguridad, http, redes, ciberseguridad, sysadmin]
---

> **TL;DR:** HTTP Request Smuggling (HRS) es un tipo de ataque que aprovecha inconsistencias entre servidores frontend y backend al interpretar el fin de una petición HTTP. Es sigiloso, crítico, y puede permitir eludir controles de acceso, leer datos de otros usuarios o ejecutar acciones no autorizadas. Si sos sysadmin, tenés que entender esto.

![Infografía HRS](/assets/img/httpsmuggling.png)

## ¿Qué es HTTP Request Smuggling?

Es una técnica que manipula cómo se interpretan las solicitudes HTTP entre servidores intermedios, como proxies o balanceadores, y los servidores backend.

Muchas aplicaciones modernas usan una cadena de servidores: el cliente se conecta a un frontend (como un NGINX o AWS ALB), y ese servidor reenvía la solicitud a un backend (como Apache, Node.js o cualquier otra aplicación). El problema aparece cuando **el frontend y el backend no interpretan del mismo modo el final de una solicitud HTTP.**

Esto permite al atacante "colar" una segunda petición camuflada dentro de una legítima.

---

![Infografía HRS](/assets/img/httpsmuggling2.png)


## ¿Cómo ocurre?

Imaginá que un atacante manda una solicitud como esta:

```
POST / HTTP/1.1
Host: ejemplo.com
Content-Length: 13
Transfer-Encoding: chunked

0
```


- Algunos servidores usarán `Content-Length` y verán solo 13 bytes.
- Otros verán `Transfer-Encoding: chunked` y seguirán otro protocolo.
- Si frontend y backend discrepan, se puede **desincronizar la interpretación** y permitir que la parte "G" se procese como una nueva petición.

Eso es HTTP Smuggling.

---

## ¿Qué puede lograr un atacante?

- **Bypass de autenticación**: insertar cabeceras para simular ser otro usuario.
- **Cache poisoning**: almacenar respuestas maliciosas en cachés intermedias.
- **XSS o CSRF indirectos**: al inyectar contenido en respuestas de otros usuarios.
- **Acceso a datos de otros**: porque su petición "se pega" a la víctima.

---

## ¿Por qué sigue existiendo esto?

Porque HTTP/1.1 es ambiguo: permite usar `Content-Length` o `Transfer-Encoding` para definir el cuerpo del mensaje.

El RFC dice que si ambos están presentes, gana `Transfer-Encoding`. Pero no todos los servidores lo implementan igual. Y si hay un proxy de por medio que no lo respeta, tenés el cóctel listo.

Además, en arquitecturas mixtas con HTTP/2 frontend y HTTP/1 backend (**downgrading**), el problema puede reaparecer.

---

## Cómo prevenir HTTP Smuggling

> Estas recomendaciones son para vos, sysadmin de buena voluntad que no quiere ver arder su infraestructura:

1. 🔒 **Usá HTTP/2 de punta a punta**, si es posible. Elimina ambigüedades en la longitud de las peticiones.

2. 🚫 **Evitá el downgrade** de HTTP/2 a HTTP/1 en el frontend. Si no podés evitarlo, sanitizá las solicitudes: sin caracteres extraños, sin nuevos métodos, sin headers raros.

3. 🧹 **Normalizá las peticiones** en el frontend (usá `mod_security`, `nginx lua filters` o WAFs que reescriban peticiones ambiguas).

4. 🛑 **Rechazá solicitudes ambiguas**: si una tiene ambos headers (`CL` y `TE`) o valores inconsistentes, mejor cerrá el socket.

5. 🔁 **Evitá la reutilización de conexiones** en backends sensibles.

6. 🧪 **Testeá tu infraestructura** con herramientas como:
   - Burp Suite Professional (con plugins de Smuggling)
   - [smuggler.py](https://github.com/defparam/smuggler)
   - OWASP ZAP con scripts personalizados

---

## Bonus: Señales de que podés estar vulnerable

✅ Usás balanceadores con soporte HTTP/1.1  
✅ Hacés downgrade desde HTTP/2  
✅ Permitís conexiones persistentes (keep-alive) entre proxy y backend  
✅ Tenés cachés intermedias como Varnish o Cloudflare sin WAF estricto

---

## Conclusión

HTTP Request Smuggling es el tipo de ataque que no deja logs obvios y puede explotarse con precisión quirúrgica. Como sysadmins, tenemos la responsabilidad de entenderlo, prevenirlo y testear nuestros entornos, especialmente en infraestructuras que combinan múltiples tecnologías o servidores HTTP intermedios.

> Porque a veces, un simple header mal interpretado... es todo lo que necesita un atacante.

---

### Recursos adicionales

- [HTTP Request Smuggling - PortSwigger Academy](https://portswigger.net/web-security/request-smuggling)
- [Smuggler tool (GitHub)](https://github.com/defparam/smuggler)
- [OWASP Top 10: A05 - Security Misconfiguration](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/)

---
