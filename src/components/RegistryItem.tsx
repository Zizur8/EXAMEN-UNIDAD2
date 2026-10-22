import type { RegistryEntry } from '../context/registry.ts';

type RegistryItemProps = {
  entry: RegistryEntry;
  onDelete: () => void;
};



export default function RegistryItem({ entry, onDelete }: RegistryItemProps) {
  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">{entry.nickname}</span>
        <div className="badges">
          <span className={`badge type-${entry.type}`}>{entry.type}</span>
          <span className={`badge role-${entry.role}`}>{entry.role === 'titular' ? 'Titular' : 'Reserva'}</span>
        </div>
      </div>
      <div className="preview">
        <img src={entry.image || ''} alt={entry.pokemonName} width={72} height={72} />
        <div>
          <h3>{entry.nickname}</h3>
          <p className="requester">#{entry.pokemonID} {entry.pokemonName}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="button danger" type="button" onClick={onDelete}>Eliminar</button>
      </div>
    </article>
  );
}
