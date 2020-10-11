<template>
  <v-container class="items">
    <v-container class="text-center">
      <h1 class="logo-title">Item List</h1>
    </v-container>

    <v-container class="text-center">
      <v-container>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Filters</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-btn @click="changeAllFlags(true)">Turn ON All</v-btn>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-btn @click="changeAllFlags(false)">Turn OFF All</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_weapons"
                    label="Weapons"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_ammos"
                    label="Ammo"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_tools"
                    label="Tools"
                    ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_apparels"
                    label="Apparel"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_armors"
                    label="Armors"
                    ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_blocks"
                    label="Blocks"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_resources"
                    label="Resources"
                    ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_junks"
                    label="Junks"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_vehicle"
                    label="Vehicle"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_parts"
                    label="Parts"
                    ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_drugs"
                    label="Drugs"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_foods"
                    label="Foods"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_drinks"
                    label="Drinks"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_seeds"
                    label="Seeds"
                    ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_books"
                    label="Books"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_schematics"
                    label="Schematics"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_challenges"
                    label="Challenges"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                  <v-checkbox
                    v-model="contain_dukes"
                    label="Dukes"
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
                    v-model="contain_admin"
                    label="Admin Tool"
                    ></v-checkbox>
                </v-col>
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
          v-model="search_keyname_trigger"
          label="Search Key, Name"
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
              <th class="text-center">Detail</th>
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
              <td class="text-center">
                <router-link :to="{ name: 'Item', params: { key: item.key }}">
                  <v-icon>mdi-file-chart-outline</v-icon>
                </router-link>
              </td>
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
    search_keyname_trigger: '',

    // Filters
    contain_weapons: true,
    contain_ammos: true,
    contain_tools: true,

    contain_apparels: true,
    contain_armors: true,

    contain_blocks: true,
    contain_resources: true,

    contain_junks: true,
    contain_parts: true,
    contain_vehicle: true,

    contain_drugs: true,
    contain_foods: true,
    contain_drinks: true,
    contain_seeds: true,

    contain_books: true,
    contain_schematics: true,
    contain_challenges: true,
    contain_dukes: true,

    // Internal / POI
    contain_poi: false,
    contain_admin: false,
    contain_internal: false,
    // TODO: Dev item.
  }),

  watch: {
    search_keyname_trigger: function(newValue, oldValue) {
      this.debouncedSearchItems();
    },
  },

  created: function() {
    this.debouncedSearchItems = (() => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.search_keyname = this.search_keyname_trigger;
        }, 750);
      };
    })();
  },

  computed: {
    listedItems() {
      // Filters
      let items = this.itemList.items.filter((item) => {
        if (!this.contain_weapons) {
          if (includeAny(item.tags, ['weapon', 'turret', 'turretMelee', 'turretRanged'])) return false;
        }
        if (!this.contain_ammos) {
          if (item.key.startsWith('ammo')) return false;
          if (item.tags.includes('ammo')) return false;
        }
        if (!this.contain_tools) {
          if (item.tags.includes('tool')
            || item.key.startsWith('bucket')
            || (item.key.startsWith('tool') && !item.key.endsWith('Schematic'))
          ) return false;
        }

        if (!this.contain_apparels) {
          if (item.key.startsWith('apparel')) return false;
        }
        if (!this.contain_armors) {
          if (item.key.startsWith('armor')) return false;
        }

        if (!this.contain_blocks) {
          if (item.is_block) return false;
        }
        if (!this.contain_resources) {
          if (item.key.startsWith('resource')) return false;
        }

        if (!this.contain_parts) {
          if (item.tags.includes('junk')) return false;
        }
        if (!this.contain_parts) {
          if (item.key.endsWith('Parts')) return false;
        }
        if (!this.contain_vehicle) {
          if (item.tags.includes('vehicle')
            || item.key.startsWith('vehicle')
          ) return false;
        }

        if (!this.contain_drugs) {
          if (item.tags.includes('medical')
            || item.key.startsWith('drug')
          ) return false;
        }
        if (!this.contain_foods) {
          if (item.tags.includes('food')) return false;
        }
        if (!this.contain_drinks) {
          if (item.key.startsWith('drink')) return false;
        }
        if (!this.contain_seeds) {
          if (item.key.startsWith('planted')
            || item.key.startsWith('treePlanted')
          ) return false;
        }

        if (!this.contain_books) {
          if (item.key.startsWith('book')) return false;
        }
        if (!this.contain_schematics) {
          if (item.key.endsWith('Schematic')) return false;
        }
        if (!this.contain_challenges) {
          if (item.key.startsWith('q_')
            || item.key.startsWith('qc_')
            || item.key.startsWith('qt_')
          ) return false;
        }
        if (!this.contain_dukes) {
          if (item.tags.includes('dukes')
            || item.key === 'noteDuke01'
          ) return false;
        }

        // POI / Internals
        if (!this.contain_internal && item.is_admin_tool) return false;
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
    changeAllFlags(flag) {
      this.contain_weapons = flag;
      this.contain_ammos = flag;
      this.contain_tools = flag;
      this.contain_apparels = flag;
      this.contain_armors = flag;
      this.contain_blocks = flag;
      this.contain_resources = flag;
      this.contain_junks = flag;
      this.contain_parts = flag;
      this.contain_vehicle = flag;
      this.contain_drugs = flag;
      this.contain_foods = flag;
      this.contain_drinks = flag;
      this.contain_seeds = flag;
      this.contain_books = flag;
      this.contain_schematics = flag;
      this.contain_challenges = flag;
      this.contain_dukes = flag;
    },
  },
};
</script>
