<template>
  <v-container class="home">
    <v-container class="text-center">
      <h1 class="display-2 font-weight-bold mb-3">
        <Logo />
      </h1>

      <p class="font-weight-medium">
        Notebook about
        <a href="https://store.steampowered.com/app/251570/7_Days_to_Die/" target="_blank">
          7 Days to die.
        </a>
      </p>
    </v-container>

    <v-container class="text-center">
      <p>
        <!-- TODO: Ref to config -->
        7daystodie version ... a19
        <br>Site Version ... 0.1.0
      </p>

      <!--

        TODO: Add to contents

      -->
   </v-container>
  </v-container>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'Home',
  components: {
    Logo,
  },

  data: () => ({
  }),
};
</script>
