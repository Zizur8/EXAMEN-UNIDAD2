import { useActionState } from 'react';
import type { PokemonRole } from '../context/registry.ts';
import { usePokemonRegistry } from './usePokemonRegistry.ts';

type RegistrationState = {
  message: string;
  status: 'idle' | 'success' | 'error';
};

const initialRegistrationState: RegistrationState = {
  message: '',
  status: 'idle',
};

export function usePokemonRegistration() {
  const { selected, dispatch } = usePokemonRegistry();

  const [state, formAction, isPending] = useActionState<RegistrationState, FormData>(
    async (_previousState, formData) => {
      const errors: string[] = [];

      if (!selected) {
        errors.push('Debes cargar un pokémon antes de registrar.');
      }

      const nickname = String(formData.get('nickname') ?? '').trim();
      if (nickname.length < 3) {
        errors.push('El apodo debe tener al menos 3 caracteres.');
      }

      const roleValue = String(formData.get('role') ?? '').trim().toLowerCase();
      const role: PokemonRole | null =
        roleValue === 'titular' || roleValue === 'reserva' ? roleValue : null;

      if (!role) {
        errors.push('El rol debe ser titular o reserva.');
      }

      if (errors.length > 0) {
        return {
          message: errors.join(' '),
          status: 'error',
        };
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      if (!selected || !role) {
        return {
          message: 'No se pudo completar el registro.',
          status: 'error',
        };
      }

      dispatch({
        type: 'ADD_ENTRY',
        payload: {
          entryId: crypto.randomUUID(),
          pokemonID: selected.pokemonID,
          pokemonName: selected.pokemonName,
          image: selected.image,
          type: selected.type,
          nickname,
          role,
        },
      });

      return {
        message: `${selected.pokemonName} se registró como ${nickname}.`,
        status: 'success',
      };
    },
    initialRegistrationState,
  );

  return { selected, state, formAction, isPending };
}
