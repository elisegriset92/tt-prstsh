<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>
    </q-card-section>

    <q-card-section v-if="action === 'modify'">
      <div class="row q-mb-md">
        <q-input filled v-model="disheName" label="Nom (Burger)" class="col" />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="disheDescription"
          label="Description"
          type="textarea"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="disheImage"
          label="URL de l'image"
          class="col"
        />
        <q-img
          :src="disheImage ? disheImage : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="disheNote" size="2em" color="orange" />
        </div>
      </div>
    </q-card-section>


    <q-card-section v-else>
      <div class="row q-mb-md">
        <q-input filled v-model="dishe.nom" label="Nom (Burger)" class="col" />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.description"
          label="Description"
          type="textarea"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.image"
          label="URL de l'image"
          class="col"
        />
        <q-img
          :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="dishe.note" size="2em" color="orange" />
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" @click="toggleForm('close')" />
      <q-btn label="Sauver" @click="checkForm" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

export default {
props: {
  modification: Boolean,
  action: String
},
  data() {
    return {
      dishe: {
        nom: '',
        description: null,
        note: 1,
        image: ""
      },
      errors: [],
    };

  },
  computed: {
    ...mapGetters([
      'prefilledForm'
    ]),
    disheName: {
      get() {
        return this.prefilledForm.nom ? this.prefilledForm.nom : ''
      },
      set(value) {
         this.modifyDishe({...this.prefilledForm,
        nom: value})
      }
    },
    disheDescription: {
      get() {
        return this.prefilledForm.description ? this.prefilledForm.description : ''
      },
      set(value) {
         this.modifyDishe({...this.prefilledForm,
        description: value})
      }
    },
    disheImage: {
      get() {
        return this.prefilledForm.image ? this.prefilledForm.image : ''
      },
      set(value) {
         this.modifyDishe({...this.prefilledForm,
        image: value})
      }
    },
    disheNote: {
      get() {
        return this.prefilledForm.note ? this.prefilledForm.note : ''
      },
      set(value) {
        this.modifyDishe({...this.prefilledForm,
        note: value})
      }
    },
  },
  methods: {
      ...mapActions([
      'addDishe',
      'toggleForm',
      'modifyDishe'
    ]),
      checkForm() {
        if (this.action === 'modify') {
          if (this.disheName && this.disheName.length <= 20) {
            this.toggleForm('close');
        }
        this.errors = [];

      if (!this.disheName) {
        this.errors.push('Name required with less than 20 characters.');
      }
      if (this.disheDescription && this.disheDescription.length > 135) {
        this.errors.push('Description should be less than 135 characters.');
      }
      } else {
        if (this.dishe.nom && this.dishe.nom.length <= 20) {
          this.addDishe(this.dishe)
            this.toggleForm('close');
        }
        this.errors = [];

      if (!this.dishe.nom) {
        this.errors.push('Name required with less than 20 characters.');
      }
      if (this.dishe.description && this.dishe.description.length > 135) {
        this.errors.push('Description should be less than 135 characters.');
      }
      }

      
  }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
