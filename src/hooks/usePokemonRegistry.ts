import { useContext, useReducer } from 'react';
import {
  initialState,
  RegistryContext,
  registryReducer,
  type RegistryContextValue,
} from '../context/registry.ts';

export function usePokemonRegistry(): RegistryContextValue {
  const context = useContext(RegistryContext);

  if (!context) {
    throw new Error('usePokemonRegistry must be used within RegistryProvider');
  }

  return context;
}

export function useRegistryStore(): RegistryContextValue {
  const [state, dispatch] = useReducer(registryReducer, initialState);

  return {
    selected: state.selected,
    entries: state.entries,
    dispatch,
  };
}
