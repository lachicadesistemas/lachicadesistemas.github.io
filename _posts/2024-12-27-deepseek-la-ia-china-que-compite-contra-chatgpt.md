---
layout: post
title: La nueva IA China y Open Source.
subtitle: el modelo es, cuanto menos, prometedor.
gh-repo: alexiarstein/bash
gh-badge: [star, fork, follow]
tags: [test]
comments: true
author: Alexia
---

Un laboratorio chino ha creado lo que parece ser uno de los modelos de IA de código abierto más poderosos hasta la fecha.

Lo cierto es que lo había escuchado sin darle mucha importancia, hasta que un colega en [sysarmy](https://sysarmy.com) mencionó, quizás a modo de broma:

```
<yaco06> los chinos haciendo lo mismo que openAI, pero al 5% del costo y al 10% del hardware
```

Así que, fiel a mi naturaleza científica. Me tuve que poner a investigar. 

La cosa es así: El modelo de IA, **DeepSeek V3**, fue desarrollado por la firma DeepSeek y se lanzó el miércoles bajo una licencia permisiva que permite a los desarrolladores descargarlo y modificarlo para la mayoría de las 
aplicaciones, incluyendo comerciales (Tengo que revisar que licencia utiliza igual, se los debo, pero según estas declaraciones presumo que es MIT o similar)

## Sobre DeepSeek v3 

**DeepSeek V3** puede manejar una variedad de tareas basadas en texto, como programar, traducir y escribir ensayos y correos electrónicos a partir de un prompt descriptivo tal cual llama o ChatGPT.

Lo llamativo es que, según las pruebas realizadas y publicadas por DeepSeek, Su modelo **DeepSeek V3** supera a los modelos de código libre descargables y a los modelos de IA _**cerrados**_ que solo se pueden acceder a través de una 
API. En una serie de pruebas en **Codeforces**, DeepSeek superó a otros modelos, incluyendo el Llama 3.1 405B de Meta, el GPT-4o de OpenAI y el Qwen 2.5 72B de Alibaba.

Pero eso no sería todo. El modelo **DeepSeek V3** también arrasa en Aider Polyglot, una prueba diseñada para medir, entre otras cosas, si un modelo puede escribir nuevo código que se integre en el código existente.

> **¡DeepSeek-V3!**
> 
> - 60 tokens/segundo (¡3 veces más rápido que V2!)
> - Compatibilidad con API intacta
> - Modelos y documentos completamente de código abierto
> - 671B parámetros MoE
> - 37B parámetros activados
> - Entrenado con 14.8T de tokens de alta calidad
> 
> ¡Supera al Llama 3.1 405B en casi todas las pruebas!
> [Ver Tweet](https://t.co/OiHu17hBSI) 

DeepSeek afirma que **DeepSeek V3** fue entrenado con un conjunto de datos de 14.8 billones de tokens. En ciencia de datos, los tokens representan partes de datos en bruto: 1 millón de tokens equivale a unas 750,000 palabras.

No solo el conjunto de entrenamiento es enorme. **DeepSeek V3** tiene un tamaño impresionante: 671 mil millones de parámetros, o 685 mil millones en la plataforma de desarrollo de IA Hugging Face. (Los parámetros son las 
variables internas que los modelos utilizan para hacer predicciones o decisiones). Que sería alrededor de 1.6 veces el tamaño del Llama 3.1 405B, que tiene 405 mil millones de parámetros.

El conteo de parámetros a menudo (pero no siempre) se correlaciona con la habilidad; los modelos con más parámetros tienden a superar a los que tienen menos. Pero los modelos grandes también requieren hardware más potente para 
funcionar. Una versión no optimizada de **DeepSeek V3** necesitaría un banco de GPUs de alta gama para responder preguntas a velocidades razonables.

Aunque no es el modelo más práctico, **DeepSeek V3** es un logro en algunos aspectos. DeepSeek pudo entrenar el modelo usando un centro de datos de GPUs Nvidia H800 en solo dos meses, las mismas GPUs que las empresas chinas 
han sido recientemente prohibidas de adquirir debido a nuevas restricciones del Departamento de Comercio de los EE.UU.

La compañía también afirma que solo gastó 5.5 millones de dólares para entrenar **DeepSeek V3**, es decir, una fracción del costo de desarrollo de modelos como el GPT-4 de OpenAI.


Algunas fuentes sostienen que, al tratarse de una empresa china, está sujeta a la regulación de internet de China para asegurar que las respuestas de sus modelos no divulguen información que pudiera perjudicar la imagen y/o 
cultura del país asiatico. Algo que en mayor o en menor medida, también realizan llama y openAI dependiendo de lo que se consulte y como.
Lo cierto es que el modelo no respondió preguntas relacionadas con, por ejemplo, las protestas en la Plaza de Tiananmén en 1989.

DeepSeek, que a finales de noviembre presentó **DeepSeek-R1**, una respuesta al modelo de "razonamiento" o1 de OpenAI, es una organización curiosa. Está respaldada por High-Flyer Capital Management, un fondo de cobertura 
cuantitativo chino que utiliza IA para informar sus decisiones de trading.

High-Flyer construye sus propios clústeres de servidores para el entrenamiento de modelos, uno de los más recientes de los cuales tiene, según se informa, 10,000 GPUs Nvidia A100 y costó 1 billón de yenes (~138 millones de 
dólares). Fundada por **Liang Wenfeng**, un graduado en ciencias de la computación, High-Flyer tiene como objetivo lograr una IA "superinteligente" a través de su organización DeepSeek.

En una entrevista a principios de este año, Wenfeng caracterizó la IA de código cerrado como la de OpenAI como un "foso temporal". "[No] ha detenido a otros de alcanzar el mismo nivel", señaló.

¡Sin dudas!
