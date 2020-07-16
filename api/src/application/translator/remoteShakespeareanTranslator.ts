import { ShakespeareanTranslator } from '../../domain/pokemon/pokemonTranslator/ShakespeareanTranslator';

const remoteShakespeareanTranslator: ShakespeareanTranslator = (pokemon) => ({ ...pokemon, description: 'Lore ipsum' });

export default remoteShakespeareanTranslator;
