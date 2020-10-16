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

    <!-- Recipes -->
    <v-container>
      <v-row justify="center">
        <h3>Recipes</h3>
      </v-row>
      <v-row justify="center">
        <v-treeview
          v-model="tree"
          :items="recipes"
          activatable
          item-key="key"
          open-on-click>

          <template v-slot:prepend="{ item }">
            <div>
              <div :class="item.icon_class"></div>
            </div>
          </template>
          <template v-slot:append="{ item }">
            <div>x{{ item.count }}</div>
          </template>
        </v-treeview>
      </v-row>
    </v-container>

    <!-- Ingredients of -->
    <v-container v-if="inglist.length > 0">
      <v-row justify="center">
        <h3>Ingredients of</h3>
      </v-row>
      <v-row justify="center">
        <v-list>
         <v-list-item v-for="item in inglist" :key="item.key">
           <v-list-item-icon>
             <div :class="item.icon_class"></div>
           </v-list-item-icon>
           <v-list-item-content>
             {{ item.key }}
           </v-list-item-content>
         </v-list-item>
        </v-list>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
function buildRecipe(jsonRecipes, itemList) {
  const recipes = [];

  let idx = 1; // for key.
  jsonRecipes.forEach((recipe) => {
    const item = itemList.findItemByKey(recipe.name);
    const r = {
      key: `recipe-${idx}`,
      name: recipe.name,
      count: recipe.count,
      craft_time: recipe.craft_time,
      icon_class: item.thumbs_css_class,
    };

    if (recipe.craft_area) {
      r.craft_icon = `sprite-thumbs-${recipe.craft_area}`;
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
      const children = [];
      recipe.ingredients.forEach((ing) => {
        const ingItem = itemList.findItemByKey(ing.name);

        let iconClass = '';
        if (ingItem) {
          iconClass = ingItem.thumbs_css_class;
        } else {
          // TODO: if ing.name is 'unit_xxx', ingItem is null.
          //       'unit_xxx' is forge item, so use the forge image for now.
          iconClass = 'sprite-thumbs-forge';
        }

        children.push({
          key: `recipe-ing-${ing.name}`,
          name: ing.name,
          count: ing.count,
          icon_class: iconClass,
          children: buildRecipe(ing.recipes, itemList),
        });
      });
      r.children = children;
    }

    recipes.push(r);
    idx += 1;
  });

  return recipes;
}

export default {
  name: 'Item',
  props: {},

  components: {},

  data() {
    const itemKey = this.$route.params.key;
    const { itemList } = this.$store.state;

    const item = itemList.findItemByKey(itemKey);

    return {
      item, itemKey, recipes: [], tree: [], inglist: [],
    };
  },

  mounted() {
    const { itemList } = this.$store.state;

    const req = new XMLHttpRequest();
    req.open('GET', `/json/recipes/${this.itemKey}.json`, true);
    req.onreadystatechange = () => {
      if (req.readyState !== 4 || req.status !== 200) return;
      const jsonRecipes = JSON.parse(req.responseText);
      this.recipes = buildRecipe(jsonRecipes, itemList);
    };
    req.send();

    const reqIng = new XMLHttpRequest();
    reqIng.open('GET', `/json/ingredients/${this.itemKey}.json`, true);
    reqIng.onreadystatechange = () => {
      console.log('===== reqIng =====');
      console.log(`reqIng URL: /json/ingredients/${this.itemKey}.json`);
      console.log(`reqIng.readyState = ${reqIng.readyState}`);
      console.log(`reqIng.status     = ${reqIng.status}`);

      if (reqIng.readyState !== 4 || reqIng.status !== 200) {
        return;
      }

      this.inglist = [];
      try {
        const jsonInglist = JSON.parse(reqIng.responseText);
        jsonInglist.forEach((elem) => {
          const item = itemList.findItemByKey(elem);

          this.inglist.push({
            key: elem,
            icon_class: item.thumbs_css_class,
            name_ja: item.name_ja,
            name_en: item.name_en,
          });
        });
      } catch (e) {
        // item that is not ingredient for something, response will be html page.
      }
    };
    reqIng.send();
  },

  methods: {
  },
};
</script>
