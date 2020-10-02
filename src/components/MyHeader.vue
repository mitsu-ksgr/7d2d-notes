<template>
  <v-app-bar app color="purple darken-3">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <Logo />
    </div>
  </v-app-bar>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'MyHeader',

  components: {
    Logo,
  },

  data: () => ({
    //
  }),
};
</script>
