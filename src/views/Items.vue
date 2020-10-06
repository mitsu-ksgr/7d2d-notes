<template>
  <v-container class="items">
    <v-container class="text-center">
      <h1 class="logo-title">Item List</h1>
    </v-container>

    <v-container class="text-center">
      <v-container>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Weapons</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_melee"
                    label="Melee"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_bow"
                    label="Bow"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_gun"
                    label="Gun"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_launcher"
                    label="Launcher"
                    ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_thrown"
                    label="Thrown"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons_thrown"
                    label="Thrown"
                    ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>POI / Internals</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_poi"
                    label="POI"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_internal"
                    label="Internal Item"
                    ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-text-field
          v-model="search_keyname"
          label="Search Key, Name"
          ></v-text-field>
        <v-text-field
          v-model="search_tag"
          label="DEBUG: Filter Tags"
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
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

// TODO: Move libs
function includeAll(list, items) {
  for (let i = 0; i < items.length; ++i) {
    if (!list.includes(items[i])) return false;
  }
  return true;
}

function includeAny(list, items) {
  for (let i = 0; i < items.length; ++i) {
    if (list.includes(items[i])) return true;
  }
  return false;
}

export default {
  name: 'Items',
  components: {
  },

  data: () => ({
    sort_by: '',
    search_keyname: '',
    search_tag: '',

    // Weapons
    contain_weapons_melee: true, // "weapon" && "melee"
    contain_weapons_gun: true, // "gun"
    contain_weapons_launcher: true, // "launcher"
    contain_weapons_bow: true, // "archery" || "crossbow"
    contain_weapons_thrown: true, // "ammo" && "weapon"
    contain_weapons_turret: true, // "turret" || "turretMelee" || "turretRanged"

    // Internal / POI
    contain_poi: false,
    contain_internal: false,
  }),

  computed: {
    listedItems() {
      // Filters
      let items = this.itemList.items.filter((item) => {
        // Weapons
        if (!this.contain_weapons_melee) {
          if (includeAll(item.tags, ['weapon', 'melee'])) return false;
        }
        if (!this.contain_weapons_gun) {
          if (item.tags.includes('gun')) return false;
        }
        if (!this.contain_weapons_launcher) {
          if (item.tags.includes('launcher')) return false;
        }
        if (!this.contain_weapons_bow) {
          if (includeAny(item.tags, ['archery', 'crossbow'])) return false;
        }
        if (!this.contain_weapons_thrown) {
          if (includeAll(item.tags, ['ammo', 'weapon'])) return false;
        }
        if (!this.contain_weapons_turret) {
          if (includeAny(item.tags, ['turret', 'turretMelee', 'turretRanged'])) return false;
        }

        // POI / Internals
        if (!this.contain_internal && item.is_internal_item) return false;
        if (!this.contain_poi && item.is_poi) return false;

        return true;
      });

      // key, name en/ja
      if (this.search_keyname !== '') {
        items = items.filter((item) => {
          const skey = this.search_keyname.toLowerCase();
          if (item.key.toLowerCase().includes(skey)) return true;
          if (item.name_en.toLowerCase().includes(skey)) return true;
          if (item.name_ja.toLowerCase().includes(skey)) return true;
          return false;
        });
      }

      // debug
      if (this.search_tag !== '') {
        const tags = this.search_tag.split(',');
        items = items.filter((item) => includeAll(item.tags, tags));
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
