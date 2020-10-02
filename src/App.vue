<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <Drawer/>
    </v-navigation-drawer>

    <v-app-bar app color="purple darken-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex align-center"><Logo type="text"/></div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <MyFooter />
  </v-app>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Drawer from '@/components/Drawer.vue';
import MyFooter from '@/components/MyFooter.vue';

export default {
  name: 'App',

  components: {
    Logo,
    Drawer,
    MyFooter,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
