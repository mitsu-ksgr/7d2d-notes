<template>
  <v-container class="logo">
    <div v-if="type == 'title'">
      <h1>{{ appName }}</h1>
    </div>
    <div v-else-if="type == 'text'">
      <span>{{ appName }}</span>
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

<style lang="scss" scope>
.logo {
  h1 {
    font-size: 4rem;
    font-weight: 300;
    line-height: 6rem;
    font-family: 'EB Garamond', serif;
  }

  span {
    font-size: 1.5em;
    font-family: 'EB Garamond', serif;
  }
}
</style>
