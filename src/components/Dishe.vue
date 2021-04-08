<template>
  <q-card class="card">
    <q-img  :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.nom }} 
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section v-if="dishe.description">
      {{ dishe.description }}
    </q-card-section>
    <q-card-section v-else style="font-style:italic">
      Aucune description fournie
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="disheToModify(dishe)"  icon="edit" color="blue" flat
        >Modifier</q-btn
      >
      <q-btn icon="delete" @click="confirmBeforeDelete(dishe)" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <!-- <q-dialog v-model="formStatus">
      <form-dishe action="modify"  />
    </q-dialog> -->
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ["dishe"],
  
  components: {
    "form-dishe": require("components/FormDishe.vue").default
  },
  computed: {
    ...mapGetters([
      'formStatus'
    ])
  },
  methods: {
     ...mapActions([
      'deleteDishe',
      'modifyDishe',
      'toggleForm'

    ]),

    confirmBeforeDelete(dishe) {
     if (confirm('Are you sure you want to delete ' + dishe.nom)){
       this.deleteDishe(dishe)
      } 
    },

    disheToModify(dishe) {
      this.toggleForm(dishe);
    }
  }
};
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
