import { useState, useEffect, useCallback } from "react";
import { pokemonService } from "../../services/pokemon.service";
import type { Pokemon, PokemonDetail } from "../../types/pokemon.types";
import { Navbar } from "../../components/Navbar";
import { PokemonCard } from "../../components/PokemonCard";
import { PokemonDetailModal } from "../../components/PokemonDetailModal";
import { Link } from "react-router-dom";

export const PokemonListPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const limit = 20;

  const loadPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await pokemonService.getList(limit, offset);
      setPokemons(data.results);
      setHasMore(data.next !== null);
      setIsSearching(false);
    } catch (error) {
      console.error("Error loading pokemon:", error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setOffset(0);
      loadPokemons();
      return;
    }

    setIsSearching(true);
    setLoading(true);
    try {
      const results = await pokemonService.search(searchTerm.toLowerCase());
      setPokemons(results);
      setPokemons(results);
      setHasMore(false);
    } catch (error) {
      console.error("Error searching pokemon:", error);
      setPokemons([]);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      loadPokemons();
    }
  }, [offset, isSearching, loadPokemons]);

  const openDetail = async (pokemon: Pokemon) => {
    setLoadingDetail(true);
    setModalOpen(true);
    try {
      const detail = await pokemonService.getDetail(pokemon.name);
      setSelectedPokemon(detail);
    } catch (error) {
      console.error("Error loading detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Pokédex
        </h2>

        <div className="max-w-md mx-auto mb-8 flex gap-2">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Buscar
          </button>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            <Link
              to="/vs"
            >
              Ir a VS Pokémon
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  onClick={() => openDetail(pokemon)}
                />
              ))}
            </div>

            {!isSearching && pokemons.length > 0 && (
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                  disabled={offset === 0}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                  Anterior
                </button>

                <button
                  onClick={() => setOffset(offset + limit)}
                  disabled={!hasMore}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                  Siguiente
                </button>
              </div>
            )}

            {isSearching && pokemons.length === 0 && (
              <div className="text-center py-10 text-gray-600">
                No se encontraron Pokémon con ese nombre.
              </div>
            )}
          </>
        )}
      </div>

      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={modalOpen}
        onClose={closeModal}
        loading={loadingDetail}
      />
    </div>
  );
};
