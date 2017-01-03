var APILista = require('./servicios/API_lista.js')
var handlebars = require('handlebars')


//Plantilla handlebars para renderizar en HTML un item de la lista
//Usamos backticks (funcionalidad de ES6) para delimitar la cadena para que pueda ser multilínea
var templateItem = `
   <div id="{{id}}">
      <strong>{{nombre}}</strong> - <em>{{cantidad}}</em>
   </div>
`

//Plantilla Handlebars para renderizar en HTML la lista de la compra
//1. El "." significa el objeto del nivel "actual", en nuestro caso es el array
//por el que vamos a iterar con handlebars
//2. El ${} nos permite interpolar variables (funcionalidad de ES6). Es solo por no
//andar concatenando cadenas, esto queda más elegante
var templateLista = `
 <h2>Lista de la compra</h2>
 {{#.}}
   ${templateItem}
 {{/.}}
` 

//Compilamos las plantillas handlebars. Esto genera funciones a las que llamaremos luego
var tmpl_lista_compilada = handlebars.compile(templateLista)
var tmpl_item_compilada = handlebars.compile(templateItem)

//manejador de eventos para cuando se carga la página
//le pedimos la lista de items al servidor y la pintamos en el HTML
document.addEventListener('DOMContentLoaded', function(){
	console.log("Página cargada!: " +  new Date().toLocaleString())
	APILista.obtenerItems().then(function(datos) {
		//mezclamos los datos con el HTML de la plantilla para obtener el HTML resultado
		var listaHTML = tmpl_lista_compilada(datos)
		//insertamos el HTML en la página
		document.getElementById("miComponente").innerHTML = listaHTML
	})
})

//manejador de eventos para el botón de "Añadir" item a la lista
document.getElementById('boton_add_item').addEventListener('click', function(){
   //Creamos un objeto JS con los datos del nuevo item	
   var nuevo = {}
   nuevo.nombre = document.getElementById('nuevo_nombre').value
   nuevo.cantidad = document.getElementById('nuevo_cantidad').value
   nuevo.comentario = document.getElementById('nuevo_comentario').value
   //Enviamos el objeto al servidor, usando el API
   APILista.addItem(nuevo).then(function(datos){
   	 //Añadimos el HTML del nuevo item a la lista
   	 //1. Mezclamos datos con plantilla handlebars
   	 var nuevoHTML = tmpl_item_compilada(nuevo)
   	 //2. Añadimos el HTML resultante al final de la lista
     document.getElementById('miComponente').insertAdjacentHTML('beforeend', nuevoHTML)
   })
})


