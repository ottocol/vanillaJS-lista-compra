# vanillaJS-lista-compra

API REST de la lista de la compra con cliente JS estándar. Hay dos proyectos: el de la parte cliente y el de la parte servidor. El servidor usa las librerías `express` y `body-parser` y además `cors` para permitir peticiones *cross-domain*. En el cliente como librería adicional solo usamos [handlebars](http://handlebarsjs.com) para simplificar la generación de HTML. Para poder utilizar módulos ES6 en el cliente se emplea el *bundler* Parcel.


## Instalar requerimientos

Simplemente hacer un `npm i` en los dos directorios

```bash
cd client && npm i && cd ..
cd server && npm i && cd ..
```

## Probar la aplicación:

Parte servidor: en una terminal, hacer

```bash
cd server
npm start #ejecutará "node server.js"
```

Si se hace una petición GET a `http://localhost:3000/api/items` deben obtenerse los items de la lista en JSON

Parte cliente: en otra terminal, hacer

```bash
cd client
./node_modules/.bin/parcel index.html
```

Abrir un navegador en `http://localhost:1234` y aparecerá el servidor de desarrollo de Parcel con la aplicación. 
