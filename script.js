const itemsList = document.querySelector('.plates');
const addItems = document.querySelector('.add-items');
const item = document.querySelector("input[name='item']")
let items = [];

window.addEventListener('load', function () {
    displayItems();
    setChkBoxHandlers();
});

// when an input is entered and save in the localstorage

function saveEnteredValue(e) {
   

    items = retrieveItems() || items;

    items.push({ text: item.value, state: false });
    localStorage.setItem("localMenuList", JSON.stringify(items));
    buildItem(items[items.length - 1], items.length - 1)
   
    item.value = '';
    e.preventDefault();

 
    console.groupEnd();
}

// to display the input entered on the page

function displayItems() {
  

    items = retrieveItems() || items;
    if (items.length != 0) {
    
        while (itemsList.firstChild) {
            itemsList.removeChild(itemsList.firstChild);
        }
        items.forEach((x, ndx) => buildItem(x, ndx));
    };

}

function buildItem(item, ndx) {
    

  
    const listItem = document.createElement('li');
    const checkedState = item.state ? 'checked' : '';

    const inputElm = document.createElement('input');
    inputElm.type = 'checkbox';
    inputElm.id = `chkBox-${ndx}`;
    inputElm.checked = checkedState;
    listItem.appendChild(inputElm);

    const labelElm = document.createElement('label');
    labelElm.htmlFor = `chkBox-${ndx}`;
    labelElm.appendChild(document.createTextNode(`${item.text}`))
    listItem.appendChild(labelElm);

    const removeElm = document.createElement('button');
    removeElm.id = `btn-${ndx}`
    removeElm.value = 'Remove';
    removeElm.appendChild(document.createTextNode('Remove'));
    listItem.appendChild(removeElm);

    itemsList.appendChild(listItem);

    inputElm.addEventListener('change', actualizeStorage);
    removeElm.addEventListener('click', removeItem);


   
}

function actualizeStorage(e) {
   
    const chkBoxId = e.target.id.substr(e.target.id.search('/[0-9]+'));
    
    items[chkBoxId].state = e.target.checked;
   
    localStorage.setItem("localMenuList", JSON.stringify(items));
   
}

function retrieveItems() {
    const itemsSaved = localStorage.getItem("localTapasList");
    //if (itemsSaved ) items = JSON.parse(itemsSaved);
    if (itemsSaved) return JSON.parse(itemsSaved);
}

function removeItem(e) {
  
    items = retrieveItems() || items;
    removeItemId = e.target.id.substr(e.target.id.search('/[0-9]+'));

    items.splice(removeItemId, 1);
    localStorage.setItem("localMenuList", JSON.stringify(items));
    itemsList.removeChild(e.target.parentNode);
    
}

function setChkBoxHandlers() {
   
   
    const checkBoxList = document.querySelectorAll("input[type='checkbox']")
   
    if (checkBoxList) {
        checkBoxList.forEach((elm, ndx) => {
         
            elm.addEventListener('change', actualizeStorage);
        })
    }
    addItems.addEventListener('submit', saveEnteredValue);
  
}

