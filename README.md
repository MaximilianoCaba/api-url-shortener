# URL SHORTENER

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Proyecto para crear url cortas y redireccionar a url finales

Los id de cada url se arma en base62 transformando el identificador de 
cada registro en la base de datos relacional en una cadena ASCII (0-9,a-z,A-Z)

Cada obtención de url para redireccionar contiene una cache en memoria para optimizar 
la consulta cuando la url no tiene modificaciones o no esta habilitada y un interceptor 
para contar la cantidad de invocaciones por url

## REQUISITOS PREVIOS AL PROYECTO

- Url tienen una vigencia indefinida
- plataforma soporta 1 millón de RPM
- se debe saber la cantidad de clicks por url en tiempo real
- las url pueden modificarse
    - habilitarse y deshabilitarse
    - modificar la url de destino
- se estima una carga de 50 Url por dia
- se requiere monitorear la app este levantada 99,9%
- Url con un máximo de 64 caracteres

## SOBRE EL PROYECTO
Una breve descripción sobre el proyecto a nivel desarrollo
Tecnologías principales utilizadas:

- NODEJS: Entorno de JavaScript para ejecutar un servidor que consuma poco recursos
- Fastify: Framework para el desarrollo de la api, se jacta de ser el flamework más rápido en NODEJS
para la gestión de peticiones http (un 65 % más rápido que express) gestionando hasta 78.000 mil peticiones
por segundo
- Cache-manager: Modulo para gestionar información en memoria
- Babel: compilador de ES5 a ES6
- Jest: Framework para test
- TypeOrm: ORM para la gestión de base de datos relacional (MySQL)
- Base62: encodificación de base10 a base62 para los id de las url cortas
- Swagger: Documentador de api
- Swagger-Stats: administrador de métricas de la aplicación

### ¿ Porque una base de datos relacional y no una no-relacional?
Esta decisión se refleja en la premisa que la base de datos va a tener poco uso, al menos unas
50 solicitudes de cargas nuevas por día , un estimativo de 50 modificaciones por día y 
1000 obtenciones de información por día (ya que la aplicación contiene una cache para obtener datos repetidos).

Otro punto es que cada registro se guarda con un numero auto incremental y este puede ser usado
para codificar y decodificar a base62 rápidamente.

Se estima que en 10 años habrá aproximadamente 182.500 registros (un promedio de 50 registros nuevos diarios)

## ARQUITECTURA DE DESPLIEGUE

![Alt text](static/images/architecture-deploy.png?raw=true "Title")

![Alt text](static/images/estimative.png?raw=true "Title")

- costo por mes 918 USD*
- costo por unica vez 180 USD

(*estos costos pueden variar dependiendo el trafico de peticiones HTTPS)

### ¿ Por que AWS ?
- Costo por demanda
- Fácilmente escalable
- Disponibilidad 99,9 %
- Lactancia de respuesta por region
- Arquitectura simple
- Fácil mantenimiento


### ¿ Como se utilizaría cada parte de la arquitectura de despliegue ?

- API GATEWAY: Gestor de solicitudes HTTPS para el redireccionamiento a lambda, 
autentificación para las solicitudes POST Y PUT
- CloudWatch: Recolector de métricas de API GATEWAY, para contabilizar las cantidad de
solicitudes generadas en el path GET
- LAMBDAS: Ejecutador de lógica de negocio para la obtención, creación y modificación de URL
- DYNAMO DB: Base de datos no relacionales para guardar las url a redireccionar
- DYNAMO DB DAX: Cache intermediaria brindada por DYNAMO DB, donde mientras un documento 
no sufra modificaciones devuelve el documento desde la cache sin necesidad de ejecutar una consulta
sobre la base de datos

## Instalación

url shortener requiere [Node.js](https://nodejs.org/) v12+ para correr.

## develop run

```sh
yarn install

yarn dev
```

## test run

```sh
yarn test
```

## production run

```sh

yarn install

yarn dist

yarn start

```

## Documentacion

```sh

http://localhost:{port}/documentation


```

## Metricas

```sh

http://localhost:{port}/swagger-stats/ux#/

```

## PRUEBAS DE RENDIMIENTO

pruebas realizadas con una I7 2gen 4 cores 8 nucleos y 12 GB ddr3 2333HZ

programa utilizado Jmeter: 2500 hilos por segundos durante 60 segundos

el uso de microprocesador fue llevarlo al máximo y la ram jamás supero los 400mb

### _Test de rendimiento sin guardado de contadores y cache activada_

- Cantidad de RPM: 2000 aprox
- cantidad de request redireccionados: 113957

![Alt text](static/images/test_when_interceptor_off.png?raw=true "Title")

### _Test de rendimiento con guardado de contadores y cache activada_

- Cantidad de RPM: 1000 aprox
- cantidad de request redireccionados: 50548

![Alt text](static/images/test_when_interceptor_on.png?raw=true "Title")

### _Test de rendimiento sin guardado de contadores y cache desactivada_

- Cantidad de RPM: 550 aprox
- cantidad de request redireccionados: 40899

![Alt text](static/images/test_when_cache_off_interceptor_off.png?raw=true "Title")

### _Test de rendimiento con guardado de contadores y cache desactivada_

- Cantidad de RPM: 450 aprox
- cantidad de request redireccionados: 30855

![Alt text](static/images/test_when_cache_off_interceptor_on.png?raw=true "Title")
