var APILista = require('./servicios/API_lista.js')
var handlebars = require('handlebars')

//Plantilla Handlebars para renderizar en HTML la lista de la compra
//1. El "." significa el objeto del nivel "actual", en nuestro caso es el array
//por el que vamos a iterar con handlebars
//2. Usamos backticks para delimitar la cadena para que pueda ser multilínea
//(esto es de ES6)
var templateLista = `
 {{#.}}
   <div id="{{id}}">
      <strong>{{nombre}}</strong> - <em>{{cantidad}}</em>
   </div>
 {{/.}}
` 

var tmpl_compilada = handlebars.compile(templateLista)


document.addEventListener('DOMContentLoaded', function(){
	console.log("Página cargada!: " +  new Date().toLocaleString())
	APILista.obtenerItems().then(function(datos) {
		document.getElementById("miComponente").innerHTML = tmpl_compilada(datos)
	})
})