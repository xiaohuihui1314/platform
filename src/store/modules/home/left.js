const state = {
  subMenuName: localStorage.getItem("subMenuName") || null
};
// getters
const getters = {
  SubMenuName: state => state.subMenuName
};

const actions = {
  Action_Menu_Name({commit}, name){
    commit("set_Menu_Name", name)
  }
};
// mutations
const mutations = {
  set_Menu_Name(state, name){
    state.subMenuName = name;
    localStorage.setItem("subMenuName", name)
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}
