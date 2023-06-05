const storeBooks = (data) => {
  const result = [];
  const l1Store = {};
  const l2Store = {};
  const l3Store = {};

  data.forEach((_item) => {
    const item = _item.id;
    const itemElements = item.split(".");

    if (itemElements.length === 1) {
      l1Store[item] = { id: item };
    } else if (itemElements.length === 2) {
      const formattedItem = { id: item };
      const parentId = `${itemElements[0]}`;
      l2Store[item] = { id: item, parent: parentId };

      if (!(parentId in l1Store)) {
        l1Store[parentId] = { id: parentId, children: [] };
      } else if (!l1Store[parentId].children) l1Store[parentId].children = [];

      l1Store[parentId].children.push(formattedItem);
    } else if (itemElements.length === 3) {
      const formattedItem = { id: item };
      const parentId = `${itemElements[0]}.${itemElements[1]}`;
      l3Store[item] = { id: item, parent: parentId };

      if (!(parentId in l2Store)) {
        l2Store[parentId] = {
          id: parentId,
          parent: `${itemElements[0]}`,
          children: [],
        };
      } else if (!l2Store[parentId].children) l2Store[parentId].children = [];

      l2Store[parentId].children.push(formattedItem);
    } else if (itemElements.length === 4) {
      const formattedItem = { id: item };

      const parentId = `${itemElements[0]}.${itemElements[1]}.${itemElements[2]}`;
      if (!(parentId in l3Store)) {
        l3Store[parentId] = {
          id: parentId,
          parent: `${itemElements[0]}.${itemElements[1]}`,
          children: [],
        };
      } else if (!l3Store[parentId].children) l3Store[parentId].children = [];

      l3Store[parentId].children.push(formattedItem);
    }
  });

  // add l3 items to l2
  for (let l3Item in l3Store) {
    const item = l3Store[l3Item];
    const parent = item.parent;
    delete item.parent;

    const targetIndex = l2Store[parent].children.findIndex(
      (_item) => _item.id === item.id
    );

    if (targetIndex === -1) {
      l2Store[parent].children.push(item);
    } else {
      l2Store[parent].children[targetIndex] = item;
    }
  }

  // add l2 items to l1
  for (let l2Item in l2Store) {
    const item = l2Store[l2Item];
    const parent = item.parent;
    delete item.parent;

    const targetIndex = l1Store[parent].children.findIndex(
      (_item) => _item.id === item.id
    );

    if (targetIndex === -1) {
      l1Store[parent].children.push(item);
    } else {
      l1Store[parent].children[targetIndex] = item;
    }
  }

  // l1 items to an array
  for (let l1Item in l1Store) {
    const item = l1Store[l1Item];
    result.push(item);
  }

  return result;
};

// storeBooks(testInput);
module.exports = storeBooks;
