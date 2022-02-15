import { FastifyRequest, FastifyReply } from "fastify";
import { PokemonWithStats } from "models/PokemonWithStats";
const fs = require('fs')
const requests = require("request");


export async function getPokemonByName(request: FastifyRequest, reply: FastifyReply) {
  var name: string = request.params['name']

  reply.headers['Accept'] = 'application/json'

  var urlApiPokeman = `https://pokeapi.co/api/v2/pokemon/`;

 /* name == null
      ? name.trim() != ''
      ? (params["name"] = name, urlApiPokeman = urlApiPokeman + '/', urlApiPokeman = urlApiPokeman + name)
      : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")
      : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")*/


  urlApiPokeman = urlApiPokeman+name+'/?offset=20&limit=20';
  const http = require('http');
  const keepAliveAgent = new http.Agent({ keepAlive: true });

  let response: any = ""
  console.log(urlApiPokeman);
   

  requests.get(urlApiPokeman, (error, response, body) => {
         let json = JSON.parse(body);
         computeResponse(json, reply);
         reply.send(json)
        
});

   
     

  if (response == null) {
    reply.code(404)
  }
  
 

  

  return reply;
}

export const computeResponse = async (response: unknown | any, reply: FastifyReply) => {
  const resp = response as any
  let listUrl=[];
   resp.types.map(type => type.type).map(type => { 
   listUrl.push(type.url);
    return type.url;
  }) || [];

 

  let pokemonTypes = []

  listUrl.forEach(element => {
    requests.get(element, (error, response, body) => {
      let json = JSON.parse(body);
      pokemonTypes.push(json);
     });
     });

   
 

  if (pokemonTypes == undefined)
    throw pokemonTypes

 /* response.stats.forEach(element => {
    var stats = []

    pokemonTypes.map(pok =>
        pok.stats.map(st =>
            st.stat.name.toUpperCase() == element.stat.name
                ? stats.push(st.base_state)
                : ([])
        )
    )

    if (stats) {
      let avg = stats.reduce((a, b) => a + b) / stats.length
      element.averageStat = avg
    } else {
      element.averageStat = 0
    }
  });  */

}