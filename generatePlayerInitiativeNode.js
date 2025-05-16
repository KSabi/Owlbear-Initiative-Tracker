import { createHPBarSVG } from "./createHPBarSVG";

export function generatePlayerInitiativeNode(initiativeItem) {
  //var htmlContent = `<tr><td rowspan=2> ${initiativeItem.initiative}</td>`;
  let htmlContent = `<td rowspan=2><img src=${initiativeItem.imageUrl} alt=${initiativeItem.name} style="width:50px;height:50px;"></td>`;
  htmlContent += `<td style="text-align:left">${initiativeItem.name} (${initiativeItem.initiative})</td>`;
  if(initiativeItem.ShowHP){
    var curHPColor = 'white';
    if(initiativeItem.HP <= initiativeItem.MaxHP * 0.4){
      curHPColor = 'yellow';
    }
    if(initiativeItem.HP <= initiativeItem.MaxHP * 0.15){
      curHPColor = 'red';
    }
    var curHP = initiativeItem.HP.toString().padStart(3,'0');
    var maxHP = initiativeItem.MaxHP.toString().padStart(3,'0');
    htmlContent += `<td style="color:${curHPColor};text-align:right">${curHP}/${maxHP}`;
    if(initiativeItem.TempHP > 0) {
      htmlContent += `<span style="color:cyan">(+${initiativeItem.TempHP})</span></td></tr>`
    } else {
      htmlContent += "</td></tr>"
    }
  }else{
    htmlContent += '<td style="text-align:right">???/???</td></tr>';
  }
  if(initiativeItem.ShowHPBar){
    htmlContent += '<tr><td colspan="2">';
    htmlContent += createHPBarSVG(initiativeItem.HP, initiativeItem.MaxHP, initiativeItem.TempHP);
    htmlContent += '</td></tr>'
  }else{
    htmlContent += '<tr><td colspan="2"></td></tr>';
  }
  return htmlContent;
}