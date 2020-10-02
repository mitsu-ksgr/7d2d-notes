<template>
  <v-container class="logo">
    <div v-if="type == 'title'">
      <h1>{{ logoText}}</h1>
    </div>
    <div v-else-if="type == 'text'">
      <span>{{ logoText}}</span>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'title',
      validator: (t) => ['title', 'text'].includes(t),
    },
  },

  data: () => ({
    logoText: 'Note: 7d2d',
  }),
};
</script>

<style lang="scss" scope>
.logo {
  h1 {
    font-size: 6rem;
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
