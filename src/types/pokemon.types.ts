export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonType {
  name: string;
  slot: number;
}

export interface PokemonAbility {
  name: string;
  is_hidden: boolean;
}

export interface PokemonStat {
  name: string;
  base_stat: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  official_artwork: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface PokemonComparison {
  pokemon1: PokemonDetail;
  pokemon2: PokemonDetail;
  winner: string;
  comparison: {
    total_stats: Record<string, number>;
    winner: string;
  };
}