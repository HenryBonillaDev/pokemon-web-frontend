import { useState } from "react";
import { pokemonService } from "../../services/pokemon.service";
import type {
  PokemonDetail,
  PokemonComparison,
} from "../../types/pokemon.types";
import { PokemonCard } from "../../components/PokemonCard";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";

export const PokemonVsPage = () => {
  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [results1, setResults1] = useState<PokemonDetail[]>([]);
  const [results2, setResults2] = useState<PokemonDetail[]>([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [comparison, setComparison] = useState<PokemonComparison | null>(null);

  const handleSearch = async (
    term: string,
    setResults: (r: PokemonDetail[]) => void,
    setLoading: (l: boolean) => void
  ) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await pokemonService.search(term.toLowerCase());
      const details = await Promise.all(
        searchResults.slice(0, 6).map(async (p) => {
          const detail = await pokemonService.getDetail(p.name);
          return detail;
        })
      );
      setResults(details);
    } catch (error) {
      console.error("Error searching:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (!pokemon1 || !pokemon2) return;
    if (pokemon1.name === pokemon2.name) {
      alert("¡No puedes comparar el mismo Pokémon!");
      return;
    }

    setComparing(true);
    try {
      const result = await pokemonService.compare(pokemon1.name, pokemon2.name);
      setComparison(result);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error comparing Pokémon:", e.message);
      } else {
        console.error("Error comparing Pokémon:", e);
      }
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/pokemon"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 flex-1 text-center">
            VS Pokémon
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-center text-red-600">
              Pokémon 1
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nombre del Pokémon"
                value={search1}
                onChange={(e) => setSearch1(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={() => handleSearch(search1, setResults1, setLoading1)}
                disabled={loading1}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 transition font-medium"
              >
                {loading1 ? "..." : "Buscar"}
              </button>
            </div>

            {results1.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 max-h-64 overflow-y-auto mb-4">
                {results1.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPokemon1(p);
                      setSearch1(p.name);
                      setResults1([]);
                    }}
                    className="w-full p-3 hover:bg-red-50 rounded-lg flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition"
                  >
                    <img
                      src={
                        p.sprites.official_artwork ||
                        p.sprites.front_default ||
                        ""
                      }
                      alt={p.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="capitalize font-medium text-left">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {pokemon1 && (
              <div className="bg-white p-4 rounded-xl shadow-md">
                <PokemonCard
                  pokemon={{
                    name: pokemon1.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemon1.id}/`,
                  }}
                  onClick={() => {}}
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
              Pokémon 2
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nombre del Pokémon"
                value={search2}
                onChange={(e) => setSearch2(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSearch(search2, setResults2, setLoading2)}
                disabled={loading2}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition font-medium"
              >
                {loading2 ? "..." : "Buscar"}
              </button>
            </div>

            {results2.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 max-h-64 overflow-y-auto mb-4">
                {results2.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPokemon2(p);
                      setSearch2(p.name);
                      setResults2([]);
                    }}
                    className="w-full p-3 hover:bg-blue-50 rounded-lg flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition"
                  >
                    <img
                      src={
                        p.sprites.official_artwork ||
                        p.sprites.front_default ||
                        ""
                      }
                      alt={p.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="capitalize font-medium text-left">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {pokemon2 && (
              <div className="bg-white p-4 rounded-xl shadow-md">
                <PokemonCard
                  pokemon={{
                    name: pokemon2.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemon2.id}/`,
                  }}
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleCompare}
            disabled={!pokemon1 || !pokemon2 || comparing}
            className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-16 py-5 rounded-full text-2xl font-bold hover:from-red-600 hover:to

-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 shadow-xl"
          >
            {comparing ? "¡Combatiendo..." : "¡COMBATE!"}
          </button>
        </div>

        {comparison && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Ganador:{" "}
              <span className="text-5xl capitalize bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {comparison.winner}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold capitalize mb-4 text-red-600">
                  {comparison.pokemon1.name}
                </h3>
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-xl">
                  <p className="text-4xl font-bold">
                    {comparison.pokemon1.stats.reduce(
                      (sum, s) => sum + s.base_stat,
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Stats</p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold capitalize mb-4 text-blue-600">
                  {comparison.pokemon2.name}
                </h3>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
                  <p className="text-4xl font-bold">
                    {comparison.pokemon2.stats.reduce(
                      (sum, s) => sum + s.base_stat,
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Stats</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium">
                Ganador por stats:{" "}
                <span className="font-bold capitalize text-2xl">
                  {comparison.comparison.winner}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
