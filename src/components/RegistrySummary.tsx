import { usePokemonRegistry } from '../hooks/usePokemonRegistry.ts';

export default function RegistrySummary() {
  const { entries } = usePokemonRegistry();

  const titulares = entries.filter((entry) => entry.role === 'titular').length;
  const reservas = entries.filter((entry) => entry.role === 'reserva').length;

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat"><span>Total</span><strong>{entries.length}</strong></article>
      <article className="stat"><span>Titulares</span><strong className="text-amber">{titulares}</strong></article>
      <article className="stat"><span>Reservas</span><strong className="text-green">{reservas}</strong></article>
    </section>
  );
}
