---
layout: post
title: OpenSuse Elimina Deepin Desktop de sus repositorios
subtitle: Por fallas de seguridad
date: 2025-05-08
share-img: /assets/img/opensuse.png
categories: [seguridad, tls, opensuse, telemetria, privacidad, deepin, deepin-desktop, ciberseguridad]
author: Alexia
---


# El entorno Deepin y su historia en openSUSE

El entorno de escritorio Deepin Desktop Environment (DDE) es parte de la distribución Deepin Linux, destacándose por su enfoque en la usabilidad, una presentación gráfica pulida y soporte 
para el idioma chino. Además, está disponible en varias distribuciones de Linux, incluyendo openSUSE.

Sin embargo, recientemente se detectó una violación de políticas en el empaquetado de Deepin para openSUSE, lo que llevó a la decisión de eliminar los paquetes de Deepin de las 
distribuciones de openSUSE por el momento.

## ¿Cuál fue la violación?

El equipo de seguridad de SUSE aplica una serie de restricciones de empaquetado en openSUSE. Entre ellas, cualquier archivo de configuración de servicio D-Bus o políticas de Polkit debe pasar 
por una revisión de seguridad. Una vez aprobado, el paquete se puede enviar al proyecto openSUSE:Factory (base de la versión rolling release Tumbleweed).

![Licencia deepin]({{ '/assets/img/deepin-feature-enable.png' | relative_url }})
> La licencia de deepin desktop en OpenSuse

Desde 2017, el empaquetador de Deepin ha trabajado para incluir componentes, y algunos lograron ser aprobados. Sin embargo, muchos otros quedaron estancados por no cumplir con los requisitos.

Cansado de esperar, el empaquetador creó el paquete deepin-feature-enable (introducido en abril de 2021) que incluía un "diálogo de acuerdo de licencia". Este diálogo explicaba que, aunque 
el equipo de seguridad de SUSE tenía dudas, ciertos componentes eran necesarios para el correcto funcionamiento de Deepin. Si el usuario aceptaba, el paquete extraía automáticamente archivos 
D-Bus y Polkit a los directorios del sistema desde tarballs incluidos en otros paquetes. Incluso se sugería ejecutar un script manual para habilitar componentes adicionales.

En la práctica, para el usuario final bastaba con escribir "y" durante la instalación para activar estos componentes no revisados, lo que representa un riesgo de seguridad.

# Historia de revisiones y frustraciones

A lo largo de los años se hicieron numerosos intentos de revisión, pero algunos paquetes clave como deepin-daemon nunca se enviaron para revisión formal. Además, el bug de revisión para el 
administrador de archivos de Deepin lleva abierto desde 2019 sin resultados satisfactorios.

Si bien ofrecer un script manual para habilitar componentes no aprobados es menos grave que hacerlo automáticamente con un diálogo, sigue siendo una práctica cuestionable.

## ¿Cómo seguir utilizando Deepin en openSUSE?

Actualmente, no se recomienda usar Deepin en openSUSE debido a los problemas de seguridad mencionados. Sin embargo, si aún así querés probarlo, podés agregar el repositorio de desarrollo Deepin de 
la siguiente forma:

```sudo zypper ar https://download.opensuse.org/repositories/X11:/Deepin:/Factory/openSUSE_Tumbleweed deepin-factory
sudo zypper ref```

Al refrescar los repositorios, se te mostrará una clave GPG para aceptar:

```Fingerprint: EED7 FE07 D0FC DEF0 E5B4 D4A9 C0DA 4428 1599 EA1E

Nombre: X11:Deepin:Factory OBS Project <X11:Deepin:Factory@build.opensuse.org>

Algoritmo: RSA 2048
```

Es importante verificar la autenticidad de la clave, ya que aceptar paquetes firmados de este repositorio implica confiar en ellos sin la revisión del equipo de seguridad de SUSE ni del equipo de revisión de paquetes de openSUSE.

Para usuarios de openSUSE Leap, asegurate de ajustar la URL del repositorio al correspondiente para tu versión.

## Conclusión

La situación de Deepin en openSUSE es un ejemplo de cómo los atajos para evitar procesos de revisión pueden poner en riesgo la seguridad del ecosistema. Mientras tanto, quienes deseen usar Deepin 
deberán optar explícitamente por un repositorio externo y asumir los riesgos que esto conlleva.

Si te interesa seguir este tema, te recomiendo estar pendiente del blog y los canales oficiales de openSUSE para actualizaciones futuras.


Por *Alexia Michelle*

Fuente: [Security OpenSuse](https://security.opensuse.org/2025/05/07/deepin-desktop-removal.html)
