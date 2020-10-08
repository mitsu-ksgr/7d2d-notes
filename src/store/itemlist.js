/**
 * itemlist.js
 *
 * Manage itemlist.
 */

const jsonItemList = require('@/assets/json/items.min.json');

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

function isInternalItem(item) {
  if (item.key.toLowerCase().includes('random')) return true;
  if (item.key.toLowerCase().includes('helper')) return true;
  return false;
}

function isPOI(item) {
  if (item.key.endsWith('POI')) return true;
  if (item.name_en.includes('(POI)')) return true;
  return false;
}

function isAdminTool(item) {
  if (item.tags.includes('admin')) return true;
  if (item.name_en.startsWith('Dev:')) return true;
  return false;
}

function isBlock(item) {
  if (item.tags.includes('block')) return true;
  if (item.key === 'solarCell') return true;
  return false;
}

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
      is_internal_item: isInternalItem(item),
      is_poi: isPOI(item),
      is_block: isBlock(item),
      is_admin_tool: isAdminTool(item),
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

  filterByContainAnyTags(tags) {
    return this.items.filter((item) => {
      for (let i = 0; i < item.tags.length; ++i) {
        if (tags.includes(item.tags[i])) return true;
      }
      return false;
    });
  }
}
