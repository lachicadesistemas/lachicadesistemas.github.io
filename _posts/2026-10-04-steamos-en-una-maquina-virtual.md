---
layout: post
title: "Instalar SteamOS en una máquina virtual"
subtitle: "y qué hacer cuando todo queda en negro"
share-img: /assets/img/steamdeck.jpg
author: Alexia
tags: [linux, gaming, valve, steam, steamos, qemu, kvm, vm, virtualizacion]
---

Hace rato que tenía ganas de probar SteamOS fuera de una Steam Deck. No para jugar en serio, sino para chusmear cómo está armado por dentro: el esquema de particiones A/B, el `/etc` en overlay, el modo juego con gamescope... esas cosas que a una sysadmin le dan 
curiosidad.

Así que lo instalé en una máquina virtual con **QEMU/KVM** sobre **Debian 13**. La instalación fue relativamente sencilla, pero al bootear el sistema instalado me encontré con una linda **pantalla negra**. Ni en la ventana de QEMU ni por VNC se veía nada.

Paso a explicar cómo lo instalé, por qué queda en negro y cómo lo solucioné.

Algo a considerar es que se van a necesitar 2 discos, uno para la instalación y otro para donde se instalará el sistema. Es vueltero steamOS? Si. Pero también es razonable entender que no es un sistema universal sino que está muy cortado a medida para la 
steamDeck, asi que todos estos hacks los hice no por que sea malo, sino por que estamos intentando correrlo en una plataforma para la cual no fue diseñado.

### Paso 1: Instalar Dependencias

```
sudo apt install qemu-system-x86 qemu-utils ovmf
```

Necesitamos QEMU, las herramientas para manejar discos `qcow2` y **OVMF**, que es el firmware UEFI para la VM (SteamOS solo bootea por UEFI).

### Paso 2: Descargar la imagen de SteamOS

La imagen oficial es la de **recuperación de la Steam Deck**, y se descarga desde la página de Valve:

[https://store.steampowered.com/steamos/download?ver=steamdeck](https://store.steampowered.com/steamos/download?ver=steamdeck)

Viene comprimida en `.bz2`. La descomprimimos y la convertimos a `qcow2` para usarla como disco "live":

```
bunzip2 -k steamdeck-oobe-repair-*.img.bz2
qemu-img convert -O qcow2 steamdeck-oobe-repair-*.img steamdeck-live.qcow2
```

### Paso 3: Crear el disco y las variables UEFI

Creamos el disco donde se va a instalar SteamOS (64 GB alcanzan para probar) y una copia propia de las variables UEFI, que es donde OVMF guarda el orden de booteo:

```
qemu-img create -f qcow2 steamos-target.qcow2 64G
cp /usr/share/OVMF/OVMF_VARS_4M.fd OVMF_VARS_steamos.fd
```

### Paso 4: Bootear el live e instalar

Este script bootea la imagen live como primer disco (`vda`) y el disco vacío como segundo (`vdb`):

```bash
#!/bin/bash
# qemu-steamos-live.sh
qemu-system-x86_64 \
  -enable-kvm -cpu host -smp 4 -m 8192 \
  -machine q35 \
  -drive if=pflash,format=raw,readonly=on,file=/usr/share/OVMF/OVMF_CODE_4M.fd \
  -drive if=pflash,format=raw,file=./OVMF_VARS_steamos.fd \
  -drive file=steamdeck-live.qcow2,if=none,id=live,format=qcow2 \
  -device virtio-blk-pci,drive=live,bootindex=0 \
  -drive file=steamos-target.qcow2,if=none,id=target,format=qcow2 \
  -device virtio-blk-pci,drive=target \
  -vga virtio \
  -display gtk \
  -serial stdio \
  -device qemu-xhci -device usb-tablet \
  -netdev user,id=n0,hostfwd=tcp::2222-:22 \
  -device virtio-net-pci,netdev=n0
```

El live arranca en el escritorio Plasma, y **este sí se ve sin problemas**. Desde ahí se hace la instalación en el segundo disco (`vdb`).

Acá hay una trampa: el script de instalación que viene en la imagen (el de "Re-image Steam Deck") **tiene el disco fijo en `/dev/nvme0n1`**, y en la VM nuestro disco es `/dev/vdb`. Así que no sirve. En su lugar usé [steamos-repair-device-custom](https://github.com/InnoVision-Games/steamos-repair-device-custom), un fork del script de Valve que te pregunta el disco y las particiones.

Abrimos **"Terminal with repair options"** desde el escritorio del live y ejecutamos:

```
curl -LO https://raw.githubusercontent.com/InnoVision-Games/steamos-repair-device-custom/dde6a8d6593e92643fd844a1a1ce04056f901392/repair_device_custom.sh
chmod +x repair_device_custom.sh
sudo ./repair_device_custom.sh all
```

(El link apunta a un commit específico, el que usé yo, así se descarga exactamente el mismo script. Antes de correr con `sudo` algo bajado de internet, siempre conviene leerlo: este no descarga nada ni hace cosas raras, es el script de Valve con preguntas.)

El script va abriendo ventanitas con preguntas. **Ojo, porque los valores que trae por defecto no sirven para la VM:**

- **Disco:** `/dev/vdb`
- **Sufijo:** dejalo **vacío**. Viene con `p`, que es para discos NVMe (`nvme0n1p1`). Los discos virtio no lo usan (`vdb1`).
- **Índices de las particiones:** vienen del 5 al 12, hay que cambiarlos por estos:

| Partición       | Índice |
|-----------------|--------|
| ESP (EFI System)| 1      |
| efi-A           | 2      |
| efi-B           | 3      |
| rootfs-A        | 4      |
| rootfs-B        | 5      |
| var-A           | 6      |
| var-B           | 7      |
| home            | 8      |

Después te avisa que no es un disco NVMe (está bien, aceptamos) y te pide confirmación antes de borrar todo el disco. Como es el disco vacío de la VM, adelante.

Al terminar, `vdb` queda con el esquema típico de SteamOS: ESP, dos particiones `efi`, dos `rootfs`, dos `var` (los slots **A** y **B**) y una `home` grande.

```
vdb      64G
|-vdb1  256M vfat   esp
|-vdb2   64M vfat   efi-A
|-vdb3   64M vfat   efi-B
|-vdb4    5G btrfs  rootfs-A
|-vdb5    5G btrfs  rootfs-B
|-vdb6  256M ext4   var-A
|-vdb7  256M ext4   var-B
`-vdb8 53.1G ext4   home
```

### Paso 5: Bootear SteamOS... y pantalla negra

Apagamos el live y booteamos solo el disco instalado. Y acá viene el problema: el firmware carga el bootloader de SteamOS, el sistema arranca... y **la pantalla queda completamente negra**.

Como no se ve nada, tampoco hay forma de abrir una terminal para ver qué está pasando. Así que toca hacer lo que hacemos los sysadmins de toda la vida: **bootear desde un live y revisar el disco desde afuera**.

### Paso 6: Diagnóstico desde el live

Volvemos a bootear con `qemu-steamos-live.sh` (live + disco instalado). En el live abrimos Konsole y habilitamos SSH para poder trabajar cómodas desde el host:

```
passwd                       # el usuario deck del live no tiene contraseña
sudo systemctl start sshd
```

Desde el host nos conectamos por el puerto que redirige QEMU:

```
ssh -p 2222 deck@localhost
```

Montamos las particiones del disco instalado **en solo lectura**:

```
sudo mkdir -p /mnt/t/{rootA,rootB,varA,varB,home}
sudo mount -o ro /dev/vdb4 /mnt/t/rootA
sudo mount -o ro /dev/vdb5 /mnt/t/rootB
sudo mount -o ro /dev/vdb6 /mnt/t/varA
sudo mount -o ro /dev/vdb7 /mnt/t/varB
sudo mount -o ro /dev/vdb8 /mnt/t/home
```

Un detalle de SteamOS: los logs no están en la partición `var`, sino en la `home`, dentro de `.steamos/offload/var/log`. Así que leemos el journal del último arranque así:

```
J=/mnt/t/home/.steamos/offload/var/log/journal
sudo journalctl -D $J --list-boots
sudo journalctl -D $J -b -1 -p warning
```

Y ahí está el culpable:

```
systemd-coredump: Process 8052 (gamescope) of user 1000 dumped core.
  ...
  #4  libVkLayer_FROG_gamescope_wsi_x86_64.so
  #5  libvulkan.so.1
  #6  vkCreateInstance (libvulkan.so.1)
  #7  /usr/bin/gamescope
```

**gamescope**, el compositor del modo juego de SteamOS, **necesita Vulkan**. La GPU virtual de QEMU no lo tiene, entonces gamescope muere al intentar inicializarlo, systemd lo vuelve a lanzar, vuelve a morir... y nosotras mirando una pantalla negra.

Probé darle aceleración 3D a la VM con `virtio-vga-gl` y Venus (Vulkan paravirtualizado), pero no alcanzó: sigue en negro. Una Steam Deck o una PC con GPU AMD no tienen este problema, porque tienen Vulkan de verdad.

### Paso 7: Encontrar el slot activo

SteamOS tiene dos copias del sistema (A y B) y bootea una de las dos. Antes de tocar nada hay que saber cuál es la activa. Lo vemos en la línea de comandos del kernel, que también queda en el journal:

```
sudo journalctl -D $J -b -1 -k | grep -m1 "Command line"
sudo journalctl -D $J -b -1 | grep -m1 "BTRFS: device label rootfs"
```

En mi caso montaba `rootfs-B`, así que **el slot activo era el B**.

### Paso 8: La solución, arrancar en el escritorio

Si el modo juego no puede arrancar, hacemos que arranque directo en el **escritorio Plasma**, que funciona sin Vulkan (de hecho, es lo que usa el live).

En SteamOS el `/etc` es un **overlay**: la parte de solo lectura está en `rootfs` y la parte escribible en la partición `var` del slot activo, en `lib/overlays/etc/upper/`. Ahí creamos la configuración de autologin de SDDM. Es el mismo archivo que modifica `steamos-session-select`:

```
sudo mount -o remount,rw /mnt/t/varB
sudo mount -o remount,rw /mnt/t/home

U=/mnt/t/varB/lib/overlays/etc/upper
sudo mkdir -p $U/sddm.conf.d
printf "[Autologin]\nSession=plasma.desktop\n" | sudo tee $U/sddm.conf.d/zz-steamos-autologin.conf
```

De paso habilitamos SSH en el sistema instalado, así si algo vuelve a quedar en negro podemos entrar sin depender de la pantalla:

```
sudo mkdir -p $U/systemd/system/multi-user.target.wants
sudo ln -s /usr/lib/systemd/system/sshd.service \
  $U/systemd/system/multi-user.target.wants/sshd.service
```

El usuario `deck` del sistema instalado **no tiene contraseña**, y SSH no acepta contraseñas vacías. Así que agregamos nuestra clave pública:

```
sudo install -d -m700 -o1000 -g1000 /mnt/t/home/deck/.ssh
sudo install -m600 -o1000 -g1000 ~/.ssh/authorized_keys /mnt/t/home/deck/.ssh/authorized_keys
```

(En el live, `~/.ssh/authorized_keys` ya tiene la clave del host si la usamos para entrar. Si entraste con contraseña, copiá ahí tu `id_ed25519.pub`.)

Desmontamos todo y apagamos el live:

```
sync
sudo umount /mnt/t/*
sudo systemctl poweroff
```

### Paso 9: Bootear SteamOS (ahora sí)

El script para el uso de todos los días:

```bash
#!/bin/bash
# qemu-steamos.sh
qemu-system-x86_64 \
  -enable-kvm -cpu host -smp 4 -m 8192 \
  -machine q35 \
  -drive if=pflash,format=raw,readonly=on,file=/usr/share/OVMF/OVMF_CODE_4M.fd \
  -drive if=pflash,format=raw,file=./OVMF_VARS_steamos.fd \
  -drive file=steamos-target.qcow2,if=none,id=target,format=qcow2 \
  -device virtio-blk-pci,drive=target,bootindex=0 \
  -vga virtio \
  -display gtk \
  -serial stdio \
  -device intel-hda -device hda-duplex \
  -device qemu-xhci -device usb-tablet \
  -netdev user,id=n0,hostfwd=tcp::2222-:22 \
  -device virtio-net-pci,netdev=n0
```

Ojo con el `bootindex=0` en el disco. Sin eso, después de haber booteado el live, la VM me caía directo en la **shell de UEFI**: al usar `bootindex` en el live, OVMF reescribió el orden de booteo guardado en `OVMF_VARS_steamos.fd` y dejó afuera la entrada de SteamOS. Marcando el disco con `bootindex=0`, OVMF lo prioriza y bootea bien.

Y ahora sí: **SteamOS arranca en el escritorio Plasma**, con los íconos de Steam y de "Return to Gaming Mode".

![SteamOS corriendo en una VM de QEMU/KVM, con Steam abierto y neofetch en Konsole]({{ '/assets/img/steamdeck.jpg' | relative_url }})

### Algunas advertencias

- **No toques "Return to Gaming Mode".** Te lleva de nuevo a gamescope, que va a volver a crashear, y la pantalla queda otra vez en negro. Si te pasa, entrá por SSH y volvé al escritorio:

  ```
  ssh -p 2222 deck@localhost
  steamos-session-select plasma
  ```

- **Steam funciona, pero lento.** Sin aceleración 3D la interfaz se dibuja por software. Para loguearse, mirar la tienda y descargar juegos alcanza. Para jugar juegos 3D, no.
- **Ponele contraseña a `deck`** con `passwd` desde Konsole antes de usar `sudo`.
- **Los cambios en `/etc` viven en el overlay del slot activo.** Una actualización de SteamOS cambia de slot, y algunas cosas de configuración pueden no sobrevivir. Lo que tengas en `/home` sí se mantiene.

### Conclusión

SteamOS en una VM funciona, pero el modo juego depende de Vulkan, y sin una GPU real (o *passthrough* de una) no hay forma de que gamescope arranque. La buena noticia es que el escritorio Plasma anda perfecto y permite explorar el sistema, usar Steam y entender cómo está armado.

Y si algo queda en negro, ya saben: live, montar el disco, leer el journal. Lo de siempre.

Y si les interesa saber cómo llegamos hasta acá, les dejo un video que hice en mi canal sobre la historia de Steam y cómo Gabe Newell salvó al gaming en Linux:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/wmWrwL9-Nco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

*¿Lo probaron en otra plataforma de virtualización? ¿Alguien logró hacer andar el modo juego con Venus o con passthrough? Se agradecen comentarios.*
