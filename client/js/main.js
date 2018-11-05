import {Servicio_API} from './servicios/API_lista.js'
import { compile } from 'handlebars';

var servicio_API = new Servicio_API('http://localhost:3000/api/items')


//Plantilla handlebars para renderizar en HTML un item de la lista
//Usamos backticks (funcionalidad de ES6) para delimitar la cadena para que pueda ser multilínea
//Con el "javascript:" en el href conseguimos que un enlace pueda llamar a código JS
var templateItem = `
   <div>
      <span id="{{id}}">
         <strong>{{nombre}}</strong> - <em>{{cantidad}}</em>
      </span>   
      <a id="enlace_{{id}}" href="javascript:verDetalles({{id}})">Detalles</a>
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

var templateDetalles = `
  <span id="detalles_{{id}}">
    {{detalles}}
  </span>
`

//Compilamos las plantillas handlebars. Esto genera funciones a las que llamaremos luego
var tmpl_lista_compilada = compile(templateLista)
var tmpl_item_compilada = compile(templateItem)
var tmpl_detalles_compilada = compile(templateDetalles)




//manejador de eventos para cuando se carga la página
//le pedimos la lista de items al servidor y la pintamos en el HTML
document.addEventListener('DOMContentLoaded', function(){
	console.log("Página cargada!: " +  new Date().toLocaleString())
	servicio_API.obtenerItems().then(function(datos) {
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
   servicio_API.addItem(nuevo).then(function(creado){
   	 //Añadimos el HTML del nuevo item a la lista
   	 //1. Mezclamos datos con plantilla handlebars
   	 var nuevoHTML = tmpl_item_compilada(creado)
   	 //2. Añadimos el HTML resultante al final de la lista
     document.getElementById('miComponente').insertAdjacentHTML('beforeend', nuevoHTML)
   })
})

//llamada cuando pulsamos en un enlace "Detalles"
function verDetalles(id) {
	servicio_API.getItem(id).then(function(item){
		//creamos un objeto JS con los datos de los detalles a mostrar
		var datos = {id: item.id, detalles: item.comentario}
		//lo fusionamos con la plantilla handlebars
		var datosHTML = tmpl_detalles_compilada(datos)
		//metemos el HTML resultante en la página
	    //aprovechamos que hemos hecho que el item con un id determinado 
	    //esté en el HTML en un div con el mismo id
		var divItem = document.getElementById(id)
		divItem.insertAdjacentHTML('beforeend', datosHTML)	
		//TEDIOSO: ahora hay que cambiar el enlace "ver detalles" por uno "ocultar"
		//hemos hecho que el HTML del enlace tenga un id con "enlace_" y el id del item
		var enlaceDetalles = document.getElementById('enlace_'+id)
		//Cambiamos a dónde apunta el enlace
		enlaceDetalles.href = 'javascript:ocultarDetalles('+ id +')'
		//cambiamos el texto del enlace
		enlaceDetalles.innerHTML = 'Ocultar detalles'
	})
}

//IMPORTANTE: para que desde la página se pueda llamar a la función,
// la guardamos en el ámbito global (window). Si no, no será visible,
//porque el código del main.js no es visible directamente para el HTML, sino el bundle.js
window.verDetalles = verDetalles
//Nótese que es el único caso en que desde el HTML (un enlace) llamamos a algo de JS
//El resto de casos es al contrario: los manejadores de eventos de antes los hemos
//definido en JS no en el HTML original

//llamada cuando pulsamos en un enlace "Ocultar Detalles"
function ocultarDetalles(id) {
	//forma sencilla de eliminar un fragmento HTML, asignarle la cadena vacía
	//usamos outerHTML porque incluye la propia etiqueta, innerHTML sería solo el contenido
	document.getElementById('detalles_'+id).outerHTML = ''
	//TEDIOSO: volvemos a poner el enlace en modo "mostrar detalles"
	document.getElementById('enlace_'+id).href = 'javascript:verDetalles('+id+')'
	document.getElementById('enlace_'+id).innerHTML = 'Detalles'

}
//hacemos visible ocultarDetalles para el HTML, por lo mismo que con "verDetalles"
window.ocultarDetalles = ocultarDetalles


