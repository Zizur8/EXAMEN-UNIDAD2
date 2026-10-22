import { usePokemonSearch } from '../hooks/usePokemonSearch.ts';

export default function PokemonSearch() {
  const { state, formAction, isPending } = usePokemonSearch();

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" action={formAction} noValidate>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input id="query" name="query" placeholder="Ej. pikachu" autoComplete="off" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className={`feedback ${state.status === 'error' ? 'error' : state.status === 'success' ? 'success' : ''}`} aria-live="polite">
          {state.message}
        </div>
        <button className="button primary" type="submit" disabled={isPending}>
          {isPending ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </section>
  );
}
