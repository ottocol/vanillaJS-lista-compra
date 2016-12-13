module.exports  = {
    API_URL : 'http://localhost:3000/api/saludo',
    obtenerSaludo: function () {
        return fetch(this.API_URL)
            .then(function(response) {
                if (response.ok)
                    return response.json()
            })
    }
}