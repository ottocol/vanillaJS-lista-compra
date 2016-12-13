var APISaludo = require('./servicios/API_saludo.js')

document.getElementById('boton_saludo').addEventListener('click', function(){
   APISaludo.obtenerSaludo().then(function(obj){
   	  document.getElementById('mensaje').innerHTML = obj.mensaje
   })   
})


document.addEventListener('DOMContentLoaded', function(){
	console.log("Página cargada!: " +  new Date().toLocaleString())
})