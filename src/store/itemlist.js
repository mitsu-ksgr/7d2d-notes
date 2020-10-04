/**
 * itemlist.js
 *
 * Manage itemlist.
 */
/*
  [
    {
        "key": "meleeToolRepairT1ClawHammer",
        "icon_file_name": "meleeToolRepairT1ClawHammer.png",
        "name_en": "Claw Hammer",
        "name_ja": "くぎ抜きハンマー",
        "tags": [
            "melee",
            "light",
            "tool",
            "attStrength",
            "perkMiner69r",
            "perkMotherLode",
            "canHaveCosmetic"
        ],
        "unlocked_by": [
            "perkMiner69r",
            "meleeToolIronSetSchematic"
        ]
      },
      // ....
    ]
*/

function isEmpty(str) {
  return (!str || str.length === 0);
}

function validateItem(item) {
  // Invalid: missing names.
  if (isEmpty(item.name_ja) || isEmpty(item.name_en)) {
    return false;
  }

  // Invalid: missingIcon.
  if (item.icon_file_name === 'missingIcon.png') {
    return false;
  }

  // Invalid: missing icon file name.
  if (isEmpty(item.icon_file_name)) {
    return false;
  }

  return true;
}

const jsonItemList = require('@/assets/json/items.min.json');

const complementItemList = () => {
  const ret = []; // deep copy.
  let idx = 0;

  jsonItemList.forEach((item) => {
    if (!validateItem(item)) {
      return;
    }

    ret.push({
      id: idx,
      icon_file_path: `/imgs/items/${item.icon_file_name}`,
      thumbs_css_class: `sprite-thumbs-${item.icon_file_name.slice(0, -4)}`,
      is_block: item.tags.includes('block'),
      ...item,
    });
    idx += 1;
  });

  return ret;
};

export default class ItemList {
  constructor() {
    this.items = complementItemList();
  }

  findItemByKey(key) {
    return this.items.find((item) => item.key === key);
  }

  sortBy(attr) {
    return this.items.sort((a, b) => {
      if (a[attr] > b[attr]) return 1;
      if (a[attr] < b[attr]) return -1;
      return 0;
    });
  }
}
