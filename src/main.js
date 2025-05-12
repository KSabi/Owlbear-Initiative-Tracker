import './style.css'
import OBR from '@owlbear-rodeo/sdk'
import { setupContextMenu } from '../contextMenu.js'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { setupInitiativeList } from '../initiativeList.js'
import { updateData } from '../updateData.js'

document.querySelector('#app').innerHTML = `
<div id="initiative-list"></div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupInitiativeList(document.querySelector("#initiative-list"));
});