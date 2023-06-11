import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    uid: '',
    name: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    name: state => state.name,
    uid: state => state.uid,
}

export const mutations: MutationTree<RootState> = {
  SET_UID: (state, uid: string) => (state.uid = uid),
}

export const actions: ActionTree<RootState, RootState> = {
  setUid(ctx, uid: string) {
    ctx.commit('SET_UID', uid)
  },
}