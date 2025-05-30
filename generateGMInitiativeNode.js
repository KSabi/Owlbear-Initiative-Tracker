
const ID = "com.KSabi.initiative-tracker";

export function generateGMInitiativeNode(initiativeItem) {
    const itemID = ID + "/" + initiativeItem.id +"/";
    var htmlContent = `<tr>
        <td><input type="textbox" id="${itemID}initiative" value="${initiativeItem.initiative}" style="width:30px"/></td><td colspan="2"><input type="textbox" id="${itemID}name" value="${initiativeItem.visible ? initiativeItem.name : "(H) " + initiativeItem.name}" style="width:100px"/></td>
        <td><input type="textbox" id="${itemID}hp" value="${initiativeItem.HP}" style="width:30px"/></td><td><input type="textbox" id="${itemID}maxhp" value="${initiativeItem.MaxHP}" style="width:30px"/></td>
        <td><input type="textbox" id="${itemID}temphp" value="${initiativeItem.TempHP}" style="width:30px"/></td><td><input type="textbox" id="${itemID}ac" value="${initiativeItem.ArmorClass}" style="width:30px"/></td>
        </tr><tr>
        <td></td><td colspan="2"><input type="checkbox" id="${itemID}showhp" ${initiativeItem.ShowHP ? "checked" : ""}>Show HP</input></td>
        <td colspan="2"><input type="checkbox" id="${itemID}showhpbar" ${initiativeItem.ShowHPBar ? "checked" : ""}>Show Bar</input></td>
        </tr>`;
    //htmlContent += `<td><input type="number" id=${itemID}modhp value="" style="width:50px"/></td>`; 
    return htmlContent;
}