<template>
  <v-container class="item">
    <v-container class="text-center">
      <h1 class="logo-title">
        {{ item.name_en }}
      </h1>
    </v-container>

    <v-container class="align-center">
      <v-row justify="center">
        <v-img
          v-bind:src="item.icon_file_path"
          max-height="160"
          max-width="160"
          ></v-img>
      </v-row>
    </v-container>

    <v-container class="align-center">
      <v-row justify="center">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left">Key</td>
                <td class="text-left">{{ item.key }}</td>
              </tr>
              <tr>
                <td class="text-left">Name (en)</td>
                <td class="text-left">{{ item.name_en }}</td>
              </tr>
              <tr>
                <td class="text-left">Name (ja)</td>
                <td class="text-left">{{ item.name_ja }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>

    <v-container class="align-center">
      <v-row justify="center">
        <h3>Tags</h3>
      </v-row>
      <v-row justify="center">
        <ul>
          <li v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'Item',
  props: {},

  components: {},

  data() {
    const itemKey = this.$route.params.key;
    const { itemList } = this.$store.state;

    const item = itemList.findItemByKey(itemKey);

    return {
      item, itemKey,
    };
  },

  methods: {
  },
};
</script>
