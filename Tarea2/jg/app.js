console.log('Hola, esto es ua prueba')


document.addEventListener('DOMContentLoaded', ()=>{
    const random = (getRandomInt(1,151));
fetchData(random);
});

const getRandomInt = (min,max) => {
    return Math.floor(Math.random()*(max-min)) + min;
}

 /*Solicitud para los pokemones*/
 const fetchData = async (id) => {
    try {
        console.log(id);
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) /*Recibe una URL el (fetch)- solicitud aleatoria {id} alt+96*/ 
        const data = await respuesta.json()/*Lo trasformamo a json */
        console.log(data)
        const pokemon = {
            img: data.sprites.other.dream_world.front_default, 
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat,
           
        };
        console.log(data)
        pintarCard(pokemon); /*await es para una promesa*/
    } catch (error) {
        console.log(error)
    }
 }
 const pintarCard = (pokemon) =>{

    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content/* hacemos una constante*/ 
    const clone = template.cloneNode (true)/* clon para no tirar error*/
    const fragment = document.createDocumentFragment() /* (fragment)algo invisible que genera que no interfiere el html */
    
    clone.querySelector('.card-body-img').setAttribute('src',pokemon.img)/* adceder a todo nuestro clon */
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp </span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp'
   
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K'
    fragment.appendChild(clone)
    flex.appendChild(fragment)
 }
