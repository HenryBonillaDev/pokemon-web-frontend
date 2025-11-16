import { useState } from 'react';
import type { Pokemon } from '../types/pokemon.types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-b from-blue-50 to-white">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={pokemon.name}
          className={`w-full h-full object-contain transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-center capitalize text-gray-800">
          {pokemon.name}
        </h3>
        <p className="text-center text-sm text-gray-500 mt-1">#{pokemonId}</p>
      </div>
    </div>
  );
};