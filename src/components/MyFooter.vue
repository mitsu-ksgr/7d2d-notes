<template>
  <v-footer :padless="true" class="absolute">
    <v-card flat tile width="100%" class="lighten-1 text-center">
      <Logo type="text" />

      <p class="font-weight-light">
        build by <a href="https://twitter.com/mitsukun_sp" target="_blank">mitsukun_sp</a>.
      </p>

      <p class="font-weight-light">
        This website is not affiliated with The Fun Pimps.<br>
        All product names, logos, and brands are property of their respective owners.
      </p>
    </v-card>
  </v-footer>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'MyFooter',

  components: {
    Logo,
  },

  data: () => ({

  }),
};
</script>
