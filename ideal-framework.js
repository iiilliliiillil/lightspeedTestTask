// Test steps:
// Click “del” on the “Orange” node.
// Click “del” on the “Apple” node.
// Click “del” on the “Grape” node.

// Expected results:
// “Juice” children are no longer in the list (“Orange”, “Apple”, “Grape”)
// “Beverages” still consist of: “Water”, “Tea”, “Coffee”, “Juice”.
// The rest of the tree is not affected.

import { framework, testCase, takeLook, expect } from "ideal-framework";

await framework.navigate(TEST_URL);

const rootNode = framework.findElementByText("Beverages");
const initialTreeStructure = rootNode.getFlattenedTextNodeTree();

testCase("Remove node children separately", () => {
  const labels = ["Orange", "Apple", "Grape"];
  const elements = labels.map((e) => framework.findElementByText(e));

  elements.forEach((el) => el.click());

  takeLook("should remove all children", () => {
    const doesAnyElementExistOnPage = elements.any((e) => e.doesExist());
    expect(doesAnyElementExistOnPage).toBeFalsy();
  });

  takeLook("should not delete a parent node", () => {
    expect(framework.findElementByText("Juice")).toBeTruthy();
  });

  takeLook("should not affect the rest of the tree", () => {
    const actualRootNode = framework.findElementByText("Beverages");
    const actualTreeStructure = actualRootNode.getFlattenedTextNodeTree();

    const expectedTreeStructure = initialTreeStructure.clone();
    expectedTreeStructure.children.find(
      (child) => child.label === "Juice"
    ).children = [];

    expect(actualTreeStructure).toEqual(expectedTreeStructure);

    // expectedTreeStructure:

    // expect(actualTreeStructure).toEqual({
    //   label: "Beverages",
    //   children: [
    //     {
    //       label: "Water",
    //       children: [],
    //     },
    //     {
    //       label: "Coffee",
    //       children: [
    //         {
    //           label: "Espresso",
    //           children: [],
    //         },
    //         {
    //           label: "Cappuccino",
    //           children: [],
    //         },
    //         {
    //           label: "Mocha",
    //           children: [],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Tea",
    //       children: [
    //         {
    //           label: "Black Tea",
    //           children: [],
    //         },
    //         {
    //           label: "White Tea",
    //           children: [],
    //         },
    //         {
    //           label: "Green Tea",
    //           children: [
    //             {
    //               label: "Sencha",
    //               children: [],
    //             },
    //             {
    //               label: "Gyokuro",
    //               children: [],
    //             },
    //             {
    //               label: "Matcha",
    //               children: [],
    //             },
    //             {
    //               label: "Pi Lo Chun",
    //               children: [],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: "Juice",
    //       children: [],
    //     },
    //   ],
    // });
  });
});
