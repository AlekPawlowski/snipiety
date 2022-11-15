interface regionInterface {
    id: string;
    name: string;
    url: string;
    img: string | undefined;
}

export default async function initalizeFindAfterTypeBars(inputValue: string = '') {
    const container = document.querySelector('[data-findaftertype]') as HTMLElement,
        url: string | undefined = container.dataset.url,
        inputElement = container.querySelector('.input_bar input') as HTMLInputElement;
    inputElement.value = inputValue;

    let sendDataTimeout: ReturnType<typeof setTimeout>;

    inputElement.oninput = async (event: any) => {
        inputValue = event.target.value;
        // minimum letters for sending data, getting from config element
        if (inputValue.length >= 3) {
            // clear prev timeout for send data
            console.log('larger than 3');
            
            clearTimeout(sendDataTimeout);
            sendDataTimeout = setTimeout(initInputAction, 1000);
        }else{
            console.log("smaller than 3");
            removeResultBarIfExist();
        }
    }

    async function initInputAction() {
        const hintData: any = await getHintsData(url, inputValue);
        createHintWindow(hintData, container)
    }
}


async function getHintsData(fetchAdress: string | undefined, value: string) {
    if (fetchAdress) {
        const fetchConfig: any = {
            method: 'POST',
            body: JSON.stringify(value)
        }
        const config: any = window.location.hostname === 'localhost' ? {} : fetchConfig;
        const data = await fetch(fetchAdress, config).then(data => data.json());

        return data.regionList;
    } else {
        // if fetch adress undefined return false for error handling
        return false;
    }
}

function createHintWindow(fillData: any, container: HTMLElement) {
    const createResultContainer = () => {
        const element = document.createElement('div') as HTMLElement;
        element.classList.add("result_bar");
        return element;
    }

    // get or create info window
    let infoWindow = container.querySelector(".result_bar") as HTMLElement | null;
    if (!infoWindow) {
        // if info window dosent exist create one
        infoWindow = createResultContainer();
        // append info window to container
        container.appendChild(infoWindow);
    }else{
        // if exist clear previous result and make space for new content
        infoWindow.innerHTML = '';
        // clear empty result class
        infoWindow.classList.remove('empty_result');
    }

    // if element is higher than one render
    if (fillData.length > 0) {
        // fill hint window with data (with or without img)
        fillData.forEach((ele: regionInterface) => {
            const element = createHintElmenet(ele);
            infoWindow.appendChild(element);
        })
        // append to container
        container.appendChild(infoWindow);
    }else{
        // if element is empty show empty result
        infoWindow.classList.add('empty_result');
        infoWindow.innerHTML = `
            <p class="fw_bold margin-0">Brak wyników</p>
            <p class="fw_reg margin-0">Twoje wyszukiwanie nie przyniosło żadnych rezultatów</p>
        `
    }
}

function createHintElmenet(data: any) {
    const { id, name, url, img }: regionInterface = data;

    // create main element which is  link a tag
    const container = document.createElement("a") as HTMLAnchorElement;
    container.href = url;
    container.target = "_blank";
    container.classList.add('result_ele');
    container.dataset.id = id;

    // create text content and add it tp href tag
    const paragraph = document.createElement("p") as HTMLElement;
    paragraph.classList.add('title');
    paragraph.innerHTML = name
    container.appendChild(paragraph);

    //  if img isnt undefined then append it 
    if (img) {
        const image = document.createElement("img");
        image.src = img;
        container.appendChild(image);
    }

    return container;
}

function removeResultBarIfExist(){
    const resultBar = document.querySelector('.result_bar') as HTMLElement;
    if(resultBar) {
        resultBar.parentNode.removeChild(resultBar);
        return true;
    }
    return false;
};