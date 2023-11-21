"use client"
import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard'
import { PokemonList, PokemonListItem } from '@/types/types';

async function getPokemonList(offset: number = 0, numberPerPage:number = 10) {
  const responce = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await responce.json();

  const list: PokemonListItem[] = data.results.map((item: { name: string; url: string}) => {
    return {
      name: item.name,
      url: item.url
    }
  }).slice(offset, offset + numberPerPage);

  return {
    next: data.next,
    previous: data.previous,
    list: list
  } as PokemonList
}

export default function Home() {
  const [data, setData] = useState<PokemonList>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    (async () => {
      const responce = await getPokemonList(offset);
      setData(responce)
    })();
  }, [offset])

  const pokeCards = data?.list.map((pokemon: PokemonListItem, i) => {
        return <PokeCard key={i + pokemon.name} pokemon={pokemon} id={i + 1} isPriority={i < 10}></PokeCard>
      });

  return (
    <div className="container py-4 px-8 m-auto flex flex-col flex-wrap justify-center">
      <div className='flex flex-row justify-around'>
        <button className='hover:bg-green-500' onClick={() => setOffset(offset - 10)}>previous</button>
        <button className='hover:bg-green-500' onClick={() => setOffset(offset + 10)}>next</button>
      </div>
      <div className='flex flex-row flex-wrap justify-center'>
        {pokeCards}
      </div>
    </div>
  )
}
