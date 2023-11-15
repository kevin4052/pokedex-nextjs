import { ReactComponentElement } from 'react';
import PokeCard from '../components/PokeCard'

interface PokemonItem {
  name: string,
  url: string,
}

async function getPokemonList() {
  const responce = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await responce.json();

  const list: PokemonItem[] = data.results.map((item: { name: string; url: string}) => {
    return {
      name: item.name,
      url: item.url
    }
  });

  return list
}

export default async function Home() {
  const pokemons = await getPokemonList();
  const pokeCards = pokemons.map((pokemon: PokemonItem, i) => {
        return <PokeCard key={i + pokemon.name} pokemon={pokemon} id={i + 1} isPriority={i < 10}></PokeCard>
      });

  return (
    <div className="container py-4 px-8 m-auto flex flex-row flex-wrap justify-center">
      {pokeCards}
    </div>
  )
}
