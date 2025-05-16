
const ID = "com.KSabi.initiative-tracker";

export function generateGMInitiativeNode(initiativeItem) {
    const itemID = ID + "/" + initiativeItem.id +"/";
    var htmlContent = "<tr>";
    htmlContent += `<td><input type="textbox" id="${itemID}initiative" value="${initiativeItem.initiative}" style="width:30px"/></td><td><input type="textbox" id="${itemID}name" value="${initiativeItem.name}" style="width:100px"/></td>`;
    htmlContent += `<td><input type="textbox" id="${itemID}hp" value="${initiativeItem.HP}" style="width:50px"/></td><td><input type="textbox" id="${itemID}maxhp" value="${initiativeItem.MaxHP}" style="width:50px"/></td>`;
    htmlContent += `<td><input type="textbox" id="${itemID}temphp" value="${initiativeItem.TempHP}" style="width:50px"/></td>`;
    htmlContent += `<td><input type="checkbox" id="${itemID}showhp" ${initiativeItem.ShowHP ? "checked" : ""}/></td><td><input type="checkbox" id="${itemID}showhpbar" ${initiativeItem.ShowHPBar ? "checked" : ""}/></td>`;
    //htmlContent += `<td><input type="number" id=${itemID}modhp value="" style="width:50px"/></td>`; 
    htmlContent += "</tr>";
    return htmlContent;
}