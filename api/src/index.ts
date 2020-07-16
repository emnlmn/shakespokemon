import bootstrap from './application/bootstrap';
import remotePokemonRepository from './application/repository/remotePokemonRepository';
import remoteShakespeareanTranslator from './application/translator/remoteShakespeareanTranslator';

bootstrap(remotePokemonRepository, remoteShakespeareanTranslator);
