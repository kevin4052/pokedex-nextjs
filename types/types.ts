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