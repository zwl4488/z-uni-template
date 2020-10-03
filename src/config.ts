enum Env {
  Dev = 'dev',
  Prod = 'prod',
}

// 更改环境需手动改一下
const env = [ Env.Dev, Env.Prod ][0];

const appId = 'xxxxxx';

const envConfig = {
  [Env.Dev]: {
    host: 'https://domain.test',
    dev: true,
    appId
  },
  [Env.Prod]: {
    host: 'https://domain.com',
    dev: false,
    appId
  },
};

export const config = envConfig[env];
