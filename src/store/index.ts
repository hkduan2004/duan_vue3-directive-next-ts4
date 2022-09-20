import { defineStore } from 'pinia'

export interface IGlobalStore {
    count: number;
}

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: (): IGlobalStore => ({
        count: 1
    }),
    getters: {
        count_2: (state: IGlobalStore) => state.count * 2
    },
    actions: {
        resetCount(newCount: number) {
            this.count = newCount
        }
    }
})