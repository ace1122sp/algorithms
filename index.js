/* Input
[
{ id: '1' }, ->
{ id: '1.1' },
{ id: '1.1.1' },
{ id: '1.1.2' },
{ id: '1.2' },
{ id: '1.2.1' },
{ id: '1.2.1.1' },
{ id: '2' },
{ id: '2.1' }
]
*/

const output = [
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
