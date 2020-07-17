import * as process from 'process';

export type AppConfig = {
  readonly environment: 'development' | 'staging' | 'production';
  readonly server: {
    readonly port: number;
  };
};

const isEnvironment = (environment: string | undefined): environment is 'development' | 'staging' | 'production' =>
  environment !== undefined && ['development', 'staging', 'production'].includes(environment);

type ConfigFactory = () => () => AppConfig;

export const configFactory: ConfigFactory = () => {
  const config: AppConfig = {
    environment: isEnvironment(process.env.SERVER_HOST) ? process.env.SERVER_HOST : 'development',
    server: {
      port: parseInt(process.env.SERVER_PORT || '', 10) || 8080,
    },
  };

  return () => config;
};
