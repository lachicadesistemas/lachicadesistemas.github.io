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
```
prod.classify-client.prod.webservices.mozgcp.net on TCP port 443
prod.remote-settings.prod.webservices.mozgcp.net on TCP port 443  
mc.prod.ads.prod.webservices.mozgcp.net on TCP port 443  
prod.detectportal.prod.cloudops.mozgcp.net on TCP port 80  
push.services.mozilla.com on TCP port 443  
prod.balrog.prod.cloudops.mozgcp.net on TCP port 443  
telemetry-incoming.r53-2.services.mozilla.com on TCP port 443  
safebrowsing.googleapis.com on TCP port 443  
firefox.settings.services.mozilla.com on TCP port 443  
ads.mozilla.org on TCP port 443  
aus5.mozilla.org on TCP port 443  
services.addons.mozilla.org on TCP port 443  
location.services.mozilla.com on TCP port 443  
a1887.dscq.akamai.net on TCP port 80  
push.services.mozilla.com on UDP port 443  
detectportal.firefox.com on TCP port 80  
incoming.telemetry.mozilla.org on TCP port 443  
r10.o.lencr.org on TCP port 80  
prod.content-signature-chains.prod.webservices.mozgcp.net on TCP port 443  
e3913.cd.akamaiedge.net on TCP port 80  
aus5.mozilla.org on UDP port 443  
content-signature-2.cdn.mozilla.net on TCP port 443  
a19.dscg10.akamai.net on TCP port 80  
edgedl.me.gvt1.com on TCP port 443  
attachments.prod.remote-settings.prod.webservices.mozgcp.net on TCP port 443  
addons.mozilla.org on TCP port 443  
pki-goog.l.google.com on TCP port 80  
edgedl.me.gvt1.com on UDP port 443  
ocsp.digicert.com on TCP port 80  
```
---

### Brave

- **Version:** 135.1.77.97
- **Motor:** Blink
- **Tamaño:** 664MB
- **Participación de mercado:** <1%
- **Conexiones:** 17
```
d17ndjuagurpsr.cloudfront.net TCP 443
star-randsrv.bsg.brave.com TCP 443
updates.bravesoftware.com TCP 443
go-updater-1830831421.us-west-2.elb.amazonaws.com TCP 443
dualstack.o.sni.global.fastly.net TCP 443
usage-ping.brave.com TCP 443
go-updater.brave.com TCP 443
d1vbftvkf37ah3.cloudfront.net TCP 443
dualstack.k.sni.global.fastly.net TCP 443
brave-production-proxy-238320562.us-west-2.elb.amazonaws.com TCP 443
c365508cba5e4c13b0de402838df76aa.pacloudflare.com TCP 443
safe-browsing-quorum.wdp-public.brave.com TCP 443
brave-core-ext.s3.brave.com UDP 443
d1bvmdanhrl7qk.cloudfront.net TCP 443
d1gtt36mgrexoi.cloudfront.net TCP 443
redirector.brave.com UDP 443
collector.bsg.brave.com TCP 443
```
---

### Ungoogled Chromium

- **Version:** 135.0.7049.84
- **Motor:** Blink
- **Tamaño:** 342MB
- **Participación de mercado:** <0.1%
- **Conexiones:** 3
```
clients.l.google.com TCP 443
raw.githubusercontent.com TCP 443
clients2.google.com TCP 443
```
---

### Vivaldi

- **Version:** 7.3.3635.9
- **Motor:** Blink
- **Tamaño:** 637MB
- **Participación de mercado:** <1%
- **Conexiones:** 11
```
clients.l.google.com TCP 80
vivaldi.map.fastly.net TCP 443
mimir2.vivaldi.com TCP 443
update.vivaldi.com TCP 443
weather.vivaldi.com TCP 443 / UDP 443
downloads.vivaldi.com TCP 443
vivaldi.com TCP 443 / UDP 443
update.googleapis.com TCP 443
player.vimeo.com.cdn.cloudflare.net TCP 443
```
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
```
autoupdate.geo.opera.com                              TCP 443  
delivery-ads.op-mobile.opera.com                      TCP 443  
disco-api.opera.com                                   TCP 443  
extension-updates.opera.com                           TCP 443  
extensions.opera.com                                  TCP 443  
location-data-collector.o.otto.opera.com              TCP 443  
log.sec-tunnel.com                                    TCP 443  
metrics.opera.com                                     TCP 443  
network.emnify.com                                    TCP 443  
notifications.opera.com                               TCP 443  
r1---sn-a5meknsl.gvt1.com                             TCP 443  
redir.opera.com                                       TCP 443  
redir2.opera.com                                      TCP 443  
sitecheck2.opera.com                                  TCP 443  
static.opera.com                                      TCP 443  
video-delivery.opera.com                              TCP 443  
www.opera.com                                         TCP 443  
api-secure.opera.com                                  TCP 443  
ads-opera.akamaized.net                               TCP 443  
autoupdate.opera.com                                  TCP 443  
api.tailscale.com                                     TCP 443  
clientlog.v.opera.com                                 TCP 443  
location-data-collector.opera.com                     TCP 443  
crash.opera.com                                       TCP 443  
ad.opera.com                                          TCP 443  
update.googleapis.com                                 TCP 443  
logx.optimizely.com                                   TCP 443  
cdn.jsdelivr.net                                      TCP 443  
browser.sentry-cdn.com                                TCP 443  
ads.opera-api.com                                     TCP 443  
otf.opera-mini.net                                    TCP 443  
```
---

### Google Chrome

- **Version:** 135.0.7049.85
- **Motor:** Blink
- **Tamaño:** 635MB
- **Participación de mercado:** 65.7%
- **Conexiones:** 25
```
clients2.google.com                                   TCP 443  
clients.l.google.com                                  TCP 443  
update.googleapis.com                                 TCP 443  
ocsp.pki.goog                                         TCP 80  
r3.o.lencr.org                                        TCP 80  
r10.o.lencr.org                                       TCP 80  
update.googleapis.com                                 UDP 443  
redirector.gvt1.com                                   TCP 443  
fonts.googleapis.com                                  TCP 443  
fonts.gstatic.com                                     TCP 443  
mtalk.google.com                                      TCP 443  
gstaticadssl.l.google.com                             TCP 443  
www.google.com                                        TCP 443  
www.gstatic.com                                       TCP 443  
apis.google.com                                       TCP 443  
play.googleapis.com                                   TCP 443  
gvt1.com                                              TCP 443  
safebrowsing.googleapis.com                           TCP 443  
safebrowsing.google.com                               TCP 443  
ssl.gstatic.com                                       TCP 443  
content-autofill.googleapis.com                       TCP 443  
content-suggestions.googleapis.com                    TCP 443  
news.google.com                                       TCP 443  
notifications-pa.googleapis.com                       TCP 443  
crl.pki.goog                                          TCP 80  
```
---

### Microsoft Edge

- **Version:** 135.0.3179.73
- **Motor:** Blink
- **Tamaño:** 900MB
- **Participación de mercado:** 13.37%
- **Conexiones:** 48
```
browser.events.data.microsoft.com                     TCP 443  
settings-win.data.microsoft.com                       TCP 443  
nav.smartscreen.microsoft.com                         TCP 443  
location.microsoft.com                                TCP 443  
edge.activity.windows.com                             TCP 443  
config.edge.skype.com                                 TCP 443  
assets.msn.com                                        TCP 443  
www.bing.com                                          TCP 443  
client.wns.windows.com                                TCP 443  
nav.smartscreen.microsoft.com                         UDP 443  
msedge.api.cdp.microsoft.com                          TCP 443  
ntservicepack.microsoft.com                           TCP 443  
arc.msn.com                                           TCP 443  
www.msn.com                                           TCP 443  
location.services.mozilla.com                         TCP 443  
ocsp.digicert.com                                     TCP 80  
crl.microsoft.com                                     TCP 80  
ctldl.windowsupdate.com                               TCP 443  
dl.delivery.mp.microsoft.com                          TCP 443  
assets.windows.com                                    TCP 443  
edge.microsoft.com                                    TCP 443  
edge-consumer-static.microsoft.com                    TCP 443  
config.edge.skype.com                                 UDP 443  
api.msn.com                                           TCP 443  
client-s.gateway.messenger.live.com                   TCP 443  
web.vortex.data.microsoft.com                         TCP 443  
v10.events.data.microsoft.com                         TCP 443  
nav.smartscreen.microsoft.com                         TCP 443  
config.edge.skype.com                                 TCP 443  
browser.pipe.aria.microsoft.com                       TCP 443  
safebrowsing.google.com                               TCP 443  
ocsp.msocsp.com                                       TCP 80  
r3.o.lencr.org                                        TCP 80  
r10.o.lencr.org                                       TCP 80  
clients2.google.com                                   TCP 443  
clients.l.google.com                                  TCP 443  
msedge.b.tlu.dl.delivery.mp.microsoft.com             TCP 443  
static.licdn.com                                      TCP 443  
ocsp.godaddy.com                                      TCP 80  
ctldl.windowsupdate.com                               TCP 443  
outlook.office365.com                                 TCP 443  
www.office.com                                        TCP 443  
edgecdn.microsoft.com                                 TCP 443  
update.googleapis.com                                 TCP 443  
cdn.jsdelivr.net                                      TCP 443  
api-edge.smartscreen.microsoft.com                    TCP 443  
ocsp.usertrust.com                                    TCP 80  
ocsp.sectigo.com                                      TCP 80  
```
--- 

### Apple Safari
- Motor: WebKit
- Participación de Mercado: 8.23%
- Conexiones: 6
```
token.safebrowsing.apple                              TCP 443  
www.apple.com                                         TCP 443  
securemetrics.apple.com                               TCP 443  
securemvt.apple.com                                   TCP 443  
gateway.icloud.com                                    TCP 443  
api-glb-euc1b.smoot.apple.com                         TCP 443  
```
---

### Yandex Browser
- Version: 25.2.5.940.75827
- Motor: Blink
- Cuota de Mercado: < 1%
- Tamaño: 505MB
- Conexiones: 24
```
api.browser.yandex.com         TCP  443
update.googleapis.com          TCP  443
browser.yandex.com             TCP  443
sba.yandex.net                 TCP  443
300.ya.ru                      TCP  443
neuro.translate.yandex.ru      TCP  443
s3.yandex.net                  TCP  443
edgedl.me.gvt1.com             TCP  80
ya.ru                          TCP  443
yandex.ru                      TCP  443
browser.yandex.ru              TCP  443
yastatic.net                   TCP  443
api.browser.yandex.ru          TCP  80
edgedl.me.gvt1.com             TCP  443
mail.yandex.ru                 TCP  443
dr.yandex.net                  TCP  443
brontp-pre.yandex.ru           TCP  443
dr2.yandex.net                 TCP  443
cloud.cdn.yandex.net           TCP  443
dzen.ru                        TCP  443
suggest.dzen.ru                TCP  443
mc.yandex.ru                   TCP  443
suggest.sso.dzen.ru            TCP  443
cloudcdn-ams19.cdn.yandex.net  TCP  443
```

---

### Mullvad Browser
- Version: 14.0.9
- Motor: Gecko
- Participación de Mercado: < 1%
- Tamaño: 370MB
- Conexiones: 15
```
dns.mullvad.net                     TCP  443
a1887.dscq.akamai.net               TCP  80
publicsuffix.org                    TCP  443
versioncheck-bg.addons.mozilla.org  TCP  443
cdn.mullvad.net                     TCP  443
ublockorigin.pages.dev              TCP  443
e3913.cd.akamaiedge.net             TCP  80
versioncheck-bg.addons.mozilla.org  UDP  443
secure.fanboy.co.nz                 TCP  443
filters.adtidy.org                  TCP  443
pgl.yoyo.org                        TCP  443
ublockorigin.pages.dev              UDP  443
secure.fanboy.co.nz                 UDP  443
cdn.jsdelivr.net                    TCP  443
ublockorigin.github.io              TCP  443
```
---

### Librewolf
- Version: 137.0.1
- Motor: Gecko
- Participación de Mercado: < 0.1%
- Tamaño: 369MB
- Conexiones: 24
```
addons.mozilla.org                                         TCP  443
push.services.mozilla.com                                  TCP  443
services.addons.mozilla.org                                TCP  443
gitlab.com                                                 TCP  443
a1887.dscq.akamai.net                                      TCP  80
firefox.settings.services.mozilla.com                      TCP  443
versioncheck-bg.addons.mozilla.org                         TCP  443
publicsuffix.org                                           TCP  443
prod.remote-settings.prod.webservices.mozgcp.net           TCP  443
ublockorigin.pages.dev                                     TCP  443
prod.content-signature-chains.prod.webservices.mozgcp.net  TCP  443
ublockorigin.pages.dev                                     UDP  443
raw.githubusercontent.com                                  TCP  443
malware-filter.gitlab.io                                   TCP  443
1278313086.rsc.cdn77.org                                   TCP  443
prod.globalsign.map.fastly.net                             TCP  80
curbengh.github.io                                         TCP  443
pgl.yoyo.org                                               TCP  443
cdn.jsdelivr.net.cdn.cloudflare.net                        TCP  443
cdn.jsdelivr.net                                           UDP  443
filters.adtidy.org                                         TCP  443
dualstack.n.sni.global.fastly.net                          TCP  443
cdn.statically.io                                          UDP  443
ublockorigin.github.io                                     TCP  443
```
---

### Arc browser
- Version: 1.90.1
- Motor: Blink
- Participación de Mercado: < 1%
- Tamaño: 811MB
- Conexiones: 16
```
mobile.launchdarkly.com        TCP  443
clientstream.launchdarkly.com  TCP  443
cdn-settings.segment.com       TCP  443
securetoken.googleapis.com     TCP  443
o298668.ingest.sentry.io       TCP  443
update.googleapis.com          TCP  443
0.datadog.pool.ntp.org         UDP  123
content.arc.net                TCP  443
releases.arc.net               TCP  443
firestore.googleapis.com       TCP  443
api.segment.io                 TCP  443
safebrowsing.googleapis.com    TCP  443
update.googleapis.com          TCP  80
edgedl.me.gvt1.com             TCP  80
update.googleapis.com          UDP  443
www.googleapis.com             TCP  443
```
---

### Kagi Orion
- Version: 0.99
- Motor: WebKit
- Participación de Mercado: < 1%
- Tamaño: 612MB
- Conexiones: 0

---

### Pale Moon
- Version: 33.7.0
- Motor: Goanna
- Participación de Mercado: < 0.1%
- Tamaño: 85MB
- Conexiones: 0

---

### Floorp
- Version: 11.25
- Motor: Gecko
- Participación de Mercado: < 1%
- Tamaño: 447MB
- Conexiones: 42
```
prod.classify-client.prod.webservices.mozgcp.net              TCP  443
prod.remote-settings.prod.webservices.mozgcp.net              TCP  443
www.google.com                                                TCP  443
docs.ablaze.one                                               TCP  443
prod.detectportal.prod.cloudops.mozgcp.net                    TCP  80
m33.coreserver.jp                                             TCP  443
mc.prod.ads.prod.webservices.mozgcp.net                       TCP  443
push.services.mozilla.com                                     TCP  443
floorp-update.ablaze.one                                      TCP  443
raw.githubusercontent.com                                     TCP  443
shavar.prod.mozaws.net                                        TCP  443
a1887.dscq.akamai.net                                         TCP  80
prod.content-signature-chains.prod.webservices.mozgcp.net     TCP  443
pki-goog.l.google.com                                         TCP  80
www.google.com                                                UDP  443
t0.gstatic.com                                                TCP  443
t2.gstatic.com                                                TCP  443
location.services.mozilla.com                                 TCP  443
services.addons.mozilla.org                                   TCP  443
safebrowsing.googleapis.com                                   TCP  443
r10.o.lencr.org                                               TCP  80
js.hcaptcha.com                                               TCP  443
detectportal.firefox.com                                      TCP  80
push.services.mozilla.com                                     UDP  443
o.pki.goog                                                    TCP  80
docs.ablaze.one                                               UDP  443
static.cloudflareinsights.com                                 TCP  443
cdn.jsdelivr.net.cdn.cloudflare.net                           TCP  443
floorp-update.ablaze.one                                      UDP  443
content-signature-2.cdn.mozilla.net                           TCP  443
attachments.prod.remote-settings.prod.webservices.mozgcp.net  TCP  443
addons.mozilla.org                                            TCP  443
support.ablaze.one                                            TCP  443
www3.l.google.com                                             TCP  443
docs.floorp.app                                               TCP  443
prod.balrog.prod.cloudops.mozgcp.net                          TCP  443
a19.dscg10.akamai.net                                         TCP  80
edgedl.me.gvt1.com                                            TCP  443
firefox-settings-attachments.cdn.mozilla.net                  TCP  443
translate.google.com                                          TCP  443
edgedl.me.gvt1.com                                            UDP  443
support.ablaze.one                                            UDP  443
```
---

### Zen browser
- Version: 1.11.4b
- Motor: Gecko
- Participación de Mercado: < 1%
- Conexiones: 82
```
prod.remote-settings.prod.webservices.mozgcp.net              TCP  443
prod.classify-client.prod.webservices.mozgcp.net              TCP  443
zen-browser.app                                               TCP  443
prod.detectportal.prod.cloudops.mozgcp.net                    TCP  80
merino.services.mozilla.com                                   TCP  443
push.services.mozilla.com                                     TCP  443
updates.zen-browser.app                                       TCP  443
a1887.dscq.akamai.net                                         TCP  80
attachments.prod.remote-settings.prod.webservices.mozgcp.net  TCP  443
pki-goog.l.google.com                                         TCP  80
zen-browser.app                                               UDP  443
static.cloudflareinsights.com                                 TCP  443
bunnyfonts.b-cdn.net                                          TCP  443
services.addons.mozilla.org                                   TCP  443
location.services.mozilla.com                                 TCP  443
prod.content-signature-chains.prod.webservices.mozgcp.net     TCP  443
merino.services.mozilla.com                                   UDP  443
r10.o.lencr.org                                               TCP  80
push.services.mozilla.com                                     UDP  443
detectportal.firefox.com                                      TCP  80
content-signature-chains.prod.autograph.services.mozaws.net   TCP  443
fonts.bunny.net                                               TCP  443
prod.balrog.prod.cloudops.mozgcp.net                          TCP  443
a19.dscg10.akamai.net                                         TCP  80
edgedl.me.gvt1.com                                            TCP  443
r11.o.lencr.org                                               TCP  80
firefox-settings-attachments.cdn.mozilla.net                  TCP  443
firefox.settings.services.mozilla.com                         TCP  443
fonts.bunny.net                                               UDP  443
edgedl.me.gvt1.com                                            UDP  443
github.githubassets.com                                       TCP  443
mmx-ds.cdn.whatsapp.net                                       TCP  443
www.google.com                                                TCP  443
calendar.google.com                                           TCP  443
www.notion.so                                                 TCP  443
www.youtube.com                                               TCP  443
youtube-ui.l.google.com                                       TCP  443
trello.com                                                    TCP  443
twimg.twitter.map.fastly.net                                  TCP  443
d29id7n8587nnz.cloudfront.net                                 TCP  443
discord.com                                                   TCP  443
push.services.mozilla.com                                     TCP  443
x.com                                                         TCP  443
reddit.com                                                    TCP  443
notion.com                                                    TCP  443
o.pki.goog                                                    TCP  80
accounts.google.com                                           TCP  443
discord.com                                                   UDP  443
fonts.googleapis.com                                          TCP  443
fonts.gstatic.com                                             TCP  443
ajax.googleapis.com                                           TCP  443
cdn.prod.website-files.com                                    TCP  443
cdn.localizeapi.com                                           TCP  443
d3e54v103j8qbb.cloudfront.net                                 TCP  443
abs-zero.twimg.com                                            TCP  443
cf.x.com                                                      TCP  443
api.x.com                                                     TCP  443
accounts.google.com                                           UDP  443
workspace.google.com                                          TCP  443
play.google.com                                               TCP  443
fonts.gstatic.com                                             UDP  443
ajax.googleapis.com                                           UDP  443
cdn.prod.website-files.com                                    UDP  443
cdn.localizeapi.com                                           UDP  443
cdn.discordapp.com                                            TCP  443
www.googletagmanager.com                                      TCP  443
geolocation.onetrust.com                                      TCP  443
www.youtube.com                                               UDP  443
www.gstatic.com                                               TCP  443
fonts.googleapis.com                                          UDP  443
cdn.discordapp.com                                            UDP  443
www.googletagmanager.com                                      UDP  443
lh3.googleusercontent.com                                     TCP  443
storage.googleapis.com                                        TCP  443
ssl.google-analytics.com                                      TCP  443
www.google-analytics.com                                      TCP  443
region1.google-analytics.com                                  TCP  443
www.google-analytics.com                                      UDP  443
lh3.googleusercontent.com                                     UDP  443
storage.googleapis.com                                        UDP  443
ssl.google-analytics.com                                      UDP  443
region1.google-analytics.com                                  UDP  443
```
---

### Waterfox
- Motor: Gecko
- Participación de Mercado: < 0.1%
- Conexiones: 21
```
dooh.cloudflare-dns.com                           TCP  443
prod.classify-client.prod.webservices.mozgcp.net  TCP  443
prod.remote-settings.prod.webservices.mozgcp.net  TCP  443
www.waterfox.net                                  TCP  443
prod.detectportal.prod.cloudops.mozgcp.net        TCP  80
aus1.waterfox.net                                 TCP  443
accounts.firefox.com                              TCP  443
push.services.mozilla.com                         TCP  443
shavar.prod.mozaws.net                            TCP  443
firefox.settings.services.mozilla.com             TCP  443
location.services.mozilla.com                     TCP  443
services.addons.mozilla.org                       TCP  443
waterfox-ohttp-relay.fastly-edge.com              TCP  443
aus1.waterfox.net                                 UDP  443
accounts.firefox.com                              UDP  443
push.services.mozilla.com                         UDP  443
detectportal.firefox.com                          TCP  80
dooh.waterfox.net                                 TCP  443
prod.balrog.prod.cloudops.mozgcp.net              TCP  443
edgedl.me.gvt1.com                                TCP  443
www.google.com                                    TCP  443
```
---

### Thorium
- Motor: Blink
- Participación de Mercado: < 0.1%
- Conexiones: 10
```
accounts.google.com           TCP  443
www.google.com                TCP  443
www.gstatic.com               TCP  443
ogads-pa.clients6.google.com  TCP  443
plus.l.google.com             TCP  443
play.google.com               TCP  443
ogads-pa.clients6.google.com  UDP  443
apis.google.com               TCP  443
update.googleapis.com         TCP  443
www.google.com                UDP  443
```
---
## Conclusión

La mayoría de los navegadores modernos **contactan servidores externos antes de que puedas configurarlos**. Ya sea por telemetría, actualizaciones de listas de bloqueo o contenido en la pestaña 
nueva, **es tráfico no consentido**.

Algunos, como Tor o Kagi Orion, demuestran que **sí se puede** lanzar un navegador moderno **sin comprometer la privacidad desde el arranque**.

---

**¿Y vos? ¿Con cuál te quedás?**

