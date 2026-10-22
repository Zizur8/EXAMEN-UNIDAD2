import { usePokemonRegistration } from '../hooks/usePokemonRegistration.ts';

export default function PokemonForm() {
  const { selected, state, formAction, isPending } = usePokemonRegistration();

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" action={formAction} noValidate>
        <div className="preview">
          {selected ? (
            <>
              <img src={selected.image || ''} alt={selected.pokemonName} width={72} height={72} />
              <div>
                <p className="ticket-id">#{selected.pokemonID}</p>
                <strong>{selected.pokemonName}</strong>
              </div>
            </>
          ) : (
            <div>
              <p className="ticket-id">Sin selección</p>
              <strong>Ningún pokémon cargado</strong>
            </div>
          )}
        </div>
        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input id="pokemonId" name="pokemonId" value={selected?.pokemonID ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input id="pokemonName" name="pokemonName" value={selected?.pokemonName ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={selected?.type ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role" defaultValue="">
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
        </div>
        <div className={`feedback ${state.status === 'error' ? 'error' : state.status === 'success' ? 'success' : ''}`} aria-live="polite">
          {state.message}
        </div>
        <button className="button primary" type="submit" disabled={isPending || !selected}>
          {isPending ? 'Registrando...' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  );
}
