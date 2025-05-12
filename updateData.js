import OBR from "@owlbear-rodeo/sdk";

const ID = "com.KSabi.initiative-tracker";

export function updateData(elements) {
    for (let element of elements) {
    const updateValue = () => {
        let value = element.value;
        var idlist = element.id.split("/");
        if(idlist[0] != ID){return;}
        const itemID = idlist[1];
        const itemField = idlist[2];
        OBR.scene.items.updateItems([itemID], (items) => {
            for (let item of items){
                let data = item.metadata[`${ID}/metadata`];
                console.log(`Element: ${itemField}, New Value: ${value}`);
                switch (itemField) {
                    case "initiative":
                        data.initiative = value;
                        break;
                    case "name":
                        data.name = value;
                        break;
                    case "hp":
                        data.HP = Number(value);
                        break;
                    case "maxhp":
                        data.MaxHP = Number(value);
                        break;
                    case "temphp":
                        data.TempHP = Number(value);
                        break;
                    case "showhp":
                        data.ShowHP = !data.ShowHP;
                        break;
                    case "showhpbar":
                        data.ShowHPBar = !data.ShowHPBar;
                        break;    
                    case "modhp":
                        if(value < 0) {
                            let modValue = Number(value) + Number(data.TempHP);
                            console.log(`Value less than zero.  Modified after temp HP, damage = ${modValue}`)
                            if(modValue >= 0) {
                                data.TempHP = modValue;
                                break;
                            } else {
                                data.TempHP = 0;
                                data.HP = Number(data.HP) + modValue;
                            }
                        } else {
                            data.HP = Number(data.HP) + Number(value);
                        }
                        if(data.HP < 0) {
                            console.log(`New HP (${data.HP}) value less than 0. Setting to 0`);
                            data.HP = 0;
                        }
                        if(data.HP > data.MaxHP) {
                            console.log(`New HP (${data.HP}) value is greater than ${data.MaxHP}`)
                            data.HP = data.MaxHP;
                        }
                        
                        break;
                        
                }
            }
        })
    }
    element.addEventListener('change', () => updateValue())
    }
}