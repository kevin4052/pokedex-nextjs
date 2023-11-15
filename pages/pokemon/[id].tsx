import { Pokemon, PokemonTypes } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";

async function getPokemon(id: string) {  
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
    image: responce.sprites.other["official-artwork"]?.front_default
  }

  return pokemon;
}

export default async function PokemonDetails() {
  const router = useRouter();
  const data = await getPokemon(router.query.id as string)
  return (
    <div className="container">
      <h3>{data.name}</h3>
    </div>
  );
}