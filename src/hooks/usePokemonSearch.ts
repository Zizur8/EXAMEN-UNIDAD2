import { useActionState } from 'react';
import { usePokemonRegistry } from './usePokemonRegistry.ts';
import { PokemonDetails } from '../models/PokemonDetails.ts';

type SearchState = {
  message: string;
  status: 'idle' | 'success' | 'error';
};

const initialSearchState: SearchState = {
  message: '',
  status: 'idle',
};

export function usePokemonSearch() {
  const { dispatch } = usePokemonRegistry();

  const [state, formAction, isPending] = useActionState<SearchState, FormData>(
    async (_previousState, formData) => {
      const query = String(formData.get('query') ?? '').trim().toLowerCase().replace(/\s+/g, '');

      if (query.length < 3) {
        return {
          message: 'Ingresa al menos 3 caracteres.',
          status: 'error',
        };
      }

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
          return {
            message: response.status === 404 ? 'Sin resultados' : 'No se pudo consultar POKEAPI',
            status: 'error',
          };
        }

        const payload = (await response.json()) as Record<string, unknown>;
        const pokemon = PokemonDetails.fromApi(payload);
        dispatch({ type: 'SET_SELECTED', payload: pokemon });

        return {
          message: `${pokemon.pokemonName} cargado correctamente.`,
          status: 'success',
        };
      } catch {
        return {
          message: 'No se pudo consultar POKEAPI',
          status: 'error',
        };
      }
    },
    initialSearchState,
  );

  return { state, formAction, isPending };
}
