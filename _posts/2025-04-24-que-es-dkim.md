---
layout: post
title: ¿Qué es DKIM y por qué es tan importante para la salud del correo electrónico? 
subtitle: Tu correo corporativo necesita DKIM
date: 2025-04-24
share-img: /assets/img/dkim-share.png
categories: [seguridad, tls, browsers, dns, email, correo, privacidad, web, ciberseguridad]
author: Alexia
---

## ¿Qué es DKIM?

DKIM significa **DomainKeys Identified Mail (DKIM)** y es un protocolo que permite a los propietarios de dominios u organizaciones enviar correos electrónicos firmados y autenticados. Esta 
verificación es posible gracias a la autenticación criptográfica.

DKIM le permite al servidor receptor comprobar que el contenido del mensaje original no fue alterado de ninguna manera. ¿Pero qué significa eso y como lo hace? Bueno, vamos por parte:

Imaginá que estás en el correo enviando una carta. En un sistema básico, nadie te pide el DNI o pasaporte, así que cualquiera puede mandar una carta haciéndose pasar por vos. Esto es parecido a 
cómo funciona el correo electrónico con el protocolo SMTP. En ese escenario, cualquier persona (por ejemplo, un ciberdelincuente) puede enviar un correo electrónico suplantando tu dominio, 
simplemente escribiendo cualquier nombre en el campo “De” y la dirección de la víctima en el campo “Para”.

Ahora, imaginá que antes de enviar tu carta, la persona del correo te pide el DNI para validar tu identidad, y luego el correo le pone un sello a tu carta para confirmar que fue manejada de forma 
segura y no fue manipulada. DKIM funciona de manera similar: asegura que el correo fue firmado correctamente y no fue modificado, ayudando así a reducir los riesgos de ataques de phishing.

![FIRMA DKIM]({{ '/assets/img/firma-dkim.png' | relative_url }})

## Puntos clave sobre DKIM

- **Autenticación criptográfica:** DKIM verifica que un correo no fue alterado durante la transmisión.
- **Sello a prueba de manipulación:** Garantiza la integridad del mensaje agregando una firma criptográfica, aunque no verifica directamente la identidad del remitente.
- **no evita el domain impersonation por si sólo:** Para ello, se debe utilizar junto con DMARC, sino un atacante aún podría impersonar el dominio del remitente.
- **Capa de seguridad crítica:** Funciona junto con SPF y DMARC para fortalecer la autenticación del correo y evitar ataques de phishing y spoofing.

## Cuando hablamos de DKIM hablamos de REGISTRO DKIM y FIRMA DKIM

## ¿Qué es un registro DKIM?

Un registro DKIM es un tipo de registro TXT en la DNS de tu dominio. 

Este registro contiene una clave pública que los servidores de correo receptores usan para verificar la firma digital en tus mensajes y asegurarse de que realmente provienen de tu dominio.

## ¿Cómo funcionan los registros DKIM?

Cuando agregás un registro DKIM a tu DNS, se utilizan componentes llamados "tags" para verificar tu dominio. Estos tags son letras seguidas por un signo igual (como `s=`) que indican información 
sobre el remitente y la clave pública.

Los registros DKIM necesitan una sintaxis correcta para funcionar. Algunos tags son obligatorios y otros opcionales. Si faltan tags, puede haber errores de verificación con ciertos proveedores. 
Los tags vacíos se procesan como vacíos; los tags ausentes directamente se eliminan.


## La magia detrás de DKIM: criptografía de clave pública

Funciona de una forma muy similar a las llaves gpg. Pensá en la criptografía de clave pública como un sistema de cajas fuertes con dos llaves que trabajan juntas:

- Una **clave privada** que nadie más puede ver ni usar.
- Una **clave pública** que cualquiera puede usar, pero que solo se verifica con tu clave privada.

Estas llaves son como piezas de un rompecabezas. Si cerrás algo con una, solo la otra puede abrirlo.

## BIEN.. Creo que entiendo lo que es DKIM y un Registro DKIM, pero: ¿Qué sería una firma DKIM?

Una **firma DKIM** es un código cifrado que se agrega a los encabezados del correo, funcionando como un sello digital de autenticidad. Una vez activada la firma DKIM en tu servicio de correo, tu 
servidor realiza automáticamente lo siguiente:

1. Calcula un "hash" del cuerpo del correo.
2. Cifra ese hash con tu clave privada.
3. Adjunta ese hash como una firma en el encabezado antes de enviar el correo.

Este proceso, conocido como **firma DKIM**, genera un sello verificable que los servidores receptores pueden comprobar usando tu clave pública. La firma en sí es el hash cifrado del mensaje, 
asegurado con tu clave privada.

Los servidores que reciben el mensaje utilizan esa firma para verificar tanto la identidad del remitente como la integridad del mensaje. Es una parte fundamental de la estrategia de protección 
**DMARC**.

> Ejemplo de una firma DKIM:
>
> `DKIM-Signature: v=1; a=rsa-sha256; d=midominio.com; s=selector1; ...`

---

## Preguntas frecuentes

### ¿DKIM todavía se usa?

Sí, **DKIM** sigue siendo un protocolo ampliamente adoptado para la autenticación del correo. Inclusive más ahora con tanto ataque de phishing y domain impersonation, ya que agrega una firma 
digital a los correos, ayudando a los servidores receptores a verificar el dominio del remitente y asegurando la integridad del mensaje.

### ¿Se puede enviar correo sin DKIM?

Técnicamente sí, pero hacerlo aumenta el riesgo de que tus correos terminen en la carpeta de spam o sean rechazados por los servidores del destinatario. Implementar DKIM mejora la credibilidad y 
la entregabilidad de tus correos. Hoy en día los servers de correo utilizan un sistema de ranking. Si no tenés DKIM bien configurado, tu servicio de correo va a rankear muy mal y el correo que se envíe desde tu dominio va a terminar bloqueado o en spam por la mayoría de los servicios grandes.

### ¿Necesito DKIM si ya tengo SPF?

Sí. En muchos casos, **DKIM es más importante que SPF** para cumplir con DMARC. Esto se debe a que:

- El alineamiento de SPF puede fallar en ciertos servicios.
- El reenvío automático de correos rompe SPF fácilmente, mientras que DKIM se mantiene intacto.
- DKIM también ayuda a construir la reputación de tu dominio y permite mayor visibilidad (por ejemplo, en Google Postmaster).

### ¿Cuál es la diferencia entre SPF y DKIM?

- **SPF** verifica que los correos provengan de servidores autorizados, ayudando a evitar la suplantación del dominio en el campo Return-Path.
- **DKIM** confirma que el contenido del correo no fue modificado, usando una firma criptográfica. A diferencia de SPF, la firma DKIM permanece intacta incluso si el correo es reenviado.

> SPF y DKIM son complementarios y ambos son necesarios para lograr una autenticación de correo robusta y cumplir con **DMARC**.

---

¿Te quedó alguna duda sobre DKIM? ¡Dejame tu comentario o escribime en instagram threads o bluesky al hashtag #LCDS



