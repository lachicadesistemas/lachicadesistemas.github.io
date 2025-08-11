---
title: "El monitoreo de temperatura para chips Intel queda huerfano en Linux"
subtitle: "El maintainer de Intel no trabaja más en la compañía"
date: 2025-08-10
share-img: /assets/img/kernel.webp
author: Alexia
categories: [Linux, Kernel, Hardware]
tags: [intel, linux, kernel, drivers, coretemp]
---

La reciente ola de despidos y reestructuraciones en Intel sigue dejando secuelas en el ecosistema Linux.  
Esta vez, el impacto llega a algo tan básico como el monitoreo de temperatura de para chips Intel. 

El **driver coretemp**, encargado de proporcionar la lectura de temperatura para prácticamente todos los procesadores Intel de los últimos años, ha pasado oficialmente al estado de *huérfano* (*orphaned*).

El motivo es claro: su maintainer original ya no trabaja en Intel y, por ahora, nadie en Intel asignó un reemplazo.

---

## El parche que lo confirma
Hace apenas unos minutos, se envió un parche a la *Linux Kernel Mailing List* (LKML) marcando el driver como huérfano. Dave Hansen, ingeniero veterano de Intel y figura reconocida en el desarrollo de Linux, comentó al respecto:


> "El correo del maintainer ya no funciona. Lo eliminamos de MAINTAINERS.  
> También marcamos el driver como huérfano por ahora."

El cambio elimina a **Fenghua Yu** como maintainer del *coretemp* y modifica su estado de “Mantenido” a “Huérfano”.

![git]({{ '/assets/img/kernel.webp' | relative_url }})


## ¿Quién es Fenghua Yu?
Fenghua Yu fue durante años ingeniero de drivers Linux en Intel. En febrero de este año, ya había dejado de mantener otros componentes clave como el driver del acelerador de datos Intel IDXD y la *Resource Director Technology* (RDT), en lo que se describió como una “transición laboral”.

Ahora sabemos que dicha transición implicó su salida definitiva de Intel: su correo corporativo ya no funciona y, según se confirmó, actualmente trabaja en **NVIDIA**.

---

## Un patrón preocupante
No es un caso aislado. El mes pasado otro driver de Intel para Linux también quedó huérfano como resultado de los despidos, y Linux 6.17 ya registra otros cambios en la lista de mantenedores de drivers Intel.

Que **Intel no tenga un reemplazo inmediato** para un driver tan crítico como *coretemp* resulta llamativo, sobre todo considerando su histórica reputación en la comunidad de software libre: durante décadas, la compañía fue ejemplo de soporte temprano y de calidad para sus productos en Linux.

---

## ¿Qué significa para los usuarios?
En el corto plazo, el driver *coretemp* sigue estando en el kernel y continuará funcionando para hardware existente.  
El riesgo aparece a futuro: sin un maintainer activo, **el soporte para nuevos procesadores podría retrasarse o no llegar a tiempo al lanzamiento**, afectando la capacidad de monitorear temperaturas en equipos recientes.

Para quienes administramos sistemas o gestionamos infraestructura, perder soporte oficial en algo tan elemental como la temperatura del CPU no es un simple detalle: puede implicar desde menor visibilidad en monitoreo hasta riesgos de sobrecalentamiento no detectado.

---

En tiempos en los que la estabilidad y el soporte a largo plazo son más valiosos que nunca, la comunidad espera que Intel designe pronto un nuevo mantenedor… antes de que un elemento tan básico del ecosistema Linux quede relegado al olvido.
