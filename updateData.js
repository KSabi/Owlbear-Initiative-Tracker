import OBR from "@owlbear-rodeo/sdk";

const ID = "com.KSabi.initiative-tracker";

export function updateData(elements) {
    for (let element of elements) {
    const updateValue = () => {
        let value = element.value.toString();
        var idlist = element.id.split("/");
        if(idlist[0] != ID){return;}
        const itemID = idlist[1];
        const itemField = idlist[2];
        OBR.scene.items.updateItems([itemID], (items) => {
            for (let item of items){
                let data = item.metadata[`${ID}/metadata`];
                //console.log(`Element: ${itemField}, New Value: ${value}`);
                switch (itemField) {
                    case "initiative":
                        data.initiative = value;
                        break;
                    case "name":
                        data.name = value;
                        break;
                    case "hp":
                        let curhp = Number(data.HP);
                        console.log(`Current HP: ${curhp}`);
                        if(value.startsWith("+")) {
                            let mod = Number(value.substr(1));
                            data.HP = Math.min(curhp + mod, data.MaxHP);
                            console.log(`+ symbol found.  Adding ${mod} to HP`);
                        } else if(value.startsWith('-')) {
                            let mod = Number(value.substr(1));
                            mod = data.TempHP - mod;
                            if(mod >= 0) {
                                data.TempHP = mod;
                            } else {
                                data.TempHP = 0;
                                data.HP = Math.max(curhp + mod, 0);
                            }
                            console.log(`- symbol found.  Reducing HP`);
                        } else {
                            console.log(`Direct value detected. Setting to ${value}`);
                            data.HP = Number(value);
                        }
                        break;
                    case "maxhp":
                        data.MaxHP = Number(value);
                        break;
                    case "temphp":
                        data.TempHP = Number(value);
                        break;
                    case "ac":
                        data.ArmorClass = Number(value);
                        break;
                    case "showhp":
                        data.ShowHP = !data.ShowHP;
                        break;
                    case "showhpbar":
                        data.ShowHPBar = !data.ShowHPBar;
                        break;    
                }
            }
        })
    }
    element.addEventListener('change', () => updateValue())
    }
}