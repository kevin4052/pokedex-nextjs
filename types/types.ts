export interface Pokemon {
  name: string;
  types: PokemonTypes[],
  image: string;
}

export interface PokemonTypes {
  slot: number | string;
  name: string; 
}

export interface PokemonListItem {
  name: string,
  url: string,
}

export interface PokemonList {
  next: string,
  previous: string,
  list: PokemonListItem[]
}