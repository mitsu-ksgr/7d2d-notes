<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Logo />
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo.vue';

export default {
  name: 'Home',
  components: {
    Logo,
  },
};
</script>
