<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Prestashop Exercice
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu de navigation</q-item-label>
        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Exercice</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          
              <button @click="reset()">Reset dishes</button>

        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <vue-pull-refresh :on-refresh="onRefresh">
      <router-view />
      </vue-pull-refresh>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import VuePullRefresh from 'vue-pull-refresh';

export default {
  name: "MyLayout",
  components: {
        'vue-pull-refresh': VuePullRefresh
    },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  methods: {
    openURL,
    reset(){
      localStorage.removeItem('dishes');
      location.reload();
    },
     onRefresh: function() {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                  localStorage.removeItem('dishes');
                  location.reload();
                    resolve();
                }, 1000);
            });
        }
  }
};
</script>

<style></style>
