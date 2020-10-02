<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <Logo type="text" />
        </v-list-item-title>
        <v-list-item-subtitle>
          7daystodie version: a19
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          Site version: v0.1.0
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
        title: 'About',
        icon: 'mdi-information-variant',
        link: '/about',
      },
    ],
    right: null,
  }),
};
</script>
