---
layout: post
title: "Alerta de Seguridad: Vulnerabilidad 'Dirty Frag' y cómo mitigarla"
date: 2026-05-07 18:05:00 -0300
share-img: /assets/img/dirtyfrag-share.png
author: Alexia
tags: [kernel, exploit, debian, dirtyfrag, sysadmin]
---

Recientemente se ha hecho público un exploit denominado **"Dirty Frag"** que afecta directamente al kernel Linux. En mis pruebas personales con una VM descartable corriendo **Goldendog 2 (Base Debian Trixie)**, he podido confirmar que la vulnerabilidad es real: permite escalar privilegios a la cuenta root sin necesidad de `sudo`, lo cual es extremadamente crítico para cualquier entorno de producción.

Este fallo fue descubierto por Hyunwoo Kim (@v4bel) y el código fuente del PoC está disponible en [GitHub](https://github.com/V4bel/dirtyfrag).

Dirty Frag pertenece a la misma familia que las vulnerabilidades conocidas [Dirty Pipe](https://dirtypipe.cm4all.com/) y [Copy Fail](https://copy.fail/) Pero a diferencia de otros exploits, este **no requiere race conditions** sino que es un bug lógico determinístico, lo que significa que tiene una tasa de éxito muy alta y el sistema no tira _kernel panic_ si el exploit falla.

El ataque encadena dos vulnerabilidades:
- **xfrm-ESP Page-Cache Write** (presente desde 2017)
- **RxRPC Page-Cache Write** (presente desde 2023)

Ambas permiten escrituras arbitrarias en la caché de páginas del kernel, sobrescribiendo archivos de sistema que deberían ser de solo lectura. La combinación de las dos variantes hace que se cubran mutuamente los puntos ciegos: en sistemas Debian/Ubuntu/GoldenDog donde la creación de namespaces sin privilegios está bloqueada por AppArmor, entra en juego la variante RxRPC (que estas distros cargan por defecto). En las demás funciona la variante ESP.

### El Riesgo

Un usuario con acceso limitado al sistema puede compilar y ejecutar el exploit y obtener una shell con root sin tener sudo:

Ejecuté el exploit en una VM de pruebas corriendo **Goldendog 2** (Base Debian Trixie) con mi user normal (`alexia`) y me pude pasar a la cuenta **root** sin sudo.

![Exploit Dirty Frag funcionando: root obtenido desde usuario alexia](/assets/img/dirtyfrag-exploit-root.png)

Como pueden observar, antes de ejecutar el exploit, `whoami` devuelve `alexia`. Después de correr `./exp`, la shell escala y `whoami` devuelve `root`.


## La mitigación funciona (Pero Ojo!)

Verifiqué que la mitigación funciona correctamente. Tras aplicar el workaround y reiniciar, el exploit devuelve `dirtyfrag: failed (rc=1)` y el sistema permanece seguro:

![Exploit fallando tras aplicar la mitigación](/assets/img/dirtyfrag-failed.png)

Es importante reiniciar luego de aplicar la mitigación para que no se carguen los módulos. 

Si administran servers con usuarios locales, containers o entornos compartidos, la acción es urgente. La vulnerabilidad está presente en la vasta mayoría de las distros:

- Ubuntu
- RHEL 10.1 / AlmaLinux 10 / CentOS Stream 10
- openSUSE Tumbleweed
- Fedora 44
- Debian 12, 13
- Goldendog Linux 2 (Incluyendo el kernel *85 con el fix de Copy Fail)

Dado que **no existe parche disponible** en ninguna distribución al momento de publicar esta nota (el embargo fue roto prematuramente), la única mitigación disponible es deshabilitar los módulos del kernel que el exploit utiliza: `esp4`, `esp6` y `rxrpc`.

## Mitigar

Ejecutar el siguiente comando **como root**:

```bash
sh -c "printf 'install esp4 /bin/false\ninstall esp6 /bin/false\ninstall rxrpc /bin/false\n' > /etc/modprobe.d/dirtyfrag.conf; rmmod esp4 esp6 rxrpc 2>/dev/null; true"
```

Esto crea el archivo `/etc/modprobe.d/dirtyfrag.conf` que bloquea la carga de esos módulos.

![Aplicando la mitigación y verificando el contenido del archivo de configuración](/assets/img/dirtyfrag-mitigacion.png)

#### 2. ⚠️ IMPORTANTE: Reiniciar el servidor

Como mencioné antes, la mitigación **solo es efectiva tras reiniciar**. Si los módulos ya están cargados en memoria, el exploit sigue funcionando por mas que hayan aplicado la mitigación/fix. El reinicio garantiza que, al arrancar, el kernel no cargue esos módulos.

#### 3. Verificar tras el reinicio

Una vez que el sistema vuelva a estar en línea, verificá que los módulos no estén cargados:

```bash
lsmod | grep -E 'esp4|esp6|rxrpc'
```

Si el comando no devuelve ninguna línea, la mitigación está activa.

### ¿Qué pasa con Copy Fail?

Importante aclaración: si ya se había aplicado la mitigación de Copy Fail (bloquear `algif_aead`), **tu sistema igualmente sigue siendo vulnerable a Dirty Frag**. La variante ESP de este exploit funciona independientemente de si `algif_aead` está bloqueado. Necesitás aplicar la mitigación específica descripta arriba.

### Conclusión

Dirty Frag es una vulnerabilidad seria, con un PoC público funcional, sin parche disponible y con una ventana de afectación de casi 9 años en el kernel Linux. La mitigación es sencilla y toma menos de un minuto. **Aplicala ahora y reiniciá tus sistemas.**

Seguí el repositorio oficial para estar al tanto de los parches cuando estén disponibles: [https://github.com/V4bel/dirtyfrag](https://github.com/V4bel/dirtyfrag)

Espero que les resulte de utilidad para mantener a sus sistemas seguros.

- Alexia.