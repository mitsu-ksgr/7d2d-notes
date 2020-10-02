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
const jsonItemList = require('@/assets/json/items.json');

const complementItemList = () => {
  const ret = jsonItemList;
  for (let i = 0; i < ret.length; ++i) {
    ret[i].icon_file_path = `/imgs/items/${ret[i].icon_file_name}`;
  }
  return ret;
};

export default class ItemList {
  constructor() {
    this.items = complementItemList();
  }

  findItemByKey(key) {
    return this.items.find((item) => item.key === key);
  }
}
