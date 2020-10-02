<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <Logo type="text" />
        </v-list-item-title>
        <v-list-item-subtitle>
          Target : 7DayToDie {{ target7d2dVersion }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          Site version: {{ appVersion }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Logo from '@/components/Logo.vue';

export default {
  components: {
    Logo,
  },

  data: () => ({
    items: [
      {
        title: 'Home',
        icon: 'mdi-home',
        link: '/',
      },
      {
        title: 'Items',
        icon: 'mdi-file-document-multiple-outline',
        link: '/items',
      },
      {
        title: 'About',
        icon: 'mdi-information-variant',
        link: '/about',
      },
    ],
    right: null,
  }),

  computed: mapState({
    appVersion: (state) => state.appVersion,
    target7d2dVersion: (state) => state.target7d2dVersion,
  }),
};
</script>
