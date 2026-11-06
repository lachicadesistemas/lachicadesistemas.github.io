---
layout: post
title: "Ese TV box barato que viste en Mercado Libre puede estar trabajando para otro"
subtitle: "1,3 millones de cajitas Android convertidas en proxies: no era paranoia"
tags: [seguridad, android, iot, privacidad, botnets]
---

Hace unas semanas estaba mirando TV boxes con Android en Mercado Libre. La diferencia de precio era abismal: por un lado los equipos de marcas conocidas y por el otro una cantidad enorme de TV boxes genéricas, con nombres raros, "4K", "8K", "Android 13", 4 GB de RAM, 64 GB de almacenamiento... a una fracción del precio. Y en algún momento me surgió la duda: **¿qué tan seguras son estas cosas?** ¿Quién las fabrica? ¿Quién escribió el firmware? ¿Quién lo actualiza?

Al final decidí comprarme una Raspberry Pi, instalarle Debian y conectarla a la tele por HDMI. "Smart" a mi manera. Pero esta semana leí [la nota de Brian Krebs](https://krebsonsecurity.com/2026/11/tech-firms-dismantle-botnet-that-turned-1-3m-tv-boxes-into-proxies/), me acordé de aquella desconfianza que sentí mirando esas cajitas y confirmé que no era solo una sensación.

## Qué pasó: la botnet XCPE

El 2 de noviembre de 2026, el **Google Threat Intelligence Group (GTIG)** anunció que, junto con otras empresas, desarmó una botnet llamada **XCPE**, formada por **más de 1,3 millones de TV boxes Android**. El nombre viene de `x.cpe`, uno de los componentes principales del malware.

Lo grave no es solo la cantidad, sino **quién** lo hizo: el malware **venía preinstalado de fábrica** en el firmware, y según Google el responsable fue el propio **fabricante**, **Videostrong Technology Co.**, de Shenzhen, China. El backdoor se activaba **en el primer arranque**, y Videostrong además **le vendía el acceso** a otros grupos criminales para que cargaran sus propios módulos de malware.

Ben Brundage, de Synthient (una startup que rastrea proveedores de proxies y participó en la investigación), dijo que es *"probablemente la operación más grande contra TV boxes con backdoor que vimos"*. Además dijo que la cifra de 1,3 millones es **"muy conservadora"**. Google estima que la operación también corta el acceso a por lo menos **10 millones de dispositivos comprometidos más**.

Y no eran solo TV boxes: también había **dispositivos de telemedicina, karaokes y pantallas de cartelería digital**.

## ¿Para qué querían mi TV box?

Esta es la parte que más me interesa explicar, porque mucha gente piensa *"¿y qué me van a robar de una cajita que solo uso para Netflix y YouTube?"*.

No les interesan tus series. Les interesa **tu conexión a internet** y, sobre todo, **tu IP residencial**.

### Proxies residenciales

Una IP de un datacenter (AWS, Google Cloud, un VPS cualquiera) es fácil de identificar y de bloquear. Una IP **de tu casa**, de tu proveedor de internet, parece la de una persona común. Por eso existe todo un mercado de **"proxies residenciales"**: empresas que alquilan el acceso a internet a través de conexiones de usuarios hogareños.

Algunos de esos usuarios aceptan conscientemente (hay apps que te pagan centavos por "compartir tu ancho de banda"). Pero en el caso de XCPE, nadie dio su consentimiento: la caja lo hacía por su cuenta. La nota de Krebs menciona varios servicios de proxies vinculados al tráfico de estos dispositivos: AppSalt/Honeygain (de Oxylabs), NetNut, EarnFM, Traffmonetizer, GaGaNode, Grass y otros. Oxylabs, por su parte, dijo que el proveedor **les falsificó las señales de consentimiento**, que suspendió la relación y que ese proveedor representaba menos del 1% de su pool de IPs.

¿Y para qué se usa ese tráfico que sale por tu casa?

- **Fraude publicitario**: clics y visualizaciones falsas de anuncios.
- **Robo de cuentas** (*account takeover*): probar contraseñas filtradas contra bancos, mails, redes sociales, haciéndose pasar por usuarios normales.
- **Scraping masivo**, incluyendo la recolección de contenido para entrenar proyectos de IA.
- En otros casos parecidos, como la botnet **Kimwolf** que Synthient investigó a principios de 2026, para **ataques DDoS** récord.

### El problema para vos

Si tu TV box forma parte de algo así:

1. **Tu IP aparece en los logs** de todo eso. Si alguien intenta entrar a la cuenta bancaria de otra persona "desde tu casa", la IP que queda registrada es la tuya.
2. Tu IP puede terminar en **listas negras**: de repente te empiezan a aparecer captchas en todos lados, o algunos servicios te bloquean directamente.
3. Se **consume tu ancho de banda**, a veces sin que lo notes.
4. Y lo más importante: **tenés un dispositivo controlado por terceros adentro de tu red**, al lado de tu notebook, tu celular y tus cámaras. Si alguien puede cargarle módulos de malware a voluntad, el uso como proxy es solo lo que *hoy* les conviene.

## Lo que más me sorprendió: muchas estaban "certificadas"

Acá es donde mi intuición de "lo barato sale caro" se queda corta. Varias de las cajas afectadas eran **dispositivos certificados por Google**, de marcas que se venden en tiendas grandes. La mayoría se vendieron bajo la marca **MECOOL** (de Skyworth, una empresa china que cotiza en bolsa), en modelos como KM1, KM2, KM3, KM6, KM7, KM8, KM9 Pro y KT1, además de un montón de productos genéricos y de marca blanca.

Synthient publicó en GitHub una [lista de 182 nombres de modelos](https://github.com/synthient/public-research/tree/main/2026/11/Videostrong) vistos en la campaña. Ojo: la lista **no es exhaustiva**, y que tu modelo no aparezca no significa que esté limpio. Videostrong fabrica para muchas marcas.

Tampoco es la primera vez: ya en 2025 el FBI había advertido sobre **BadBox 2.0**, otra operación de dispositivos Android baratos que venían infectados de fábrica. Y Censys encontró software de proxies preinstalado en los **Superbox**. Es un patrón, no un caso aislado.

## La mala noticia: el takedown no limpia tu caja

Google tomó acciones legales contra los servidores y dominios de Videostrong, cortó la relación con la empresa y le prohibió (a ella y a cualquier subsidiaria futura) fabricar dispositivos Android certificados. También dice que está endureciendo los controles de integridad del firmware.

Pero **el backdoor sigue ahí, en las cajas que ya se vendieron**. Desarmar la infraestructura de comando y control deja a los equipos "huérfanos" por un tiempo, pero el código malicioso sigue en el firmware, esperando que alguien vuelva a levantar un servidor con otro dominio.

Como el malware vive en el firmware, **resetear de fábrica no sirve**: el reset te devuelve justamente al firmware infectado. La única forma de sacarlo sería flashear un firmware alternativo, si existe uno para tu modelo. Synthient directamente recomienda **desechar los dispositivos afectados**.

## Qué podés hacer

### Si ya tenés un TV box genérico

**1. Fijate si tiene los paquetes conocidos.** Si sabés usar `adb` (activando la depuración USB/de red en las opciones de desarrollador):

```bash
adb connect IP_DEL_TVBOX:5555
adb shell pm list packages | grep -iE 'x\.cpe|oemservice|abc\.nexus'
```

Si aparece `x.cpe`, `com.oemservice` o `com.abc.nexus`, asumí que la caja está comprometida. Si no aparece nada, **no quiere decir que esté limpia**: solo que no tiene *esos* nombres.

**2. Buscá tu modelo** en la lista de Synthient.

**3. Mirá qué hace en la red.** Si tu router te deja ver el tráfico por dispositivo, o si tenés algo como Pi-hole o AdGuard Home, fijate a qué dominios se conecta la caja y cuánto tráfico mueve cuando *no la estás usando*. Una TV box apagada (o "en reposo") que sube gigas por día es una muy mala señal.

**4. Si tenés dudas, desenchufala.** En serio. Es un aparato de pocos dólares; tu red y tu IP valen más.

### Si la vas a seguir usando igual (o tenés otros dispositivos IoT)

**Aislala.** Esto vale para cualquier dispositivo "inteligente" en el que no confiás del todo (cámaras chinas, enchufes WiFi, lamparitas, etc.):

- Usá la **red de invitados** del router o, si tu equipo lo permite, una **VLAN separada para IoT**, sin acceso a tu red principal.
- **Bloqueá el tráfico** entre esa red y tus computadoras, NAS y celulares.
- Si podés, aplicá filtrado DNS a esa red.

No va a evitar que usen tu IP como proxy, pero sí que el bicho salte a tus otros equipos.

### Si estás por comprar uno

- **Desconfiá del precio "demasiado bueno"**. Si una caja con specs de gama alta cuesta menos que un Chromecast, alguien está compensando la diferencia, y probablemente sea con tu conexión.
- **Desconfiá de las promesas de "todos los canales gratis"** o apps de streaming "liberadas" preinstaladas. Ese es justamente el gancho de muchos de estos equipos.
- Preferí dispositivos de **empresas que tengan algo que perder** si las agarran haciendo esto, y que publiquen actualizaciones de seguridad: Google TV Streamer / Chromecast, Fire TV, Apple TV, o directamente las apps del televisor si es un Smart TV razonablemente actual.
- Tené presente que, como mostró este caso, **ni siquiera la certificación es garantía absoluta**. Es una capa más, no un sello mágico.

## Conclusión

Lo que me quedó dando vueltas de todo esto es lo invertido del modelo. Normalmente pensamos en el malware como algo que "te entra": un adjunto, una app trucha, una página rara. Acá el atacante **es el fabricante**, y el malware viene instalado antes de que abras la caja. No hay descuido del usuario que lo explique: compraste un producto y vino así.

Y en ese contexto, lo barato es parte del negocio. El aparato se vende casi al costo (o por debajo) porque la ganancia real está después, en revender tu conexión una y otra vez.

Así que si alguna vez miraste esos TV boxes de precio sospechoso y pensaste *"esto es raro"*: confiá en esa sensación. A veces la paranoia es solo buen criterio.

---

**Fuentes:**

- [Tech Firms Dismantle Botnet That Turned 1.3M TV Boxes Into Proxies – Krebs on Security](https://krebsonsecurity.com/2026/11/tech-firms-dismantle-botnet-that-turned-1-3m-tv-boxes-into-proxies/)
- [Google Disrupts 1.3 Million-Device Android Botnet – The Hacker News](https://thehackernews.com/2026/11/google-disrupts-13-million-device.html)
- [Lista de modelos afectados – Synthient en GitHub](https://github.com/synthient/public-research/tree/main/2026/11/Videostrong)
- [The Internals of a Badbox Operation – Synthient](https://synthient.com/blog/the-internals-of-a-badbox-operation)
- [1.3 million Google-certified Android TV boxes found to have malware – CNX Software](https://www.cnx-software.com/2026/11/04/google-certified-android-tv-boxes-found-to-have-malware/)
- [XCPE Botnet: Is Your Android TV Box Hacked? – McAfee](https://www.mcafee.com/blogs/security-news/xcpe-botnet-android-tv-box/)
