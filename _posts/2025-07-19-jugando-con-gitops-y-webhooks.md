---
layout: post
title: "Jugando con GitOps, Webhooks y un poco de automatización recreacional"
subtitle: "Por que nunca está de más practicar con estas cosas, ¿No?"
date: 2025-07-19
share-img: /assets/img/tecnologia-2025-05-18.png
layout: post
author: Alexia
tags: [devops, git, gitops, workflows, github, github actions, API, webhooks]
---


### La idea inicial 

Desde hace algunos meses que venía pensando en reabrir mi discord y pasarlo a público. Mucha gente que mira [Mi canal de YouTube](https://www.youtube.com/@lachicadesistemas) me había sugerido que tuviera disponible discord, y me terminaron convenciendo.

Desde hace tiempo que, en discord, tengo un bot que detecta cuando posteo un nuevo video o salgo en vivo en twitch, y envía el link a un canal específico para que la gente pueda verlo y sumarse.

Pero tenía ganas de otra cosa más. Que cuando escribiera un nuevo artículo en este blog, automáticamente también se compartiera allí y quizás también en otras plataformas.

Notese la palabra **automáticamente** por que eso será clave para lo que estoy por contarles.


## El blog

Para quienes no saben, la tecnología debajo de este blog es Jekyll escrito en el lenguaje Ruby.  Jekyll, a diferencia de tecnologías como WordPress (PHP / MYSQL) no requiere una base de datos, ni contraseñas de ningún tipo, ni nada.

Los posts los escribo en formato markdown. Luego al hacer un push al repositorio, tengo un workflow (github actions) que lo que hace es que jekyll buildee o convierta el artículo escrito en markdown en una página .html estática. 

Todo esto se hace automáticamente cada vez que hago un push a la rama master.

```
# el CI (Continuous Integration)
name: Buildear Jekyll

on:
  push:
    branches:
      - master  # Solo disparo el action si el push se hizo a la rama principal

jobs:
  build:
    name: Build Jekyll
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Buildear Jekyll en el container
        run: |
          export JEKYLL_VERSION=4.2.2
          docker run \
          -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site \
          -e PAGES_REPO_NWO=${{ github.repository }} \
          jekyll/builder:$JEKYLL_VERSION /bin/bash -c "chmod 777 /srv/jekyll && bundle install && jekyll build --future"
```

Hasta ahí todo bien. Este yaml hace lo que dice que hace. Cada vez que hago un push, reconstruye jekyll en el container mediante github actions, convirtiendo el markdown en html y eso es lo que la gente ve cuando visita el blog.


Pero ahora que el discord es público, pensé: ¿Y si, aprovechando este workflow, también integro una notificación a discord para que, cuando hago un push con un nuevo artículo, comparta el permalink en un canal público?

El tema era el como. Ya que hasta aquí no había manera facil de obtener el permalink

Entonces recorde que ya tengo integrado una feed RSS, y bingo!

Podría hacer un nuevo action que espere a que termine el primero, así garantizo que el artículo está creado en html estático, espero unos segundos hasta que esté actualizado el feed RSS con el nuevo permalink, me agarro el permalink de ahí y lo comparto a discord mediante un webhook! 

En mi cabeza tenía sentido, pero había que trasladar todo esto a lenguaje yaml (jeje)

Así que para no agregar un nuevo action al workflow, decidí expandir el previo:

```
notify:
    name: Notify Discord
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Esperar RSS update
        run: sleep 20 #esperamos 20 segundos para que se actualice el feed

      - name: Send Discord Notification
        run: |
          RSS_FEED_URL="https://lexi.lat/feed.xml"
          LATEST_POST_URL=$(curl -s "$RSS_FEED_URL" | grep -oP '(?<=<link>).*?(?=</link>)' | sed -n '2p')
          curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"Alexia acaba de publicar un nuevo artículo! Leelo aquí: $LATEST_POST_URL\"}" https://discord.com/api/webhooks/xxxxx

```
Para esto tuve que, primero, crear un nuevo webhook, luego poner la URL de mi propia feed, y grepear por el 2do link, y por último enviar con un curl el post utilizando el webhook creado.

![Post]({{ '/assets/img/webhook.png' | relative_url }})


Al hacer un push con el nuevo artículo a la rama master, se construyó el html y además mandó la notificación. 

Una manera muy sencilla de compartir una notita en una comunidad automáticamente ni bien sale del horno. 

### Consideraciones y notitas finales

Este workflow va a enviar un link cada vez que se actualice un artículo. Si de repente tu artículo tenía faltas de ortografía y decidiste hacer alguna corrección y mandar otro commit con la corrección volverá a enviar el link como si fuera un artículo nuevo. 

Sólo funciona con un repositorio en github. Este blog está hosteado en github pages. 

Lo armé para jugar y practicar un poco de gitops, mostrando una de las tantas cosas que se pueden hacer en términos de automatización con git y un poquito de creatividad.

Espero que les guste.

Alexia.