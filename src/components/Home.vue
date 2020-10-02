<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Note: 7d2d.
        </h1>
      </v-col>

      <v-col class="mb-4">
        <p class="subheading font-weight-regular">
          Note about 7 Days to Die.
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Item List
        </h2>

        <v-row justify="center">
          <a
            v-for="(item, i) in itemlist"
            :key="i"
            :href="item.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ item.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    itemlist: [
      {
        text: 'todo1',
        href: 'http://example.com/',
      },
      {
        text: 'todo2',
        href: 'http://example.com/',
      },
      {
        text: 'todo3',
        href: 'http://example.com/',
      },
    ],
  }),
};
</script>
