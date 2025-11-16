import { api } from "./api.service";
import type {
  PokemonListResponse,
  PokemonDetail,
  Pokemon,
  PokemonComparison,
} from "../types/pokemon.types";

export const pokemonService = {
  getList: async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  },

  getDetail: async (id: string): Promise<PokemonDetail> => {
    const response = await api.get<PokemonDetail>(`/pokemon/${id}`);
    return response.data;
  },

  search: async (name: string): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>("/pokemon/search", {
      params: { name },
    });
    return response.data;
  },

  compare: async (
    pokemon1: string,
    pokemon2: string
  ): Promise<PokemonComparison> => {
    const response = await api.get<PokemonComparison>(`/pokemon/compare`, {
      params: { pokemon1, pokemon2 }
    });

    return response.data;
  },
};
