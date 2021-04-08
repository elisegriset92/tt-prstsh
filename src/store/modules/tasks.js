
const tasks = {
  state: {  
      dishes: [
      {
        id: 1,
        image: "https://i.imgur.com/0umadnY.jpg",
        nom: "Burger",
        description:
          "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
        note: 4
      },
      {
        id: 2,
        image: "https://i.imgur.com/b9zDbyb.jpg",
        nom: "Pizza",
        description:
          "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
        note: 5
      },
      {
        id: 3,
        image: "https://i.imgur.com/RbKjUjB.jpg",
        nom: "Petits choux",
        description:
          "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
        note: 1
      },
      {
        id: 4,
        image: "https://i.imgur.com/xAuhNVg.jpg",
        nom: "BBQ Ribs",
        description:
          "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
        note: 5
      }
    ],
  openForm: false,
  prefilled: {
    nom: '',
    description: '',
    note: 1,
    image: ""
  },
  formAction :'add'
 },

  mutations: { 
    initialiseStore(state) {
			if(localStorage.getItem('dishes')) {
				state.dishes =  JSON.parse(localStorage.getItem('dishes'))
			} 
		},
    modifyFormStatus (state) {
      state.prefilled = {
        nom: '',
        description: '',
        note: 1,
        image: ""
      };
      state.formAction = 'add';
      state.openForm = !state.openForm;
    },
    prefillForm (state, dishe) {
      state.formAction = 'modify';
      state.prefilled = dishe;
    },
    delete (state, index) {
      state.dishes.splice(index, 1);
    },
    add (state, dishe) {
      state.formAction = 'add';
      state.dishes.push(dishe);
    },
    modify (state, disheObject) {
      state.dishes[disheObject.index].nom = disheObject.dishe.nom ? disheObject.dishe.nom : state.dishes[disheObject.index].nom;
      state.dishes[disheObject.index].description = disheObject.dishe.description ? disheObject.dishe.description :state.dishes[disheObject.index].description;
      state.dishes[disheObject.index].image = disheObject.dishe.image ? disheObject.dishe.image : state.dishes[disheObject.index].image;
      state.dishes[disheObject.index].note = disheObject.dishe.note ? disheObject.dishe.note :  state.dishes[disheObject.index].note;
    }
  },
     
  getters: {
    dishesIsStore (state) {
      return  state.dishes
   },
    formStatus (state) {
      return state.openForm;
    },
    prefilledForm (state) {
      return state.prefilled;
    },
    actionForm (state) {
      return state.formAction;
    }
  },

  actions: {  
    toggleForm({commit}, dishe){
      if (dishe === 'close' || dishe === 'open'){
          commit('modifyFormStatus');
      } else {
        commit('modifyFormStatus');
        commit('prefillForm', dishe);
      }
    },
    deleteDishe ({ state, commit }, dishe) {
      localStorage.removeItem('dishes');
      let indexDisheToDelete = state.dishes.findIndex((el) => el.id === dishe.id);
      commit('delete', indexDisheToDelete);
      localStorage.setItem('dishes', JSON.stringify(state.dishes));
    },
    addDishe({ state, commit }, dishe) {
      localStorage.removeItem('dishes');
      commit('add', dishe);
      localStorage.setItem('dishes', JSON.stringify(state.dishes));
    },
    modifyDishe({state, commit}, dishe){
      localStorage.removeItem('dishes');
      let indexDisheToModify = state.dishes.findIndex((el) => el.id === dishe.id);
      commit('modify', {
        index: indexDisheToModify, 
        dishe: dishe
      })
      localStorage.setItem('dishes', JSON.stringify(state.dishes));
    }
  }
}


  export default tasks