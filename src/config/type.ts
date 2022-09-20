
export type TEnv = 'dev' | 'test' | 'pro'

/** 环境配置 */
export interface IConfig {
    zhName: string;
    env: TEnv;
}


/** 获取一个类型里某个字段的子类型 */
export type ExpandOptionType<T, U extends keyof T> = T extends object ? T[U] : never
