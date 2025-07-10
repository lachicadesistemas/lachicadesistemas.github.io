---
layout: post
title: "Vulnerabilidad Crítica en sudo permite acceso root a usuarios locales sin sudo en Linux"
subtitle: "Ya existen patches para las distros principales"
date: 2025-07-09
layout: post
author: Alexia
tags: [seguridad, ciberseguridad, linux, vulnerabilidades, sudo, cve, sysadmin]
---

Investigadores de ciberseguridad han revelado dos fallas de seguridad en la utilidad de línea de comandos **Sudo** para Linux y sistemas operativos tipo Unix que podrían permitir a atacantes locales escalar privilegios hasta root en máquinas vulnerables.

## Descripción breve de las vulnerabilidades

- **CVE-2025-32462** (puntuación CVSS: 2.8)  
  Sudo anterior a la versión 1.9.17p1, cuando se utiliza con un archivo sudoers que especifica un host que no es ni el host actual ni `ALL`, permite que los usuarios listados ejecuten comandos en máquinas no previstas.

- **CVE-2025-32463** (puntuación CVSS: 9.3)  
  Sudo anterior a la versión 1.9.17p1 permite que usuarios locales obtengan acceso root porque el archivo `/etc/nsswitch.conf` de un directorio controlado por el usuario es utilizado junto con la opción `--chroot`.

---

## ¿Qué es Sudo?

**Sudo** es una herramienta de línea de comandos que permite a usuarios con bajos privilegios ejecutar comandos como otro usuario, como por ejemplo el superusuario (root). El objetivo es aplicar el principio de menor privilegio, permitiendo realizar acciones administrativas sin necesidad de elevar permisos de forma permanente.

La configuración se realiza mediante el archivo `/etc/sudoers`, donde se define quién puede ejecutar qué comandos, como qué usuarios, en qué máquinas y con reglas adicionales, como si se requiere o no contraseña para ciertos comandos.

---

## Detalles técnicos de las vulnerabilidades

El investigador de Stratascale, **Rich Mirch**, quien fue responsable de descubrir y reportar las fallas, señaló que **CVE-2025-32462** logró pasar desapercibida por más de 12 años. Su raíz está en la opción `-h` (host) de Sudo, la cual permite listar los privilegios sudo de un usuario para un host diferente, funcionalidad habilitada en septiembre de 2013.

Sin embargo, el bug identificado permitió ejecutar cualquier comando permitido para el host remoto también en la máquina local, si se ejecutaba Sudo con la opción de host apuntando a un host remoto no relacionado.

> "Esto afecta principalmente a sitios que utilizan un archivo sudoers común distribuido en múltiples máquinas", explicó Todd C. Miller, mantenedor del proyecto Sudo.  
> "Los sitios que usan sudoers basados en LDAP (incluyendo SSSD) también se ven impactados."

Por otro lado, **CVE-2025-32463** aprovecha la opción `-R` (chroot) de Sudo para ejecutar comandos arbitrarios como root, incluso si no están listados en el archivo sudoers. Es considerada una vulnerabilidad crítica.

> "La configuración por defecto de Sudo es vulnerable", indicó Mirch.  
> "Aunque la vulnerabilidad involucra la función chroot de Sudo, no requiere que existan reglas específicas en sudoers para el usuario. Por lo tanto, cualquier usuario local sin privilegios podría escalar privilegios a root si está instalada una versión vulnerable."

En otras palabras, esta falla permite a un atacante engañar a Sudo para que cargue una biblioteca compartida arbitraria, creando un archivo `/etc/nsswitch.conf` bajo el directorio raíz especificado por el usuario, y potencialmente ejecutar comandos maliciosos con privilegios elevados.

Todd C. Miller adelantó que la opción chroot será eliminada completamente en una versión futura de Sudo, ya que soportar un directorio raíz especificado por el usuario "es propenso a errores".

---

## Distribuciones afectadas y solución

Tras la divulgación responsable del 1 de abril de 2025, las vulnerabilidades fueron corregidas en **Sudo versión 1.9.17p1** (lanzada a fines de junio de 2024). Diversas distribuciones Linux publicaron alertas ya que Sudo viene instalado por defecto en la mayoría de ellas:

- **CVE-2025-32462:** AlmaLinux 8, AlmaLinux 9, Alpine Linux, Amazon Linux, Debian, Gentoo, Oracle Linux, Red Hat, SUSE y Ubuntu.
- **CVE-2025-32463:** Alpine Linux, Amazon Linux, Debian, Gentoo, Red Hat, SUSE y Ubuntu.

Se recomienda a todos los usuarios y administradores de sistemas **aplicar los parches correspondientes y asegurarse de tener Sudo actualizado**.

---

**Referencias:**  
- [CVE-2025-32462 - MITRE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-32462)  
- [CVE-2025-32463 - MITRE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-32463)


Fuente: __The Hacker News__
