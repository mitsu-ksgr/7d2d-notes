<template>
  <v-container class="items">
    <v-container class="text-center">
      <h1 class="display-2 font-weight-bold mb-3">
        Item List
      </h1>
    </v-container>

    <v-container class="text-center">
      <v-simple-table height="500px" fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th @click="sortBy('id')">Icon</th>
              <th class="text-left" @click="sortBy('key')">Key</th>
              <th class="text-left" @click="sortBy('name_en')">Name (en)</th>
              <th class="text-left" @click="sortBy('name_ja')">Name (ja)</th>
              <th class="text-left">isBlock</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in sortedList" :key="item.key">
              <td>
                <div :class="item.thumbs_css_class"></div>
              </td>
              <td class="text-left">{{ item.key }}</td>
              <td class="text-left">{{ item.name_en }}</td>
              <td class="text-left">{{ item.name_ja }}</td>
              <td class="text-left">{{ item.is_block }}</td>
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
    sort_by: '',
  }),

  computed: {
    sortedList() {
      if (this.sort_by !== '') {
        this.itemList.sortBy(this.sort_by);
      }
      return this.itemList.items;
    },
    ...mapState({
      itemList: (state) => state.itemList,
    }),
  },

  methods: {
    sortBy(attr) {
      this.sort_by = attr;
    },
  },
};
</script>
