<template>
  <v-container class="about">
    <v-container class="text-center">
      <h1 class="display-2 font-weight-bold mb-3">
        <Logo />
      </h1>
    </v-container>

    <v-container class="text-center">
      <h2>About</h2>
      <p class="subheading font-weight-regular">
        Notebook about
        <a href="https://store.steampowered.com/app/251570/7_Days_to_Die/" target="_blank">
          7 Days to die.
        </a>
      </p>

      <p>
        This website shows data that will help you survive world of 7Days To Die.
      </p>

      <p>
        <!-- TODO: Ref to config -->
        Target 7Days To Die version ... a19<br>
        Site version ... 0.1.0
      </p>
    </v-container>

    <v-container class="text-center">
      <h2>Maintainer</h2>

      <p>
        This website build by
        <a href="https://twitter.com/mitsukun_sp" target="_blank">mitsukun_sp</a>.

        <br>
        If you have any question or problems, please message me on twitter :)
      </p>
    </v-container>

    <v-container class="text-center">
      <h2>Build with</h2>

      <v-list-item v-for="item in build_with" :key="item.name">
        <v-list-item-content>
          <v-list-item-title>
            <a :href="item.link" target="_blank">{{ item.name }}</a>
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>

    <v-container class="text-center">
      <h2>Notice</h2>

      <p>
        This website is not affiliated with The Fun Pimps.<br>
        All product names, logos, and brands are property of their respective owners.
      </p>
    </v-container>
  </v-container>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'About',
  components: {
    Logo,
  },

  data: () => ({
    build_with: [
      {
        name: 'Vue.js',
        link: 'https://vuejs.org/index.html',
        desc: 'JS Framework',
      },
      {
        name: 'Vuetify',
        link: 'https://vuetifyjs.com/en/',
        desc: 'Material Design Framework',
      },
    ],
  }),
};
</script>
