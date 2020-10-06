<template>
  <v-container class="items">
    <v-container class="text-center">
      <h1 class="logo-title">Item List</h1>
    </v-container>

    <v-container class="text-center">
      <v-container>
        <v-text-field
          v-model="search_by"
          label="Search"
          ></v-text-field>
      </v-container>

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
            <tr v-for="item in listedItems" :key="item.key">
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
    search_by: '',
  }),

  computed: {
    listedItems() {
      let { items } = this.itemList;

      if (this.search_by !== '') {
        items = items.filter((item) => {
          if (item.key.toLowerCase().includes(this.search_by)) return true;
          if (item.name_en.toLowerCase().includes(this.search_by)) return true;
          if (item.name_ja.toLowerCase().includes(this.search_by)) return true;
          return false;
        });
      }

      if (this.sort_by !== '') {
        items.sort((a, b) => {
          if (a[this.sort_by] > b[this.sort_by]) return 1;
          if (a[this.sort_by] < b[this.sort_by]) return -1;
          return 0;
        });
      }

      return items;
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
