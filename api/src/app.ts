import bootstrap from './application/bootstrap';
import remotePokemonRepository from './application/repository/remotePokemonRepository';
import remoteShakespeareanTranslator from './application/translator/remoteShakespeareanTranslator';
import { configFactory } from './application/config/configFactory';

const getConfig = configFactory();

bootstrap(remotePokemonRepository, remoteShakespeareanTranslator, getConfig());
