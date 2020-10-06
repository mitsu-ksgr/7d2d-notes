<template>
  <v-container class="logo">
    <div v-if="type == 'title'">
      <h1 class="logo-title">{{ appName }}</h1>
    </div>
    <div v-else-if="type == 'text'">
      <span class="logo-text">{{ appName }}</span>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    type: {
      type: String,
      default: 'title',
      validator: (t) => ['title', 'text'].includes(t),
    },
  },

  computed: mapState({
    appName: (state) => state.appName,
  }),
};
</script>
