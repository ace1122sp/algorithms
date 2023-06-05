const catalogizeItems = (items) => {
  let itemsCatalogue = [];
  items.forEach((item) => {
    const itemElements = item.id.split(".");
    itemsCatalogue = storeIntoCatalogue(itemsCatalogue, itemElements, 0);
  });

  return itemsCatalogue;
};

const storeIntoCatalogue = (catalogue, itemArr, iterator, idPrefix = "") => {
  const current = itemArr[iterator];
  if (current === undefined) {
    return catalogue;
  }

  const itemId = idPrefix === "" ? current : idPrefix + "." + current;

  let itemIndex = catalogue.findIndex((el) => el.id === itemId);

  if (itemIndex === -1) {
    catalogue.push({ id: itemId });
    itemIndex = catalogue.length - 1;
  }

  const nextIterator = iterator + 1;
  if (nextIterator < itemArr.length) {
    if (!("children" in catalogue[itemIndex]))
      catalogue[itemIndex].children = [];

    catalogue[itemIndex].children = storeIntoCatalogue(
      catalogue[itemIndex].children,
      itemArr,
      iterator + 1,
      itemId
    );
  }

  return catalogue;
};

module.exports = catalogizeItems;
