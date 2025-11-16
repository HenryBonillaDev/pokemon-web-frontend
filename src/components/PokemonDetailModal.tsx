import type { PokemonDetail } from '../types/pokemon.types';

interface PokemonDetailModalProps {
  pokemon: PokemonDetail | null;
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
}

export const PokemonDetailModal = ({ pokemon, isOpen, onClose, loading = false }: PokemonDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : pokemon ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold capitalize">#{pokemon.id} {pokemon.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-3xl font-light"
              >
                ×
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <img
                src={pokemon.sprites.official_artwork || pokemon.sprites.front_default || ''}
                alt={pokemon.name}
                className="w-64 h-64 object-contain drop-shadow-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                <p className="text-sm text-blue-600 font-medium">Altura</p>
                <p className="text-2xl font-bold text-blue-800">{pokemon.height / 10} m</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                <p className="text-sm text-green-600 font-medium">Peso</p>
                <p className="text-2xl font-bold text-green-800">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Tipos</h3>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((t) => (
                  <span
                    key={t.slot}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full capitalize text-sm font-medium shadow"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.name}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full capitalize text-sm font-medium shadow"
                  >
                    {a.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Estadísticas</h3>
              <div className="space-y-3">
                {pokemon.stats.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium text-gray-700">
                        {s.name.replace('-', ' ')}
                      </span>
                      <span className="font-bold text-gray-900">{s.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-700"
                        style={{ width: `${(s.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-red-500">
            No se pudo cargar el detalle del Pokémon.
          </div>
        )}
      </div>
    </div>
  );
};