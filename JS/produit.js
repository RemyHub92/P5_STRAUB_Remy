
let cameraSelected = [];


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


function getCameras() {
    fetch("http://localhost:3000/api/cameras/" + id)
        .then(response => response.json())
        .then(response => {
            const cameraSelected = response;
            console.log(cameraSelected);
            createCardCamera(cameraSelected)
        })

        .catch((error) => {
            console.log(error);
        })


}

function createCardCamera(cameraSelected) {
    const cameraDiv = document.getElementById('camera');

    const cameraCard = document.createElement('div');
    cameraCard.classList.add = 'camera_card';

    const cameraImg = document.createElement('img');
    cameraImg.setAttribute('src', cameraSelected.imageUrl);
    cameraImg.setAttribute('title', cameraSelected.name);

    const cameraInfo = document.createElement('div');
    cameraInfo.classList.add = 'camera_info';

    const cameraTitle = document.createElement('h3');
    cameraTitle.textContent = cameraSelected.name;

    const cameraDescription = document.createElement('p');
    cameraDescription.classList.add = 'camera_description';
    cameraDescription.textContent = cameraSelected.description;

    const cameraPrice = document.createElement('p');
    cameraPrice.textContent = cameraSelected.price / 100 + " €";
    cameraPrice.classList.add = 'camera_price';

    const form = document.createElement('form');
    const formDiv = document.createElement('div');
    formDiv.classList.add = 'lenses_choice';
    const label = document.createElement('label');
    label.textContent = "Selectionez la lentille : ";
    label.setAttribute('for', "Choix de la lentille de " + camera.name);

    const select = document.createElement('select');
    select.setAttribute('name', "Choix de la lentille de " + camera.name);
    select.setAttribute('id', "select_1 ");

    const lenses = camera.lenses;
    for (i = 0; i < lenses.length; i++) {
        const selectOption = document.createElement('option');
        selectOption.textContent = lenses[i];
        selectOption.setAttribute("value", lenses[i]);
    }

    cameraDiv.appendChild(cameraCard);
    cameraCard.appendChild(cameraImg);
    cameraCard.appendChild(cameraInfo);
    cameraInfo.appendChild(cameraTitle);
    cameraInfo.appendChild(cameraDescription);
    cameraInfo.appendChild(cameraPrice);
    cameraInfo.appendChild(form);
    form.appendChild(formDiv);
    formDiv.appendChild(label);
    formDiv.appendChild(select);
    select.appendChild(selectOption);
    
}


getCameras();
