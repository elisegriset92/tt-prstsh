<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">

      <dishe v-for="dishe in this.dishesIsStore" :key="dishe.id" :dishe="dishe"  />

      <add-button @click="toggleForm('open')" />

      <q-dialog v-model="formStatus">
        <form-dishe :action="actionForm" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
 
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default
  },
   computed: {
    ...mapGetters([
      'dishesIsStore',
      'formStatus',
      'actionForm'
    ])
  },
 
  methods: {
    ...mapActions([
      'toggleForm'
    ])
  }

};
</script>
