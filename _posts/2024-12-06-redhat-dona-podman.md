---
layout: post
title: Red Hat dona herramientas de contenedores a la CNCF
date: 2024-12-06
categories: [Cloud, Open Source]
Author: Alexia Michelle
---

En la conferencia **KubeCon + CloudNativeCon 2024**, **Red Hat** anunció su intención de donar un conjunto de herramientas para la creación y gestión de contenedores, incluyendo **Podman**, a la **Cloud Native Computing Foundation (CNCF)**.

Entre las herramientas que se donarán están:

- **bootc**: una herramienta para actualizar sistemas operativos.
- **Buildah**: una herramienta sin demonio para crear imágenes compatibles con la iniciativa Open Container (OCI).
- **Composefs**: un sistema de archivos overlay.
- **Skopeo**: una herramienta de línea de comandos para copiar imágenes de contenedores.

Por su parte, **Podman** y **Podman Desktop** son un conjunto ampliamente utilizado de herramientas para la gestión de contenedores, diseñadas para facilitar el trabajo de los desarrolladores al organizar los contenedores necesarios para construir aplicaciones. Como alternativa sin demonio a Docker Desktop, Red Hat ha promovido Podman como una herramienta basada en una arquitectura de microservicios, ofreciendo un enfoque más seguro y liviano para desarrollar aplicaciones nativas de la nube.

El desarrollo de Podman comenzó como una respuesta a la escasez de habilidades en tecnologías de contenedores. Red Hat buscó crear herramientas accesibles tanto para desarrolladores novatos como para administradores de TI, con funciones como la creación de pods, que permite combinar contenedores en pods personalizados. El objetivo principal ha sido aumentar la productividad de los desarrolladores de aplicaciones, sin importar su nivel de experiencia.

Hasta la fecha, **Podman Desktop** ha sido descargado más de 1.5 millones de veces. Aunque está optimizado para usarse junto con **Red Hat Enterprise Linux (RHEL)**, la donación de estas herramientas permitirá que evolucionen como proyectos de nivel sandbox bajo la CNCF.

### La importancia de democratizar el desarrollo de contenedores

Según **Mitch Ashley**, vicepresidente de DevOps y desarrollo de aplicaciones en The Futurum Group, Podman facilita la gestión de contenedores, pods e imágenes, haciéndola accesible para un mayor número de desarrolladores. Esto resulta esencial en un momento en que el uso de contenedores sigue creciendo. Un estudio de Techstrong Research encontró que alrededor del 60% de las organizaciones están realizando inversiones significativas en tecnologías de contenedores y orquestación para los próximos dos años, y más de la mitad ya utilizan aplicaciones nativas de la nube en producción.

Sin embargo, el desarrollo de aplicaciones nativas de la nube sigue siendo un desafío complejo. Aunque hay millones de desarrolladores con el potencial de crear estas aplicaciones, muchos aún no adoptan completamente los microservicios como metodología de desarrollo debido a su dificultad.

### Hacia un futuro más sencillo

Si bien avances en inteligencia artificial (IA) podrían simplificar este proceso en el futuro, por ahora, aumentar la productividad de los desarrolladores es fundamental. Cuanto más tiempo dediquen a gestionar y actualizar microservicios, menos aplicaciones podrán construir. El desafío sigue siendo facilitar al máximo el desarrollo y despliegue de aplicaciones nativas de la nube a gran escala.

Con esta iniciativa, Red Hat busca no solo promover la adopción de herramientas open source, sino también acelerar la innovación en el ecosistema nativo de la nube.
