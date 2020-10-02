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
        Target 7Days To Die version ... {{ target7d2dVersion }}<br>
        Site version ... {{ appVersion }}
      </p>
    </v-container>

    <v-container class="text-center">
      <h2 class="sub-headline">Contents</h2>

      <v-list-item v-for="item in contents" :key="item.title">
        <v-list-item-content>
          <v-list-item-title>
            <h3>
              <v-icon>{{ item.icon }}</v-icon>&nbsp;
              <a :href="item.link">{{ item.title}}</a>
            </h3>
          </v-list-item-title>
          <v-list-item-subtitle class="text-h6">
            {{ item.desc }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>

  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Logo from '@/components/Logo.vue';

export default {
  name: 'Home',
  components: {
    Logo,
  },

  data: () => ({
    contents: [
      {
        icon: 'mdi-file-document-multiple-outline',
        title: 'Item List',
        link: '/items',
        desc: 'show all items',
      },
    ],
  }),

  computed: mapState({
    appVersion: (state) => state.appVersion,
    target7d2dVersion: (state) => state.target7d2dVersion,
  }),
};
</script>

<style lang="scss" scope>
.home {
  h2 {
    font-size: 3rem;
    font-weight: 300;
    line-height: 6rem;
    font-family: 'EB Garamond', serif;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 300;
    line-height: 6rem;
    font-family: 'EB Garamond', serif;

  }
}
</style>
