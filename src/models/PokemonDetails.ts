export type PokemonApiPayload = {
  id?: number | null;
  name?: string | null;
  sprites?: {
    front_default?: string | null;
  } | null;
  types?: Array<{
    type?: {
      name?: string | null;
    } | null;
  }> | null;
};

export class PokemonDetails {
  public readonly pokemonID: number;
  public readonly pokemonName: string;
  public readonly image: string;
  public readonly type: string;

  public constructor(pokemonID: number, pokemonName: string, image: string, type: string) {
    this.pokemonID = pokemonID;
    this.pokemonName = pokemonName;
    this.image = image;
    this.type = type;
  }

  public static fromApi(payload: Record<string, unknown>): PokemonDetails {
    const apiPayload = payload as PokemonApiPayload;
    const image = apiPayload.sprites?.front_default ?? '';
    const type = apiPayload.types?.[0]?.type?.name ?? '';

    return new PokemonDetails(
      Number(apiPayload.id ?? 0),
      String(apiPayload.name ?? ''),
      typeof image === 'string' ? image : '',
      typeof type === 'string' ? type : '',
    );
  }
}
