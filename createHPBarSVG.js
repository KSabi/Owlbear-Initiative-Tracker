export function createHPBarSVG(hp, maxhp, tempHP){
  const svgWidth = 250;
  const svgHeight = 20;
  const hpBarWidth = 230;
  const hpBarHeight = 20;
  const gradDefinitions = '<defs><linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="lightgreen" /><stop offset="100%" stop-color="green" /></linearGradient><linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="lightyellow" /><stop offset="100%" stop-color="yellow" /></linearGradient><linearGradient id="grad3" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="pink" /><stop offset="100%" stop-color="red" /></linearGradient></defs>';

  let hpp = Number(Number(hp) / Number(maxhp)).toFixed(2);
  let hpStr = hp.toString().padStart(3,'0');
  let hpMaxStr = maxhp.toString().padStart(3,'0');
  let curHPBarWidth = (hpBarWidth * hpp).toFixed(0);
  let outlineStr = tempHP > 0 ? 'stroke="cyan" stroke-width="3px"' : '';
  let svgStr = `<svg width="${svgWidth}" height="${svgHeight}">`;
  svgStr += gradDefinitions;
  svgStr += `<rect width="${hpBarWidth}" height="${hpBarHeight}" x="10" y="0" rx="10" ry="10" fill="black" />`
  if(hpp > 0.4){
    svgStr += `<rect width="${curHPBarWidth}" height="${hpBarHeight}" x="10" y="0" rx="10" ry="10" ${outlineStr} fill="url(#grad1)" />`
  }else if(hpp > 0.15){
    svgStr += `<rect width="${curHPBarWidth}" height="${hpBarHeight}" x="10" y="0" rx="10" ry="10" ${outlineStr} fill="url(#grad2)" />`
  }else{
    svgStr += `<rect width="${curHPBarWidth}" height="${hpBarHeight}" x="10" y="0" rx="10" ry="10" ${outlineStr} fill="url(#grad3)" />`
  }
  //svgStr += `<text x="100" y="16" font-size="20" fill="white">${hpStr}/${hpMaxStr}</text>`;
  svgStr += "</svg>"
  return svgStr;
}