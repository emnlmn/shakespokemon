import * as process from 'process';

export type AppConfig = {
  readonly server: {
    readonly port: number;
  };
};

type ConfigFactory = () => () => AppConfig;

export const configFactory: ConfigFactory = () => {
  const config: AppConfig = {
    server: {
      port: parseInt(process.env.SERVER_PORT || '', 10) || 8080,
    },
  };

  return () => config;
};
