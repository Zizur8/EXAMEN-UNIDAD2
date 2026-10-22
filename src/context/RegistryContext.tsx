import { type PropsWithChildren } from 'react';
import { RegistryContext } from './registry.ts';
import { useRegistryStore } from '../hooks/usePokemonRegistry.ts';

export function RegistryProvider({ children }: PropsWithChildren) {
  const value = useRegistryStore();

  return <RegistryContext.Provider 
  value={value}>{children}</RegistryContext.Provider>;
}






