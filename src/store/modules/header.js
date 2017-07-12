const state = {
    index:0
};
// getters
const getters = {
  headerData: state => state.header,
};

const actions = {};
// mutations
const mutations = {
  clickHeader(state, index){
    state.header.index = index
  },
};
export default {
  state,
  getters,
  actions,
  mutations
}
