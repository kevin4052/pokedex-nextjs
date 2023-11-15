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

interface PokemonItem {
  name: string,
  url: string,
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

  //console.log(responce.sprites.other['official-artwork'])

  const pokemon: Pokemon = {
    name: responce.name,
    types: types,
    image: responce.sprites.other["official-artwork"]?.front_default
  }

  return pokemon;
}

export default async function PokeCard(props: {pokemon: PokemonItem, id: number, isPriority: boolean}) {
  const { pokemon, id, isPriority } = props;
  // const pokemon = await getPokemon(pokemonId);

  return (
    <div className='m-2 p-4 bg-white text-white rounded-3xl w-80' style={{background: "#46d1b1"}}>
      <div className='text-2xl font-extrabold px-4'>{pokemon.name}</div>
      <div className='flex justify-end'>
          <Image priority={isPriority} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} width={150} height={150} alt={pokemon.name} />
      </div>
    </div>
  )
}