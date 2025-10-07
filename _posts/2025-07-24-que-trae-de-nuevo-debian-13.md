---
layout: post
title: "¿Qué hay de nuevo en Debian 13 Trixie?"
subtitle: "Novedades, versiones y cambios importantes para sysadmins"
date: 2025-07-24
share-img: /assets/img/debian13-trixie.png
author: Alexia
tags: [debian, sysadmin, novedades, trixie, linux, servidores]
---

> Debian 13 “Trixie” ya tiene fecha confirmada: **9 de agosto de 2025**.  
Después de dos años de desarrollo, el nuevo stable está a punto de ver la luz y viene con varios cambios relevantes tanto para desktop como, sobre todo, para entornos de servidores.

## Resumen rápido de versiones

Debian 13 Trixie trae versiones renovadas de los paquetes más críticos para infraestructura y desarrollo. Acá te dejo un resumen comparando con el anterior “Bookworm”:

| Paquete      | Bookworm/v12 | Trixie/v13  |
|--------------|--------------|-------------|
| **ansible**  | 2.14.3       | 2.19.0      |
| **apache**   | 2.4.62       | 2.4.64      |
| **apt**      | 2.6.1        | 3.0.3       |
| **bash**     | 5.2.15       | 5.2.37      |
| **docker**   | 20.10.24     | 26.1.5      |
| **dpkg**     | 1.21.22      | 1.22.21     |
| **emacs**    | 28.2         | 30.1        |
| **gcc**      | 12.2.0       | 14.2.0      |
| **git**      | 2.39.5       | 2.47.2      |
| **linux**    | 6.1          | 6.12        |
| **mariadb**  | 10.11        | 11.8        |
| **nginx**    | 1.22.1       | 1.26.3      |
| **nodejs**   | 18.13        | 20.19       |
| **openjdk**  | 17.0         | 21.0        |
| **openssh**  | 9.2p1        | 10.0p1      |
| **openssl**  | 3.0          | 3.5         |
| **perl**     | 5.36.0       | 5.40.1      |
| **php**      | 8.2+93       | 8.4+96      |
| **postgres** | 15           | 17          |
| **python3**  | 3.11.2       | 3.13.5      |
| **rsync**    | 3.2.7        | 3.4.1       |
| **ruby**     | 3.1          | 3.3         |
| **rust**     | 1.63.0       | 1.85.0      |
| **samba**    | 4.17.12      | 4.22.3      |
| **systemd**  | 252.36       | 257.7-1     |
| **vim**      | 9.0.1378     | 9.1.1230    |
| ...y más     |              |             |

*¿Querés comparar más paquetes? Mirá los [release notes oficiales](https://www.debian.org/releases/trixie/releasenotes).*

---

## Cambios y novedades clave en Trixie

### apt 3.0: Colores, DEB822 y goodbye apt-key

- **Colores y salidas más claras:** Instalaciones en verde, removals en rojo, etc. Personalizable y con opción para desactivar.
- **Nuevo formato .sources:** Ahora podés convertir tus listas legacy con `apt modernize-sources`.
- **Comando `apt distclean`:** Limpia los archivos cacheados, útil para imágenes base.
- **`apt-key` desaparece:** Ahora la gestión de llaves es 100% vía trusted.gpg.d o por medio de signed-by en las sources.
- **Nuevas opciones:** `--update`, `--snapshot`, opción de mantener X kernels con `APT::NeverAutoRemove::KernelCount`.

> **TIP:** Migrá cuanto antes a `.sources` y reemplazá uso de apt-key para no tener problemas con futuros upgrades.

---

### systemd 257: Nuevas utilidades y cambios en nombres de red

- **Nuevas herramientas:**  
  - `run0`: alternativa a sudo, permite cambiar usuario en forma temporal e interactiva.
  - `systemd-ac-power`, `systemd-confext`, `systemd-vpick`, `varlinkctl` y más.
- **journalctl**: Nuevas opciones para logs, filtrado por unidad, invocation ID, namespaces y más.
- **Cambios en nombres de red:**  
  La nueva naming_scheme toma la información del firmware y puede afectar los nombres de interfaz de red en ciertos equipos (¡probalo antes de migrar si dependés de nombres predictivos!).
- **Múltiples nuevas opciones para systemctl, timedatectl, loginctl, etc.**

---

### Kernel 6.12: Hardware moderno y mejoras en seguridad

- **Soporte extendido de hardware** (CPU, placas de red, NVMe, nuevos drivers).
- **Módulos del kernel ahora comprimidos en xz**.
- **Nuevo driver ntfs3** (reemplaza el viejo ntfs, ahora con RW nativo).
- **Soporte para Device Memory TCP y nuevas opciones de performance en block devices y ftrace**.
- **Mejoras en virtualización, NFS server con RPC-over-TLS, nuevas syscalls y más**.
- **Nuevas herramientas:** `linux-bpf-dev`, `virtme-ng`, `intel-sdsi`.

---

### Paquetes destacados para sysadmins

- **OpenSSH 10.0p1**  
  - **Adiós DSA:** Ya no se soportan claves DSA.
  - **Post-quantum crypto:** Se usa por defecto el algoritmo híbrido `mlkem768x25519-sha256`, resistente a ataques cuánticos.
  - **ssh-agent:** Se puede limpiar con SIGUSR1.
  - **Mejoras en configuración:** Nuevo comando `sshd -G` para debuggear configs y soporte para tags en ssh_config.
- **Podman 5.4.2 y Docker 26.1.5:** Listos para entornos productivos modernos.
- **Ansible 2.19:** Última versión y más módulos compatibles.
- **MariaDB 11.8, PostgreSQL 17, Samba 4.22.3:** Versiones al día, importante para ambientes críticos.
- **Puppet 8:** Disponible aunque upstream aún no da soporte oficial para Trixie, ojo con esto.

---

### Otros cambios a tener en cuenta

- **usrmerge es ahora definitivo:** Todos los sistemas migran a /usr fusionado. Chequeá warnings de dpkg.
- **Paquetes grml:** Ahora están en el repositorio (grml-keyring, grml-hwinfo, grml-paste).
- **Pacemaker:** Los fence-agents ahora están separados por paquete, instalá `fence-agents-all` si necesitas todos.
- **Prometheus:** Stack actualizado y nuevos exporters (dnsmasq, mysqlrouter, pgbackrest, pgbouncer, phpfpm).
- **Vagrant y VirtualBox:** Vagrant sigue en 2.3.7, pero upstream y VirtualBox no ofrecen builds oficiales para Trixie; ojo si dependés de estos.
- **KVM y VirtualBox:** Con kernel 6.12, KVM inicializa la virtualización al cargar el módulo, lo que puede romper VMs en VirtualBox. Hay que desactivar con `kvm.enable_virt_at_load=0` si es necesario.

---

## Lo que ya no está (o cambió de lugar)

- **addpart/delpart, last, lastb, mesg, utmpdump**: Removidos o movidos a otros paquetes (ver release notes).
- **Algunos binarios pasaron a `util-linux-extra`**: ctrlaltdel, mkfs.bfs, fsck.cramfs, mkfs.minix, etc.

---

## Consejos finales para el upgrade

- **Leé los [release notes](https://www.debian.org/releases/trixie/releasenotes) oficiales y la sección “What’s new” antes de migrar.**
- Probá upgrades en entornos de staging antes de ir a producción.
- Chequeá nombres de interfaces de red, uso de DSA en SSH y sources.list legacy.
- Aprovechá las nuevas herramientas: modernizá tus scripts y automatizaciones.

---

¿Ya probaste Debian 13? ¿Tenés dudas sobre cómo migrar?  
¡Dejame tus comentarios o escribime por Threads/Instagram/Mastodon!

---

**Fuentes y recursos**  
- [Debian Release Notes - Trixie](https://www.debian.org/releases/trixie/releasenotes)  
- [What’s new in Debian 13](https://www.debian.org/releases/trixie/amd64/release-notes/ch-whats-new.en.html)  
- [Changelog Kernel 6.12 (Kernelnewbies)](https://kernelnewbies.org/Linux_6.12)  
