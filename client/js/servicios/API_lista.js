
export class Servicio_API { 
    constructor(url) {
        this.API_URL = url
    }
    
    obtenerItems() {
        return fetch(this.API_URL)
            .then(function(response) {
                if (response.ok)
                    return response.json()
            })
    }

    addItem(item) {
        return fetch(this.API_URL, {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json'
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok)
                      return respuesta.json()
               })
    }

    getItem(id) {
       return fetch(this.API_URL+'/'+id)
            .then(function(response) {
                if (response.ok)
                    return response.json()
            })
    }

}

