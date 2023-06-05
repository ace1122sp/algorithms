/* PLAN

- [x] traverse the array
- have a hash map
- [] for each element of an aray 
  - [] create an object: { id, children: []}
  - [] see at what level it sits
  - [] if the level is not present -> add a level
  - [] push a child into the array of its parent

- [] store the element into its store
- [] store all l3 into respective l2
- [] store all l2 into respective l1
- return the object
*/

const testInput = [
  { id: "1" },
  { id: "1.1" },
  { id: "1.1.1" },
  { id: "1.1.2" },
  { id: "1.2" },
  { id: "1.2.1" },
  { id: "1.2.1.1" },
  { id: "2" },
  { id: "2.1" },
];

const storeBooks = (data) => {
  const result = [];
  const l1Store = {};
  const l2Store = {};
  const l3Store = {};

  data.forEach((_item) => {
    const item = _item.id;
    const itemElements = item.split(".");

    if (itemElements.length === 1) {
    } else if (itemElements.length === 2) {
      const formattedItem = { id: item };

      const parentId = `${itemElements[0]}`;
      if (!(parentId in l1Store)) {
        l1Store[parentId] = { id: parentId, children: [] };
      }

      l1Store[parentId].children.push(formattedItem);
    } else if (itemElements.length === 3) {
      const formattedItem = { id: item };

      const parentId = `${itemElements[0]}.${itemElements[1]}`;
      if (!(parentId in l2Store)) {
        l2Store[parentId] = {
          id: parentId,
          parent: `${itemElements[0]}`,
          children: [],
        };
      }

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
      }

      l3Store[parentId].children.push(formattedItem);
    }
  });

  // add l3 items to l2
  for (let l3Item in l3Store) {
    const item = l3Store[l3Item];
    const parent = item.parent;
    delete item.parent;
    l2Store[parent].children.push(item);
  }

  // add l2 items to l1
  for (let l2Item in l2Store) {
    const item = l2Store[l2Item];
    const parent = item.parent;
    delete item.parent;
    l1Store[parent].children.push(item);
  }

  // l1 items to an array
  for (let l1Item in l1Store) {
    const item = l1Store[l1Item];
    result.push(item);
  }

  console.log(JSON.stringify(result, null, 2));
  return result;
};

storeBooks(testInput);
