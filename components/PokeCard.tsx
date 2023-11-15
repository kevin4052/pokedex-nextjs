import Image from 'next/image'
import { PokemonListItem } from '@/types/types';

export default function PokeCard(props: {pokemon: PokemonListItem, id: number, isPriority: boolean}) {
  const { pokemon, id, isPriority } = props;

  return (
    <div className='m-2 p-4 bg-white text-white rounded-3xl w-80' style={{background: "#46d1b1"}}>
        <div className='text-2xl font-extrabold px-4'>{pokemon.name}</div>
        <div className='flex justify-end'>
            <Image priority={isPriority} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} width={150} height={150} alt={pokemon.name} />
        </div>
    </div>
  )
}