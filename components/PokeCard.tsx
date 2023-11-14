import Image from 'next/image'

interface Pokemon {
  name: string;
  types: PokemonTypes[],
  image: string;
}

interface PokemonTypes {
  slot: number | string;
  name: string; 
}

async function getPokemon(id: number) {  
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { cache: 'force-cache' });
  const responce = await data.json();

  const types: PokemonTypes[] = responce.types.map((type: { slot: number; type: { name: string; }; }) => {
    return {
      slot: type.slot,
      name: type.type.name,
    }
  })

  const pokemon: Pokemon = {
    name: responce.name,
    types: types,
    image: responce.sprites.other.home.front_default
  }

  return pokemon;
}

export default async function PokeCard(props: {pokemonId: number}) {
  const { pokemonId } = props;
  const pokemon = await getPokemon(pokemonId);

  return (
    <div className='m-2 p-4 bg-white text-white rounded-3xl w-80' style={{background: "#46d1b1"}}>
      <div className='text-lg font-extrabold'>{pokemon.name}</div>
      <div className='flex justify-between'>
        <div>
          <ul>
            {pokemon.types.map(type => {
              return (
                <li className='rounded-xl bg-cyan-500 px-2 my-1 align-middle' style={{background: "#61e0ca"}} key={type.slot}>{type.name}</li>
              )
            })}
          </ul>
        </div>
        <div>
          <Image src={pokemon.image} width={150} height={150} alt={pokemon.name} />
        </div>
      </div>
    </div>
  )
}