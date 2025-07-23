---
layout: post
title: "Google lanza OSS Rebuild: seguridad y transparencia para el software open source"
subtitle: "Verificando paquetes PyPI, npm y Crates.io antes de instalarlos"
date: 2025-07-23
share-img: /assets/img/google-ossrebuild.png
author: Alexia
tags: [seguridad, open-source, google, sysadmin, devops, python, nodejs, rust]
---

La mayoría del software que usamos todos los días —tanto en servidores, aplicaciones como en nuestro propio sistema operativo— depende de componentes open source. Pero… ¿cómo sabemos que esos paquetes realmente son lo que dicen ser y no fueron manipulados en el camino? Google acaba de lanzar [OSS Rebuild](https://security.googleblog.com/2025/07/introducing-oss-rebuild-open-source.html), una herramienta que puede cambiar el panorama de la seguridad en la cadena de suministro de software.

## ¿Qué es OSS Rebuild?

OSS Rebuild es un sistema automatizado que recompila y verifica los paquetes más populares de PyPI (Python), npm (Node.js/JavaScript/TypeScript) y Crates.io (Rust).  
¿Su objetivo? Garantizar que los artefactos públicos realmente coincidan con el código fuente, y detectar cualquier intento de manipulación o backdoor antes de que llegue a producción.

## ¿Por qué importa?

- Más del 75% del software moderno se basa en open source, y eso lo convierte en objetivo de ataques a la cadena de suministro.
- Vulnerabilidades recientes como la de xz-utils o paquetes contaminados en npm demuestran lo fácil que es introducir código malicioso si nadie verifica.
- OSS Rebuild permite, de manera automática y transparente, comparar lo que está publicado en los repositorios con el código fuente y emitir una **attestation** firmada (sigstore SLSA Level 3).

## ¿Cómo funciona?

1. **Escanea y genera una receta de build reproducible** para cada paquete.
2. **Reconstruye el paquete en un entorno hermético**, monitoreando el proceso.
3. **Compara el resultado** con el artefacto publicado, ignorando diferencias superficiales como timestamps.
4. **Emite una attestation** firmada si todo coincide, que podés consultar o integrar a tus pipelines y SBOMs.

## Ejemplos prácticos para sysadmins y devops

¿Querés verificar un paquete antes de instalarlo? ¿O automatizar el chequeo en tu pipeline? Así de fácil:

### 1. Instalar la herramienta

```bash
go install github.com/google/oss-rebuild/cmd/oss-rebuild@latest

```
### 2. Verificar la attestation de un paquete PyPI
Por ejemplo, para ```absl-py``` versión 2.1.0:

```
oss-rebuild get pypi absl-py 2.1.0
```

Te muestra:

El manifiesto del build.
Si el paquete coincide con el repo.
El enlace a la attestation firmada.
### 3. Automatizar en tu CI/CD
En un script o pipeline:

```
for pkg in absl-py@2.1.0 requests@2.32.3; do
    oss-rebuild get pypi $(echo $pkg | tr '@' ' ')
done
```

Si algún paquete fue manipulado, el comando lo reporta y podés abortar el build.

### 4. Obtener el Dockerfile reproducible de un paquete npm

```
oss-rebuild get npm lodash 4.17.21 --output=dockerfile > Dockerfile.lodash
```

Podés reconstruir ese paquete vos misma/o en un entorno cerrado.

5. Consultar historial de rebuilds

```
oss-rebuild list pypi absl-py
```

## Conclusión

OSS Rebuild suma una capa de transparencia y confianza al ecosistema open source. Para quienes administramos sistemas o desarrollamos software, es una herramienta que puede integrarse fácilmente en nuestro workflow y elevar el estándar de seguridad de nuestros entornos.
En un mundo donde los ataques a la cadena de suministro son cada vez más sofisticados, sumar este tipo de chequeos debería volverse un hábito, igual que mirar los logs o hacer backups.


Fuente: [Google Security Blog](https://security.googleblog.com/2025/07/introducing-oss-rebuild-open-source.html)

