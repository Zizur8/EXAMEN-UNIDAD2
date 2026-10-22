import { usePokemonRegistry } from '../hooks/usePokemonRegistry.ts';
import EmptyState from './EmptyState.tsx';
import RegistryItem from './RegistryItem.tsx';

export default function RegistryList() {
  const { entries, dispatch } = usePokemonRegistry();

  if (entries.length === 0) {
    return (
      <section className="panel list-panel" aria-labelledby="list-title">
        <div className="section-heading">
          <span className="step">03</span>
          <div>
            <h2 id="list-title">Registros</h2>
            <p>Cada envío simulado agrega una tarjeta al final.</p>
          </div>
        </div>
        <div className="ticket-list">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className="ticket-list">
        {entries.map((entry) => (
          <RegistryItem
            key={entry.entryId}
            entry={entry}
            onDelete={() => dispatch({ type: 'REMOVE_ENTRY', payload: entry.entryId })}
          />
        ))}
      </div>
    </section>
  );
}
