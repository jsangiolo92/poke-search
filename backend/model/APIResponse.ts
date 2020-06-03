export class APIResponse {
  // TODO ==> types
  private pokemon: any;
  private moves: any;
  private error: string;

  constructor(error, pokemon, moves) {
    if (error) {
      this.error = error;
    }

    if (pokemon) {
      this.pokemon = pokemon;
    }

    if (moves) {
      this.moves = moves;
    }
  }
}
