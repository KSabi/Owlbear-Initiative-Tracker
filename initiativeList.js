import OBR, { isImage } from "@owlbear-rodeo/sdk";
import { generatePlayerInitiativeNode } from "./generatePlayerInitiativeNode";
import { generateGMInitiativeNode } from "./generateGMInitiativeNode";
import { updateData } from "./updateData";

const ID = "com.KSabi.initiative-tracker";

export function setupInitiativeList(element) {
  const renderList = (items) => {
    // Get the name and initiative of any item with
    // our initiative metadata
    const initiativeItems = [];
    for (const item of items) {
      const metadata = item.metadata[`${ID}/metadata`];
      if (metadata) {
        initiativeItems.push({
          id: item.id,
          initiative: metadata.initiative,
          name: item.text.plainText || item.name,
          imageUrl: item.image.url,
          HP: metadata.HP,
          MaxHP: metadata.MaxHP,
          TempHP: metadata.TempHP,
          ArmorClass: metadata.ArmorClass,
          ShowHP: metadata.ShowHP,
          ShowHPBar: metadata.ShowHPBar,
          visible: item.visible,
          isTurn: metadata.IsTurn
        });
      }
    }
    // Sort so the highest initiative value is on top
    const sortedItems = initiativeItems.sort(
      (a, b) => parseFloat(b.initiative) - parseFloat(a.initiative)
    );
    // Create new list nodes for each initiative item
    
    OBR.player.getRole().then((role) => {
      const nodes = [];
      if (role === "GM") {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => prevItem(sortedItems));

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => nextItem(sortedItems));

        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.addEventListener("click",() => resetCombat(sortedItems));

        nodes.push(prevButton, nextButton, resetButton);
      }
      for (const initiativeItem of sortedItems) {
        //const node = document.createElement("table");
        //console.log("Current Item:", initiativeItem.name, initiativeItem.isTurn)
        const node = document.createElement("table");
        if(role === "GM"){
            node.innerHTML = generateGMInitiativeNode(initiativeItem);
        }else{
            node.innerHTML = generatePlayerInitiativeNode(initiativeItem);
        }
        if(initiativeItem.isTurn) {
          node.style = "background-image: linear-gradient(violet, purple);border-radius:10px";
        }
        nodes.push(node);
      }
      element.replaceChildren(...nodes);
      updateData(element.querySelectorAll("input"));
    });
  };
  OBR.scene.items.onChange(renderList);
}

function nextItem(sortedList) {
  let index = sortedList.findIndex((i) => i.isTurn)
  let oldid = "";
  let newid = "";
  if(index < 0) {
    newid = sortedList[0].id; //No item is defined as current turn; set to the first.
  } else {
    oldid = sortedList[index].id;
    index = index < sortedList.length - 1 ? index + 1 : 0;
    newid = sortedList[index].id;
  }
  if(oldid !== "") {
    OBR.scene.items.updateItems([oldid], (items) => {
      items[0].metadata[`${ID}/metadata`].IsTurn = false;
      return;
    });
  }
  OBR.scene.items.updateItems([newid], (items) => {
    items[0].metadata[`${ID}/metadata`].IsTurn = true
  });
  return;
}

function prevItem(sortedList) {
  let index = sortedList.findIndex((i) => i.isTurn)
  let oldid = "";
  let newid = "";
  if(index < 0) {
    newid = sortedList[0].id; // If isTurn is not found, set to first
  } else {
    oldid = sortedList[index].id; //Get current turn to set to false
    index = index >  0 ? index - 1 : sortedList.length - 1; //Get Previous item in list
    newid = sortedList[index].id;
  }
  if (oldid !== "") {
    OBR.scene.items.updateItems([oldid], (items) => {
      items[0].metadata[`${ID}/metadata`].IsTurn = false
    });
  }
  OBR.scene.items.updateItems([newid], (items) => {
    items[0].metadata[`${ID}/metadata`].IsTurn = true
  });
  return;
}

function resetCombat(sortedList) {
  OBR.scene.items.updateItems((i) => sortedList.find((si) => si.id == i.id), (items) => {
    for (let item of items) {
      item.metadata[`${ID}/metadata`].IsTurn = false;
    }
  })
}