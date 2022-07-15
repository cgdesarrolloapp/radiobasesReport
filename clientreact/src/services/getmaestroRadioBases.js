//const apiKey = 'j7Id1OsREtGQ58dSYf9z4bfNcAgl1b4J'

//parametro si no se manda es objeto vacio y si no sera mapache   
//export default function maestroRadioBases({keyword = 'mapache'} = {}){
export default function getmaestroRadioBases(){  
//fetch no lo soportan todos los navegadores
//template string `   
//const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
const apiURL = 'http://localhost:5000/maestroRadiobases'
   return fetch(apiURL)
   .then(res => res.json())
   .then(response =>{
     const {results = []} = response
     var gifs = []
     results.forEach(element => {
        gifs.push({'id': element, 'key': element})
      })
     console.log(gifs)
     
     return gifs
    
   })
}