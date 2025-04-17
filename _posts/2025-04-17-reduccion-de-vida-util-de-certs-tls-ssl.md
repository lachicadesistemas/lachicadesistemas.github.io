---
layout: post
title: Los Certificados TLS/SSL Durarán sólo 47 días
subtitle: Por Decisión del comité CA/Browser Forum
date: 2025-04-17
share-img: /assets/img/ssl.jpg
#thumbnail-img: /assets/img/ssl.jpg
categories: [seguridad, tls, ssl, web, server, ciberseguridad]
author: Alexia
---



La organización que se encarga de unificar un criterio sobre las autoridades certificantes y los períodos de duración de los certificados TLS, más conocida como **CA/Browser Forum** votó 
oficialmente una enmienda a los Requisitos Básicos de los certificados TLS, estableciendo un cronograma para acortar tanto la **vida útil de los certificados** como el período en el que puede 
reutilizarse la información validada por una CA. Los primeros cambios comenzarán a afectar a los usuarios a partir de **marzo de 2026**.


![TLS]({{ '/assets/img/ssl.jpg' | relative_url }})


Esta votación fue largamente debatida en el CA/Browser Forum y pasó por varias versiones, incorporando comentarios tanto de autoridades certificadoras como de sus clientes. El período de votación 
finalizó el **11 de abril de 2025**, cerrando un capítulo muy disputado y permitiendo al ecosistema de certificados planificar lo que viene.

## Nuevo cronograma de validez para certificados TLS

Con esta resolución, la vida útil máxima de un certificado TLS se va a reducir progresivamente, haciendo que la **automatización sea esencial**. Aunque Google venía impulsando certificados de 90 
días, apoyó casi de inmediato la propuesta más agresiva de Apple.

### Cronograma de reducción:

- **Hasta el 15 de marzo de 2026:** el máximo es de **398 días**
- **Desde el 15 de marzo de 2026:** baja a **200 días**
- **Desde el 15 de marzo de 2027:** baja a **100 días**
- **Desde el 15 de marzo de 2029:** el máximo será de **47 días**

## Reducción en la reutilización de validaciones

También se reducirá el tiempo durante el cual se puede reutilizar la información de validación de dominio o IP:

- **Hasta el 15 de marzo de 2026:** se puede reutilizar por **398 días**
- **Desde el 15 de marzo de 2026:** se reduce a **200 días**
- **Desde el 15 de marzo de 2027:** se reduce a **100 días**
- **Desde el 15 de marzo de 2029:** solo **10 días**

Además, desde el 15 de marzo de 2026, las validaciones de información de identidad del sujeto (**Subject Identity Information**, SII) para certificados **OV/EV** (nombre de la organización, 
dirección, etc.) solo podrán reutilizarse por 398 días (antes eran 825). Esto **no afecta a los certificados DV**, que no incluyen SII.

## ¿Por qué 47 días?

Parece un número raro, pero es una fórmula pensada para balancear automatización y operación:

- **200 días** = 6 meses largos (184 días) + medio mes de 30 días (15) + 1 día de margen
- **100 días** = 3 meses largos (92 días) + 1/4 de un mes de 30 días (7) + 1 día de margen
- **47 días** = 1 mes largo (31 días) + medio mes de 30 días (15) + 1 día de margen

## Argumentos de Apple

Apple, autora de la propuesta, sostuvo que el CA/Browser Forum lleva años acortando los plazos máximos, dejando en claro que la **automatización del ciclo de vida de certificados es obligatoria**. 
El argumento central es que la información contenida en los certificados **se vuelve menos confiable con el tiempo**, por lo que es clave **revalidarla más seguido**.

Además, se señala que los sistemas actuales de revocación (CRLs y OCSP) **no son confiables**. De hecho, los navegadores suelen ignorarlos. Los certificados de corta duración **reducen el impacto 
de usar un certificado comprometido**, y en 2023 ya se había aprobado la existencia de certificados que duran solo **7 días**, sin necesidad de CRL u OCSP.

## Aclaraciones importantes

Hay dos puntos que podrían generar confusión:

- Aunque los cambios se anuncian para 2026, 2027 y 2029, el salto entre 2027 y 2029 es de **dos años completos**. 
- A partir de marzo de 2029, el certificado solo durará **47 días**, pero la 
validación de dominio solo podrá reutilizarse por **10 días**. Técnicamente se podrá hacer a mano, pero sería una receta para el desastre.

## ¿Va a costar más?

Una pregunta muy común para las autoridades certificadoras es si los usuarios tendrán que pagar más al tener que emitir certificados más seguido. **La respuesta es no**. El costo se basa en **una 
suscripción anual**. De hecho, al adoptar automatización, muchos clientes **prefieren renovar más seguido por su cuenta**.

Por eso, y porque ya en 2027 los certificados de 100 días harán insostenible la gestión manual, se espera que **la adopción de automatización se acelere** mucho antes de 2029.

## Herramientas para automatizar

Apple tiene razón al decir que automatizar es inevitable. Pero muchos ya se venían preparando. Por ejemplo, **DigiCert** ofrece soluciones de automatización a través de **Trust Lifecycle Manager** 
y **CertCentral**, con soporte para el protocolo **ACME**, incluso para certificados **DV, OV y EV**. También se incluye compatibilidad con **ACME Renewal Information (ARI)**, que simplifica aún 
más la renovación.

---

> *Este cambio marca un antes y un después en la gestión de certificados. Automatizar ya no es una opción: es la única forma sostenible de operar en un internet cada vez más dinámico y donde los peligros aumentan día tras día.*

