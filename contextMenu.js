import OBR from "@owlbear-rodeo/sdk";

const ID = "com.KSabi.initiative-tracker";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
        {
          icon: "/add.svg",
          label: "Add to Initiative",
          filter: {
            every: [
              { key: "layer", value: "CHARACTER" },
              { key: ["metadata", `${ID}/metadata`], value: undefined },
            ],
          },
        },
        {
          icon: "/remove.svg",
          label: "Remove from Initiative",
          filter: {
            every: [{ key: "layer", value: "CHARACTER" }],
          },
        },
      ],
      onClick(context) {
        const addToInitiative = context.items.every(
          (item) => item.metadata[`${ID}/metadata`] === undefined
        );
        if (addToInitiative) {
          //const initiative = window.prompt("Enter the initiative value");
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              item.metadata[`${ID}/metadata`] = {
                initiative : 1,
                HP : 4,
                MaxHP : 4,
                TempHP : 0,
                ShowHP : false,
                ShowHPBar : true,
              };
            }
          });
        } else {
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              delete item.metadata[`${ID}/metadata`]
            }
          });
        }
      },
  });
}