import { IConfig, TEnv } from './type';
import proConfig from './app.pro';
import devConfig from './app.dev';
import testConfig from './app.test';

const env = import.meta.env.MODE as TEnv
const appConfig: IConfig = env === 'dev' ? devConfig : env === 'test' ? testConfig : proConfig;

console.log(`%c当前环境: ${appConfig.zhName}`, "padding: 3px 5px;background: #1897ff;color:#ffffff;border-radius:5px")

export default appConfig;