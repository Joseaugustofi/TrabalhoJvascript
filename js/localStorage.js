document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);

function loadItems() {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach(item => addItemToDOM(item));
}

function addItem() {
    const itemInput = document.getElementById('item-input');
    const descInput = document.getElementById('desc-input');
    const fileInput = document.getElementById('file-input');

    const itemText = itemInput.value.trim();
    const descText = descInput.value.trim();
    let imgSrc = ''; 

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imgSrc = event.target.result; 
            const item = { text: itemText, description: descText, imageSrc: imgSrc };
            addItemToDOM(item);
            saveItem(item);
        };
        reader.readAsDataURL(fileInput.files[0]); 
    } else {
        const item = { text: itemText, description: descText, imageSrc: '' };
        addItemToDOM(item);
        saveItem(item);
    }

    itemInput.value = '';
    descInput.value = '';
    fileInput.value = ''; 
}

function addItemToDOM(item) {
    const listItem = document.createElement('div');
    listItem.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const itemTitle = document.createElement('h5');
    itemTitle.className = 'card-title';
    itemTitle.textContent = item.text;

    const itemDescription = document.createElement('p');
    itemDescription.className = 'card-text';
    itemDescription.textContent = item.description;

    if (item.imageSrc) {
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = item.imageSrc;
        img.alt = 'Imagem do item';

        cardBody.appendChild(img);
    }

    cardBody.appendChild(itemTitle);
    cardBody.appendChild(itemDescription);
    listItem.appendChild(cardBody);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => {
        const newText = prompt('Editar título:', item.text);
        const newDesc = prompt('Editar descrição:', item.description);
        if (newText !== null && newText.trim() !== '') {
            item.text = newText.trim();
            item.description = newDesc.trim();
            itemTitle.textContent = item.text;
            itemDescription.textContent = item.description;
            updateItem(item);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        removeItem(item);
    });

    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);

    listItem.appendChild(cardBody);

    document.getElementById('shopping-list').appendChild(listItem);
}

function saveItem(item) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function updateItem(updatedItem) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const index = items.findIndex(item => item.text === updatedItem.text);
    if (index !== -1) {
        items[index] = updatedItem;
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
}

function removeItem(item) {
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items = items.filter(i => i.text !== item.text);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function loadItems() {
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
   
    if (items.length === 0) {
        const carrotCakeRecipe = {
            text: 'Torta alemã',
            description: `Ingredientes:
- 200 g de manteiga sem sal
- 1 lata de creme de leite sem soro
- leite, o quanto baste, para molhar a bolacha
- 1 xícara (chá) de açúcar
- 1 pacote de bolacha maisena
- 1 lata de leite condensado, sabor chocolate (ou cobertura de sorvete)

Modo de Preparo:
1. Coloque a manteiga e o açúcar na batedeira e bata até obter um creme bem fofo e liso.
2. Acrescente o creme de leite e bata rapidamente apenas para misturar.
3. Desligue a batedeira e reserve.
4. Separe um recipiente médio para montar o doce.
5.Acrescente um pouco de leite num prato fundo e molhe rapidamente algumas bolachas maisena no leite.
6. Forre o fundo do recipiente escolhido com uma camada de bolachas.
7. Acrescente uma camada do creme reservado sobre as bolachas.
8. Acrescente mais uma camada de bolachas molhadas no leite e repita o procedimento finalizando com a bolacha.
9. Cubra a última camada de bolachas com o leite condensado sabor chocolate (comprado pronto ou a cobertura).
10. Leve à geladeira por no mínimo 3 horas ou até que o doce fique bem gelado.
11. Retire o doce da geladeira e sirva a seguir.`,
            imageSrc: 'https://static.itdg.com.br/images/360-240/623bab2a1cc658759ed5085b24f938a9/327924-original.jpg' 
        };
        items.push(carrotCakeRecipe);
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    items.forEach(item => addItemToDOM(item));
}