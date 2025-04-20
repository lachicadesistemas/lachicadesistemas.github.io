---
layout: post
title: Los Browsers que más te espían en el 2025
subtitle: ¿Cuales tienen más telemetría?
date: 2025-04-20
share-img: /assets/img/browsers2025.png
categories: [seguridad, tls, browsers, telemetria, privacidad, web, ciberseguridad]
author: Alexia
---

# ¿Qué navegadores reportan más datos de usuarios? 

> Antes de empezar, quiero aclarar que este artículo no se trata sobre que browser es el mejor, ya que como digo siempre, el mejor software es el que te gusta a vos, por el motivo que sea.
Lo que quiero mostrar aquí es que browsers envían más cantidad de datos hacia afuera luego de una instalación default.




## Consideraciones

Aunque algunas conexiones no son estrictamente *telemetría* (como actualizaciones de listas de bloqueo de anuncios o contenido en la nueva pestaña), siguen siendo conexiones no solicitadas. No hay 
una manera clara de aceptarlas o rechazarlas en el primer inicio. En otras palabras: **el software envía/recibe datos sin tu consentimiento explícito.**


## Ganadores

Navegadores que **no hacen conexiones no solicitadas** tras una instalación limpia:

- **Kagi Orion**
- **Tor Browser**
- **Pale Moon**


Tablita comparativa ordenada de menor a mayor según cantidad de conexionesn no autorizadas (¡Qué sorpresa me lleve con Safari!)

<style>
.custom-browser-table {
  background-color: black;
  color: white;
  border-collapse: collapse;
  margin-top: 1em;
  width: 100%;
  font-family: monospace;
}

.custom-browser-table th,
.custom-browser-table td {
  border: 1px dashed yellow;
  padding: 8px;
  text-align: left;
}

.custom-browser-table th {
  color: yellow;
}

.custom-browser-table .green {
  color: limegreen;
}

.custom-browser-table .yellow {
  color: gold;
}

.custom-browser-table .red {
  color: tomato;
}
</style>

<table class="custom-browser-table">
  <thead>
    <tr>
      <th>Navegador</th>
      <th>Cuota de mercado</th>
      <th>Conexiones</th>
    </tr>
  </thead>
  <tbody style="background-color:#000;">
    <tr><td class="green">Tor Browser</td><td>&lt; 1%</td><td>0</td></tr>
    <tr><td class="green">Kagi Orion</td><td>&lt; 1%</td><td>0</td></tr>
    <tr><td class="green">Pale Moon</td><td>&lt; 0.1%</td><td>0</td></tr>
    <tr><td class="green">Ungoogled Chromium</td><td>&lt; 0.1%</td><td>3</td></tr>
    <tr><td class="green">Apple Safari</td><td>8.23%</td><td>6</td></tr>
    <tr><td class="green">Thorium</td><td>&lt; 0.1%</td><td>10</td></tr>

    <tr><td class="yellow">Vivaldi</td><td>&lt; 1%</td><td>11</td></tr>
    <tr><td class="yellow">Mullvad Browser</td><td>&lt; 1%</td><td>15</td></tr>
    <tr><td class="yellow">Arc browser</td><td>&lt; 1%</td><td>16</td></tr>
    <tr><td class="yellow">Brave</td><td>&lt; 1%</td><td>17</td></tr>
    <tr><td class="yellow">Waterfox</td><td>&lt; 0.1%</td><td>21</td></tr>
    <tr><td class="yellow">Librewolf</td><td>&lt; 0.1%</td><td>24</td></tr>

    <tr><td class="red">Yandex Browser</td><td>&lt; 1%</td><td>24</td></tr>
    <tr><td class="red">Google Chrome</td><td>65.7%</td><td>25</td></tr>
    <tr><td class="red">Mozilla Firefox</td><td>6%</td><td>29</td></tr>
    <tr><td class="red">Opera</td><td>2%</td><td>31</td></tr>
    <tr><td class="red">Floorp</td><td>&lt; 1%</td><td>42</td></tr>
    <tr><td class="red">Microsoft Edge</td><td>13.37%</td><td>48</td></tr>
    <tr><td class="red">Zen browser</td><td>&lt; 1%</td><td>82</td></tr>
  </tbody>
</table>



| Navegador           | Cuota de mercado | Conexiones |
|---------------------|------------------|------------|
| Tor Browser         | < 1%             | 0          |
| Kagi Orion          | < 1%             | 0          |
| Pale Moon           | < 0.1%           | 0          |
| Ungoogled Chromium  | < 0.1%           | 3          |
| Apple Safari        | 8.23%            | 6          |
| Thorium             | < 0.1%           | 10         |
| Vivaldi             | < 1%             | 11         |
| Mullvad Browser     | < 1%             | 15         |
| Arc browser         | < 1%             | 16         |
| Brave               | < 1%             | 17         |
| Waterfox            | < 0.1%           | 21         |
| Librewolf           | < 0.1%           | 24         |
| Yandex Browser      | < 1%             | 24         |
| Google Chrome       | 65.7%            | 25         |
| Mozilla Firefox     | 6%               | 29         |
| Opera               | 2%               | 31         |
| Floorp              | < 1%             | 42         |
| Microsoft Edge      | 13.37%           | 48         |
| Zen browser         | < 1%             | 82         |


## Contenido NERD 

Los datos técnicos de cada navegador y las URLs externas a las que les están pegando (No estoy sugiriendo que las bloqueen en iptables jejeje)

### Mozilla Firefox

- **Version:** 137.0.1
- **Motor:** Gecko
- **Tamaño:** 428MB
- **Participación de mercado:** 6%
- **Conexiones:** 29
- Ejemplo de dominios:
  - `telemetry-incoming.r53-2.services.mozilla.com`
  - `safebrowsing.googleapis.com`
  - `prod.remote-settings.prod.webservices.mozgcp.net`
  - `addons.mozilla.org`

---

### Brave

- **Version:** 135.1.77.97
- **Motor:** Blink
- **Tamaño:** 664MB
- **Participación de mercado:** <1%
- **Conexiones:** 17
- Ejemplo de dominios:
  - `usage-ping.brave.com`
  - `updates.bravesoftware.com`
  - `safe-browsing-quorum.wdp-public.brave.com`

---

### Ungoogled Chromium

- **Version:** 135.0.7049.84
- **Motor:** Blink
- **Tamaño:** 342MB
- **Participación de mercado:** <0.1%
- **Conexiones:** 3
- Dominios:
  - `clients.l.google.com`
  - `clients2.google.com`
  - `raw.githubusercontent.com`

---

### Vivaldi

- **Version:** 7.3.3635.9
- **Motor:** Blink
- **Tamaño:** 637MB
- **Participación de mercado:** <1%
- **Conexiones:** 11
- Ejemplo de dominios:
  - `update.vivaldi.com`
  - `weather.vivaldi.com`
  - `update.googleapis.com`

---

### Tor Browser

- **Version:** 14.0.9
- **Motor:** Gecko
- **Tamaño:** 451MB
- **Participación de mercado:** <1%
- **Conexiones:** **0**

---

### Opera

- **Version:** 118.0.5461.41
- **Motor:** Blink
- **Tamaño:** 521MB
- **Participación de mercado:** 2%
- **Conexiones:** 31
- Ejemplo de dominios:
  - `addons.opera.com`
  - `autoupdate.opera.com`
  - `safebrowsing.googleapis.com`
  - `firebaseinstallations.googleapis.com`

---

### Google Chrome

- **Version:** 135.0.7049.85
- **Motor:** Blink
- **Tamaño:** 635MB
- **Participación de mercado:** 65.7%
- **Conexiones:** 25
- Ejemplo de dominios:
  - `clients.l.google.com`
  - `accounts.google.com`
  - `update.googleapis.com`
  - `play.google.com`

---

### Microsoft Edge

- **Version:** 135.0.3179.73
- **Motor:** Blink
- **Tamaño:** 900MB
- **Participación de mercado:** 13.37%
- **Conexiones:** 48
- Ejemplo de dominios:
  - `copilot.microsoft.com`
  - `edge.microsoft.com`
  - `www.bing.com`
  - `events.data.microsoft.com`


## Conclusión

La mayoría de los navegadores modernos **contactan servidores externos antes de que puedas configurarlos**. Ya sea por telemetría, actualizaciones de listas de bloqueo o contenido en la pestaña 
nueva, **es tráfico no consentido**.

Algunos, como Tor o Kagi Orion, demuestran que **sí se puede** lanzar un navegador moderno **sin comprometer la privacidad desde el arranque**.

---

**¿Y vos? ¿Con cuál te quedás?**

