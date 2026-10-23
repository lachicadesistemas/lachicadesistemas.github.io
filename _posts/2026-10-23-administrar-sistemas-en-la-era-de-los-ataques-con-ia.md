---
layout: post
title: "Administrar sistemas en la era de los ataques con IA"
subtitle: "Cuando los exploits salen más rápido que los parches: casos recientes y cómo usar la IA para blindar la infraestructura"
share-img: /assets/img/sysadmin-ataques-ia.jpg
date: 2026-10-23 10:00:00 -0300
author: Alexia
categories: [seguridad, sysadmin, opinion]
tags: [seguridad, ia, cve, parches, buenas-practicas, zero-trust, agentes]
lang: es
---

Hace dos días escribí sobre [PHP2Shell]({% post_url 2026-10-21-php2shell-la-crisis-de-php-y-las-buenas-practicas %}) y cerré con una frase que me quedó picando: que en esta era de la IA quienes administramos sistemas vamos a andar corriendo para todos lados con el matafuegos en la mano. Me pregunté si era solo una sensación mía, de esas que te agarran después de un día de parches de emergencia, o si los datos la respaldaban. Así que me puse a leer informes.

Spoiler: no es una sensación.

## Los números: más fallas y menos tiempo

El Google Threat Intelligence Group (GTIG) publicó a fines de septiembre un análisis de las tendencias de descubrimiento y explotación de vulnerabilidades en esta "era de la IA"[^1][^2]. Algunos datos:

- Las CVE publicadas por mes **se duplicaron** en lo que va del año: de 5.045 en enero de 2026 a 10.740 en agosto.
- Entre enero y agosto de 2026 se explotaron **141 vulnerabilidades**, más que las 127 de todo 2025.
- Los *zero-days* explotados pasaron de un promedio de 8 por mes en 2025 a 11 por mes en 2026.
- La mitad de las fallas descubiertas con IA terminan en **ejecución remota de código**, contra el 26 % del resto. La IA no está encontrando fallas menores: encuentra justo lo que un atacante quiere.

Ahora, para no caer en el alarmismo: según el mismo informe, solo el **0,23 %** de las vulnerabilidades publicadas en 2026 se vio explotado de verdad, más o menos una de cada 431. O sea, el problema no es que todo lo que se publica se explote. El problema es que **lo que sí se explota, se explota cada vez más rápido**.

El ejemplo que da Google es clarísimo: **CVE-2026-1731**, una inyección de comandos sin autenticación en los productos de acceso remoto de BeyondTrust, que encontró un agente de IA de investigación (Hacktron). A los **cuatro días** de publicada, un grupo ya la estaba explotando. A los **siete días**, eran seis grupos distintos, que escalaron privilegios, se llevaron datos e instalaron malware y mineros de criptomonedas[^2].

Cuatro días. Pensemos cuánto tardan nuestras empresas u organizaciones en aprobar una ventana de mantenimiento.

## La IA también está del otro lado

Que la IA encuentre bugs es una parte. La otra es que ya se está usando para **atacar**.


### Nueve organismos mexicanos, un solo operador

Más cerca nuestro, el informe anual de seguridad de IA de Check Point, publicado en julio, menciona el caso de **un único operador que comprometió nueve organismos del gobierno de México** usando dos herramientas comerciales a la vez: Claude Code para entrar y explorar las redes, y GPT-4.1 para analizar los datos robados y decidir los pasos siguientes. En total, **5.317 comandos ejecutados por IA** en 34 sesiones de ataque[^4][^5]. Check Point atribuye esos detalles a informes de la industria, así que conviene tomarlos como reportados y no como confirmados al cien por ciento.

Hay un dato de esa cobertura que me pegó fuerte como administradora de sistemas: en los incidentes analizados, **las víctimas no detectaron nada con sus propios controles**. Se supo por errores de los atacantes o porque los proveedores de IA estaban monitoreando su plataforma[^5].

Y, también según Check Point, la IA ya puede convertir una vulnerabilidad recién publicada en un exploit funcional **en cuestión de horas**, cuando antes llevaba semanas[^4].

### PHP2Shell, otra vez

Y para cerrar el círculo: PHP2Shell, la crisis de esta semana, también tiene IA en el medio. La primera falla la reportaron investigadores de Calif junto con OpenAI[^6]. Bugs que estuvieron **décadas** escondidos en el código de PHP salieron a la luz con ayuda de un modelo. Esta vez lo encontraron los buenos primero. No siempre va a ser así.

## Entonces, ¿estamos perdidos?

No. La misma herramienta que acelera el ataque acelera la defensa. Anthropic, en su propio informe, lo dice sin vueltas: recomienda a los equipos de seguridad que **experimenten aplicando la IA para defenderse**, en la automatización del SOC, la detección de amenazas, la evaluación de vulnerabilidades y la respuesta a incidentes[^3].

Y ya hay iniciativas grandes en esa línea. OpenAI lanzó en junio **Patch the Planet**, junto con Trail of Bits, para buscar fallas con IA en proyectos open source críticos como cURL, Python, Go o Sigstore. Lo interesante es el enfoque: ingenieros de seguridad revisan cada hallazgo antes de que llegue a los mantenedores, y la idea es entregar **parches probados**, no una pila más de reportes para que voluntarios agotados tengan que revisar[^7].

Desde nuestro lugar, el de quienes mantenemos servidores andando, hay cosas muy concretas con las que la IA nos puede dar una manito:

- **Leer logs que nadie lee.** Pasarle un recorte de `journalctl`, del `access.log` o de `auth.log` y preguntarle qué ve raro es un buen primer filtro. No reemplaza a un SIEM, pero ayuda muchísimo a quien no tiene uno.
- **Revisar configuraciones.** Un `sshd_config`, un `nginx.conf`, las reglas de `nftables`, un `docker-compose.yml`. Pedirle que lo revise con ojo de auditora suele encontrar algo que se te pasó.
- **Ordenar qué patchear primero.** Cuando salen cuarenta avisos en una semana, cruzar tu inventario con lo que se está explotando de verdad y pedir una lista priorizada ahorra horas.
- **Auditar scripts y código propio.** Esos scripts de bash de hace diez años que "andan" y que nadie se anima a tocar.
- **Escribir reglas de detección y *playbooks*.** Reglas de Sigma o de fail2ban, procedimientos de respuesta, *checklists* de *hardening*.

Eso sí, con dos reglas que para mí son innegociables:

1. **No pegarle secrets a una IA externa.** Antes de compartir un log o una configuración, conviene quitar contraseñas, tokens, claves privadas e IPs internas que no se quieran divulgar. Si se trabaja con datos sensibles, evalúa seriamente la implementación de modelos locales (tipo edge, uno por cada 3/4 personas; parece una inversión enorme, pero hoy equipos como la DGX Spark de NVIDIA son súper amortizables).
2. **Verificá todo lo que te diga.** Los modelos alucinan: Anthropic contó que, usado en un ataque real, su propio modelo llegó a inventar credenciales y a presentar como secreta información que era pública[^3]. Si puede alucinar eso, también puede alucinar que tu configuración está bien. La IA nos acerca al problema, pero quienes decidimos somos nosotros.

## Las nuevas buenas prácticas (que en realidad son las de siempre, más rápido)

### 1. Patchear según lo que se explota, no según la lista

Con el doble de CVE por mes, patchear todo en orden es imposible. Google recomienda dejar el patcheo masivo sin prioridades y pasar a un *triage* guiado por inteligencia de amenazas[^2]. En la práctica: seguí el catálogo [KEV de CISA](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) (vulnerabilidades que se sabe que se están explotando) y los avisos de tu CERT, y lo que esté ahí va primero, sin discusión.


### 2. Achiquemos el tiempo de reacción

Si el exploit tarda cuatro días, nuestro proceso no puede tardar tres semanas. Actualizaciones de seguridad automáticas con `unattended-upgrades` o `dnf-automatic`, `needrestart` para reiniciar lo que haga falta, y un procedimiento de parche de emergencia acordado **antes** de la emergencia: quién aprueba, quién ejecuta y cuándo se bajan servicios.

### 3. Lo que da a internet es lo más urgente

Casi todos los casos que conté empiezan en algo expuesto: un acceso remoto, un servidor web, un panel de administración. Hacé la lista de todo lo que da a internet, reducila al mínimo y poné lo que quede detrás de VPN o de un proxy con autenticación. Los equipos edge (VPN, firewalls, *appliances* de acceso remoto) son los favoritos de los atacantes.

### 4. Inventario, inventario, inventario

No podemos patchear lo que no sabemos que existe. Y ahora el inventario tiene que incluir algo nuevo: **la IA que usa nuestra organización**.

### 5. Tratá a tus herramientas de IA como infraestructura crítica

Este punto es nuevo y creo que es el que más se subestima. Según Google, entre enero de 2025 y agosto de 2026 se registraron **2.076 vulnerabilidades en software relacionado con IA**. Solo en 2026 hubo 212 en servidores de inferencia como vLLM, Ollama o LiteLLM, y casi una cuarta parte venía de **APIs sin autenticación** o de SSRF[^2].

Traducido: ese Ollama que alguien levantó "para probar" escuchando en `0.0.0.0` es una puerta abierta. Así que:

- Los servidores de modelos van detrás de autenticación y **nunca** expuestos directo a internet.
- Las **claves de API** de los proveedores de IA son un objetivo en sí mismo, porque permiten operar como un usuario legítimo[^5]. Guardalas en un gestor de secretos, rotalas y poneles límites de gasto.
- Los **agentes** (Claude Code, Codex, los servidores MCP, los *frameworks* tipo Flowise o Langflow) tienen que correr con **mínimo privilegio**: sin acceso a producción si no lo necesitan, con tokens acotados y registro de lo que ejecutan.
- Ojo con la **inyección de *prompts***: Check Point detectó que los *payloads* largos y maliciosos de este tipo se multiplicaron por cinco entre marzo y mayo de este año[^4]. Un agente que lee mails, tickets o páginas web puede recibir órdenes de un atacante escondidas en ese contenido.

### 6. Zero trust y segmentación

Asumamos que en algún momento alguien va a entrar. Lo que importa es cuánto puede moverse una vez adentro. Mínimo privilegio, servicios con usuarios propios, redes segmentadas y nada de "todo ve a todo" en la red interna.

### 7. MFA resistente al phishing

Con IA, los correos de phishing ya no tienen faltas de ortografía y los *deepfakes* engañan: según Check Point, revisores entrenados identificaron bien solo alrededor del **41 %** de las caras generadas con IA[^4]. Llaves FIDO2 o *passkeys* para todo lo crítico, y verificación por otro canal para cualquier pedido raro, aunque "suene" a tu jefa.

### 8. Que nos avise nuestro monitoreo, no el atacante

Si las víctimas mexicanas se enteraron por los errores del atacante, el problema no fue solo la intrusión: fue la falta de visibilidad. Logs centralizados y fuera del servidor, alertas sobre procesos y conexiones salientes inusuales, y revisión periódica. Acá la IA también puede ayudar a resumir y priorizar, pero primero tenemos que tener los datos.

### 9. Backups probados y desconectados

Lo de siempre, que nunca está de más: copias fuera del alcance de quien entre a nuestros servidores, y restauraciones probadas. Si todo lo demás falla, es lo que nos salva.

## Para cerrar

Después de leer todo esto, la conclusión a la que llegué es que la IA no inventó ningún problema nuevo. Las fallas ya estaban, los servidores sin patchear ya estaban, y las APIs abiertas a internet también. Lo que cambió es la **velocidad**: lo que antes llevaba semanas ahora lleva horas, y lo que antes requería un equipo ahora lo hace una sola persona con dos suscripciones.

El otro día, en una reunión técnica en la que estábamos analizando riesgos, se lo dije a uno de mis jefes: "Esta es la nueva normalidad. Vamos a tener que acostumbrarnos a salir a apagar incendios cada vez más rápido". Pero también le dije algo que sigo creyendo: en el fondo, esto nos obliga a hacer lo que veníamos postergando. Actualizar los sistemas y reducir la **deuda técnica** que acumulamos durante años y años.

Porque si lo pensamos, casi todos los casos de este post se aprovechan de lo mismo: el servidor con la versión vieja "porque anda", el servicio expuesto que alguien abrió para una prueba, el script que nadie entiende y que nadie tampoco se anima a tocar. El arreglo provisorio que queda ahí para siempre ya no va más. Cuando un exploit tarda cuatro días en aparecer, cada atajo que tomamos es una puerta que le dejamos abierta a alguien con una IA y tiempo libre. Ahora hay que actuar de manera responsable de verdad.

Por eso creo que nuestro trabajo no desaparece, sino que se vuelve más importante. Las buenas prácticas de siempre pasan a ser el piso, y la IA puede ser la herramienta que nos permita sostenerlas al ritmo que se necesita. Usémosla para leer los logs, revisar las configuraciones y priorizar los parches, pero sin perder el criterio propio ni el ojo crítico. Al fin y al cabo, alguien tiene que seguir sosteniendo el matafuegos.

---

[^1]: Google Cloud / GTIG, [Vulnerability Discovery and Exploitation Trends in the AI Era](https://cloud.google.com/blog/topics/threat-intelligence/vulnerability-discovery-and-exploitation-trends-in-the-ai-era).
[^2]: Help Net Security, [The vulnerabilities AI finds are the ones attackers want](https://www.helpnetsecurity.com/2026/10/01/google-ai-discovered-vulnerabilities-remote-code-execution/), 1 de octubre de 2026.
[^3]: Anthropic, [Disrupting the first reported AI-orchestrated cyber espionage campaign](https://www.anthropic.com/news/disrupting-AI-espionage), 13 de noviembre de 2025.
[^4]: Check Point Research, [AI has crossed from assistant to operator](https://www.checkpoint.com/es/press-releases/check-point-research-ai-has-crossed-from-assistant-to-operator-rewriting-the-rules-of-autonomous-ai-cyber-attack-and-defense/) (comunicado sobre el *AI Security Report 2026*), 13 de julio de 2026.
[^5]: Infobae, [Un único hacker usando IA comercial comprometió la ciberseguridad de 9 agencias de Gobierno](https://www.infobae.com/tecno/2026/05/25/un-unico-hacker-usando-ia-comercial-comprometio-la-ciberseguridad-de-9-agencias-de-gobierno/), 25 de mayo de 2026.
[^6]: France 24, [Cinco claves de la crisis cibernética de PHP que encendió alarmas a nivel global](https://www.france24.com/es/ciencia-y-tecnolog%C3%ADas/20261021-cinco-claves-de-la-crisis-cibern%C3%A9tica-de-php-que-encendi%C3%B3-alarmas-a-nivel-global), 21 de octubre de 2026.
[^7]: CSO Online, [OpenAI rolls out AI-led push to fix open-source software flaws](https://www.csoonline.com/article/4188321/openai-rolls-out-ai-led-push-to-fix-open-source-software-flaws.html).
