---
layout: post
title: "XZ Utils: el backdoor sigue vivo en imágenes de Docker"
subtitle: "(...Y qué deberías hacer)"
date: 2025-08-23
author: Alexia
tags: [seguridad, supply-chain, docker, xz, backdoor, linux, devsecops, ci-cd]
description: "Más de un año después del incidente, todavía hay imágenes en Docker Hub con el backdoor de XZ Utils. Qué mirar, cómo detectarlo y cómo reducir riesgo en tu pipeline."
---

> **TL;DR**
>
> - Hubo *builds* de imágenes Debian en Docker Hub (marzo 2024) que **incluyen la biblioteca `liblzma.so` con backdoor de XZ Utils**.
> - Esas imágenes quedaron públicas y **otras se construyeron encima**, heredando el problema (*segundo orden*).
> - Si tu pipeline o tus *runners* usan imágenes históricas por *digest* o *tag* viejo, **podrías seguir arrastrando el riesgo**.
> - **Acción inmediata**: identificar bases afectadas, reconstruir con *base images* limpias y agregar controles binarios (no solo por versión). Al final hay guía y checklist.

## Contexto técnico rápido

El caso **XZ Utils** (marzo de 2024) introdujo un **implante en `liblzma.so`** que podía activarse al interactuar con **OpenSSH (`sshd`)**, mediante una cadena de *hooks* que apuntaba a `RSA_public_decrypt`, `RSA_get0_key` y `EVP_PKEY_set1_RSA`, disparada por **resolutores IFUNC** modificados para `lzma_crc32`/`lzma_crc64`. El impacto trascendió lo teórico porque **paquetes distribuidos por distros** (p. ej. Debian/Fedora/openSUSE) **llegaron a canales oficiales**.

## Lo que se encontró en Docker Hub

Se identificaron **imágenes Debian** de marzo de 2024 con el backdoor, aún disponibles públicamente. Además, **imágenes de segundo orden** (construidas sobre esas bases) heredan el problema. La muestra es acotada (foco en Debian y hasta segundo orden), por lo que **la cifra real puede ser mayor** y **no se cubren aquí Fedora/openSUSE** ni terceros que hayan cacheado artefactos.

> **Nota:** La siguiente información resume el artículo técnico enlazado en **Fuente** (al final). La enumeración **no es exhaustiva** y puede cambiar con el tiempo.

### Tabla 1 — Imágenes Debian con backdoor (arquitectura `amd64`)

| Tag                     | Manifest Digest                                                             | Blob Hash                                                               |
|-------------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| rc-buggy-20240311       | a702c7f4bb57a17762e258871f45f8273ae49bec5515452d5133e66450c95ba5            | 3a737ad8ab65fe5ad068d6094fbf99ce9ed2b5beff9c86daceee8c2c50182bde       |
| experimental-20240311   | 81992d9d8eb99b5cde98ba557a38a171e047b222a767dc7ec0ffe0a194b1c469            | cd5a0401cc26824227d6ffe1f921e91657dc46666e0f20f408d8d154ca49f5c0       |
| unstable-20240311-slim  | 7a3332fbf100a0ef9762ead20a4224665768b237c5bfedfe0f86bf88e0c13b7a            | 40f436db82f2316ccced5a0deef57fac6eb766b073d7e64d5dfe93e6782482b1       |
| unstable-20240311       | 8690225da3ca369e9be720446f73e0aa06f290776fdf2605b6ec80c2b229b9f6            | cd5a0401cc26824227d6ffe1f921e91657dc46666e0f20f408d8d154ca49f5c0       |
| trixie-20240311-slim    | d4e306f14b8b7389b36be8fb0eadab638cb7744546a33a74f0fc27bb9037dc14            | b94224647092fbfb1fa9ceb18cf55a60f5a00183971516dd46f1f72f5f7b26df       |
| trixie-20240311         | 85068c773f7fcc9c9acd8f244759cb2131e7a1775c5bf8d6710f76e7467fa3f1            | 93e647bfd891e82156d7a13e0f0b194003855008967ec51e962ea0d70fc59ff6       |
| testing-20240311-slim   | c2e15dd5788b20f360ab3f2d8b60111b6e8b011c5c4960e0129551c743f5cd30            | 243521c5a6cd930662c078eec5f83156663f3197cf12158ce60e0a0f9d0a3eb6       |
| testing-20240311        | 0746d89c588160d0470beaae7a55e38305ede06cb5717d132bd6a795610234d8            | 522a6d12a8a3032c984d93fd141274f1cb7cc1e9a6942e3b36cbf803bbe36a12       |
| sid-20240311-slim       | 94596b0770714bac6e8adef7e1d3dbc16245ad2978f94006587e44850343cb88            | 554b70c8b9ed0854851a55e915cefa47cdc18fed201b4aba87193d575410b53d       |
| sid-20240311            | 0aff2113f50451631f0f8c22d85c97aad855d73545b6018fcbe9f0a78ae26583            | 3a737ad8ab65fe5ad068d6094fbf99ce9ed2b5beff9c86daceee8c2c50182bde       |
| untagged                | fa2016c58b4df666286dfa14b2402c05d60c556ecfd4c60635b64ad21380edba            | 93e647bfd891e82156d7a13e0f0b194003855008967ec51e962ea0d70fc59ff6       |
| untagged                | e24f4205978e6c0f98697e2075439825f86df56457d2d1ea9e0f8593cf5b5236            | 522a6d12a8a3032c984d93fd141274f1cb7cc1e9a6942e3b36cbf803bbe36a12       |

### Tabla 2 — Imágenes **de segundo orden** basadas en las anteriores

| Repositorio                 | Tag                  | ¿Es el último tag? | Manifest Digest                                                             |
|----------------------------|----------------------|--------------------|------------------------------------------------------------------------------|
| buildpack-deps             | untagged             | -                  | 5e4438a4660fff39ff4671bc5ecfaea3e639dafe61d5c19c735335c96d61c1e4            |
| buildpack-deps             | untagged             | -                  | 443be2e684c2974f94329fe904ab025826cd45f4a1dc52a922e5b01e66e75ee0            |
| buildpack-deps             | untagged             | -                  | 8f95f8a59ac3227cb7483799a6836e9c79d5cef491ba672c1958abdf36bf7648            |
| buildpack-deps             | untagged             | -                  | bf7c5e7df1344c29825cecf0b13a48e3542d9076344bb488f886f9dfce534e05            |
| buildpack-deps             | untagged             | -                  | 8d5e5912bc9fdc287f89b87e7b97a615110842f6c6f3ed380dccef85a75ef6cc            |
| buildpack-deps             | untagged             | -                  | d650be418934c90f6e9e3efcb52bef7ad660324074002efb8541e7baf9aab6d8            |
| neurodebian                | untagged             | -                  | 388d46f65da097cd9371385d9c2f3f3fe04d4bc88b529b52125b9f94d74edaff            |
| neurodebian                | untagged             | -                  | 7ffa336b9a0f2e594d1df70ce66a259db156902baa371337a6bfaae2eefa4de3            |
| r-base                     | untagged             | -                  | 3b5c502ccd9d4a6c0937a6bfc51e02741bdc7c520fe458ce4d9c136553df42b0            |
| georchestra/jenkins-builder| sid-jdk-8            | SÍ                 | d7ad7c3386a874e81006bc6fab0ce7eb5cf227f4a1c2d3dff7850e17ff7a5f48            |
| myoung34/github-runner     | 2.315.0-debian-sid    | NO                 | 8c0c44b7404fdcdc52f4c04d41b2a674510ac98f21fb81cd68575be30eeb51a7            |
| slash5toaster/calibre      | 7.7.0                | NO                 | fa5dcddaa909b76a8b6c5fb44a8eb833ab2f407f81cc7185a9c299e02cc1c2ef            |
| flowgunso/seafile-client   | 9.0.4                | NO                 | b6d1c3b9232874356dee489685528f94c048e6683573cdb5b0a0b106e3d85708            |
| makepad/opencv             | trixie-4.8.1         | NO                 | 153319e41415b5a789704e31017aff2e2c8223c2e155875947639935fa4f72ca            |
| makepad/opencv             | trixie-4.8.0         | NO                 | 1b5b2b14dc1262074e0b933ae8a483a5f21c5fc2e9dd42f0b7e8f2fa2ebc12a0            |
| makepad/opencv             | trixie-4.7.0         | NO                 | 060fddaf2879513e900d0e93097c3096f541ca871c390639bb6cb67c6fd1bc84            |
| makepad/opencv             | trixie-4.9.0         | SÍ                 | 2fdc5fa0c19fe4e04d3117477f49b8b7e0e4124290d9f4270f215f8e7c5b9078            |
| makepad/opencv             | trixie-slim-4.8.0    | NO                 | f5e90754a89e6837c7b5165b57ffd4d5d66990d798bfce1018048b7ac21f0e6a            |
| makepad/opencv             | trixie-slim-4.9.0    | SÍ                 | 7a4e5b592b318a38542dd21f87a810263d39a3b4caf9d85bb973594264a38fca            |
| makepad/opencv             | trixie-slim-4.8.1    | NO                 | cdb95cc294d7ea4f1703e817674c477e99a80be16a6c980f88365f77c195f0f0            |
| makepad/opencv             | trixie-slim-4.7.0    | NO                 | 94a10719a142f3b11c6d8cd4bc88b415a163f7052061c22222df7c4c96a95aa2            |
| optionfactory/debian13     | 80                   | NO                 | 1dedf1ad124f7eff12011122565bed92c207d3cd1c9b650a40fb680d846bd515            |
| optionfactory/debian13     | 81                   | NO                 | 1dedf1ad124f7eff12011122565bed92c207d3cd1c9b650a40fb680d846bd515            |
| controlplane/sectools      | latest               | SÍ                 | 86090b316ad096e53c81f91e94ac2ae95c2f28feee10ce8ec32aa573d8263021            |

> Según la nota original, se contactó a desarrolladores para reportar la situación y la respuesta fue que **las imágenes históricas se conservan** y se recomienda **usar versiones nuevas**. Aun así, dejar imágenes comprometidas accesibles públicamente **aumenta la superficie de ataque**, especialmente si alguien las usa sin revisar.

## Qué deberías hacer (infra, contenedores y hosts)

### 1) Identificar base images afectadas
- **Pin por *digest*** (*no solo tag*) y **auditar historiales**:  
  ```bash
  docker inspect <img> --format '{{json .RepoDigests}}' | jq .
  docker history --no-trunc <img>
```
Si usás digests antiguos (marzo 2024 en Debian sid/testing/trixie), consideralos sospechosos.

2) Escanear imágenes y binarios

Generá un tar de la imagen y buscá liblzma.so:
```
img=<namespace>/<name>:<tag>
docker save "$img" | tar -t | grep -E 'liblzma\.so(\.|$)'
```
Si tenés el layer desempaquetado, inspeccioná IFUNC inusuales:
```
readelf -sW /path/a/liblzma.so | grep IFUNC
strings /path/a/liblzma.so | grep -E 'lzma_crc(32|64)'
```

Corré un verificador dedicado (ej.: XZ.fail):
https://xz.fail/

3) Rebuild y policy de base images

Reconstruí todas las imágenes que dependan de bases listadas arriba.

Bloqueá en tu registry corporativo tags/digests vetados (cuarentena).

En CI/CD: política de freshness (expirar base images viejas), SBOM (Syft/otros), scaneo binario y diff de capas entre builds.

4) Hosts expuestos (si usaron esos paquetes)

Verificá versión de xz-utils y binarios en /usr/lib*/liblzma.so*.

Si el host o contenedor corre sshd, priorizá su revisión. Aún con impacto práctico acotado, el riesgo existe.

### Conclusión

El incidente de XZ Utils muestra que artefactos comprometidos pueden persistir en registries públicos, propagarse por herencia y colarse en pipelines automatizados si no hay controles binarios. No alcanza con “estar en la versión correcta”: hay que mirar el binario y dominar la cadena de suministro (bases, capas, digests, runners, caches).

Fuente

Artículo original: Persistent Risk: XZ Utils Backdoor Still Lurking in Docker Images — [https://www.binarly.io/blog/persistent-risk-xz-utils-backdoor-still-lurking-in-docker-images](https://www.binarly.io/blog/persistent-risk-xz-utils-backdoor-still-lurking-in-docker-images)

#### Herramienta útil

Chequeo de backdoor (gratuito): [https://xz.fail/](https://xz.fail/)