import { createContext, type Dispatch } from 'react';
import { PokemonDetails } from '../models/PokemonDetails.ts';

export type PokemonRole = 'titular' | 'reserva';

export type RegistryEntry = {
  entryId: string;
  pokemonID: number;
  pokemonName: string;
  image: string;
  type: string;
  nickname: string;
  role: PokemonRole;
};

export type RegistryState = {
  selected: PokemonDetails | null;
  entries: RegistryEntry[];
};

export type RegistryAction =
  | { type: 'SET_SELECTED'; payload: PokemonDetails | null }
  | { type: 'ADD_ENTRY'; payload: RegistryEntry }
  | { type: 'REMOVE_ENTRY'; payload: string };

export const initialState: RegistryState = {
  selected: null,
  entries: [],
};

export function registryReducer(state: RegistryState, action: RegistryAction): RegistryState {
  switch (action.type) {
    case 'SET_SELECTED':
      return { ...state, selected: action.payload };
    case 'ADD_ENTRY':
      return { ...state, entries: [...state.entries, action.payload] };
    case 'REMOVE_ENTRY':
      return { ...state, entries: state.entries.filter((entry) => entry.entryId !== action.payload) };
    default:
      return state;
  }
}

export type RegistryContextValue = {
  selected: PokemonDetails | null;
  entries: RegistryEntry[];
  dispatch: Dispatch<RegistryAction>;
};

export const RegistryContext = createContext<RegistryContextValue | undefined>(undefined);
