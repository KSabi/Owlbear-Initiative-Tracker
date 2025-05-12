import OBR from "@owlbear-rodeo/sdk";
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
          name: item.name,
          imageUrl: item.image.url,
          HP: metadata.HP,
          MaxHP: metadata.MaxHP,
          TempHP: metadata.TempHP,
          ShowHP: metadata.ShowHP,
          ShowHPBar: metadata.ShowHPBar
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
      for (const initiativeItem of sortedItems) {
        const node = document.createElement("table");
      //node.innerHTML = `${initiativeItem.name} (${initiativeItem.initiative})`;
        if(role === "GM"){
            node.innerHTML = generateGMInitiativeNode(initiativeItem);
        }else{
            node.innerHTML = generatePlayerInitiativeNode(initiativeItem);
        }
        nodes.push(node);
      }
      element.replaceChildren(...nodes);
      updateData(element.querySelectorAll("input"));
    });
  };
  OBR.scene.items.onChange(renderList);
}
