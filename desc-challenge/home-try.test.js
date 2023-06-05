// const storeBooks = require("./home-try");
const storeBooks = require("./recursion-approach");

describe("storeBooks", () => {
  // Test case 1: Testing with a single item
  test("should not have a children field for a single item", () => {
    const input = [{ id: "1" }];
    const expectedOutput = [{ id: "1" }];
    expect(storeBooks(input)).toEqual(expectedOutput);
  });

  // Test case 2: Testing with multiple items at the same level
  test("should not have a children field for items at the same level", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const expectedOutput = [{ id: "1" }, { id: "2" }, { id: "3" }];
    expect(storeBooks(input)).toEqual(expectedOutput);
  });

  // Test case 3: Testing with nested items and variations of the input
  test("should transform the input correctly with nested items", () => {
    const input = [
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
    const expectedOutput = [
      {
        id: "1",
        children: [
          {
            id: "1.1",
            children: [{ id: "1.1.1" }, { id: "1.1.2" }],
          },
          {
            id: "1.2",
            children: [
              {
                id: "1.2.1",
                children: [{ id: "1.2.1.1" }],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        children: [{ id: "2.1" }],
      },
    ];
    expect(storeBooks(input)).toEqual(expectedOutput);
  });

  // Test case 4: Testing with additional variations of the input
  test("should transform the input correctly with additional variations", () => {
    const input = [
      { id: "3" },
      { id: "3.1" },
      { id: "4" },
      { id: "4.1" },
      { id: "4.1.1" },
    ];
    const expectedOutput = [
      { id: "3", children: [{ id: "3.1" }] },
      { id: "4", children: [{ id: "4.1", children: [{ id: "4.1.1" }] }] },
    ];
    expect(storeBooks(input)).toEqual(expectedOutput);
  });
});
