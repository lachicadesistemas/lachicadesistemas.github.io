---
layout: post
title: Interfaz de AWX inaccesible por LDAP. A hackear AWX.
subtitle: Y me salió bien.
thumbnail-img: /assets/img/awx.png
share-img: /assets/img/awx.png
tags: [internet, ansible, awx, sysadmin, devops, docker, aap, redhat, rhel]
author: Alexia
---

![AWX Logo]({{ '/assets/img/awx.png' | relative_url }})


Generalmente en las empresas las credenciales se manejan con algun tipo de identity manager, y las consultas se realizan en gran manera vía LDAP o LDAPS.

Pero ¿Qué pasa cuando AAP o AWX están configurados con una cuenta de usuario para validar los usuarios por LDAP y esa cuenta se altera?

Bueno, la interfaz queda inaccesible.

Y no sólo eso, sinó que generalmente la configuración, tanto de AAP, como de AWX, se realizan desde la interfaz. Es decir, ¿Cómo hago para corregir el usuario de aplicación para validar por LDAP si no puedo acceder a la interfaz para corregirlo?


Inmediatamente pensé: Tiene que existir una forma de alterarlo por fuera de la interfaz, obvio. Pero ¿Cómo?


__Gracias Python__.


Lo que descubrí es que la información LDAP está en el container awx_task 


así que hice

```docker exec -it awx_task bash```

Una vez dentro del container, miré la configuración de ldap con

```awx-manage print_settings | grep -ia auth_ldap_bind```

Esto me lista los ```AUTH_LDAP_BIND_DN (usuario) y AUTH_LDAP_BIND_PASSWORD (Contraseña)```

entre otra info.


Y ahora si lo que desconocía que podía hacer:

podía ejecutar la consola interactiva de django (Python) conocida como shell_plus vía awx manage:


```awx-manage shell_plus```

Una vez dentro de la consola interactiva pude alterar usuario y password:


```
from awx.conf.models import Setting

# Cambiar el usuario de bind
Setting.objects.update_or_create(
    key='AUTH_LDAP_BIND_DN',
    defaults={'value': 'CN=UsuarioDeEjemplo,OU=EjemploDeOU,OU=EjemploOU2,OU=Miempresa,DC=midominio,DC=miTLD'} #Solo el TLD no el FQDN.
)

# Cambiar la contraseña
Setting.objects.update_or_create(
    key='AUTH_LDAP_BIND_PASSWORD',
    defaults={'value': 'NuevoPassword'}
)

exit()
```

Y no hace falta reiniciar awx_task por que los cambios los toma en caliente. Se pueden verificar grepeando como mostré más arriba en este post.

Lo que si hay que reiniciar es el frontend:

```docker restart awx_web```

Y listo, hackeamos awx para que nos devuelva validación por LDAP. 



Así que si algun día se encuentran ante un problema similar en AAP o AWX, espero que les sirva este humilde post como referencia. 

¡Adiós!
