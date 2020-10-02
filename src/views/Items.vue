<template>
  <v-container class="items">
    <v-container class="text-center">
      <h1 class="display-2 font-weight-bold mb-3">
        Item List
      </h1>
    </v-container>

    <v-container class="text-center">
      <v-simple-table height="500px" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Icon</th>
              <th class="text-left">Key</th>
              <th class="text-left">Name (en)</th>
              <th class="text-left">Name (ja)</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in itemList.items" :key="item.key">
              <td>
                <img :src="item.icon_file_path" width="50" height="50">
              </td>
              <td class="text-left">{{ item.key }}</td>
              <td class="text-left">{{ item.name_en }}</td>
              <td class="text-left">{{ item.name_ja }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Items',
  components: {
  },

  data: () => ({
  }),

  computed: mapState({
    itemList: (state) => state.itemList,
  }),
};
</script>
