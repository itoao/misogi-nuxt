import { vuexfireMutations, firestoreAction } from 'vuexfire';

export interface State {
    posts: string
}
export const state: State = {
    posts: []
};
export const mutations = {
    ...vuexfireMutations
};
export const actions = {
    setPostRef: firestoreAction(function (context, ref) {
        context.bindFirestoreRef('posts', ref)
    }),
}
export const getters = {
    posts: state => state.posts
};