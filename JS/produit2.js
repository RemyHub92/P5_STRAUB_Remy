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
    cameraCard.className = 'camera_card';

    const cameraImg = document.createElement('img');
    cameraImg.setAttribute('src', cameraSelected.imageUrl);
    cameraImg.setAttribute('title', cameraSelected.name);

    const cameraInfo = document.createElement('div');
    cameraInfo.className = 'camera_info bg-primary';

    const cameraTitle = document.createElement('h3');
    cameraTitle.textContent = cameraSelected.name;

    const cameraDescription = document.createElement('p');
    cameraDescription.className = 'camera_description';
    cameraDescription.textContent = cameraSelected.description;

    const cameraPrice = document.createElement('p');
    cameraPrice.textContent = cameraSelected.price / 100 + " €";
    cameraPrice.className = 'camera_price';

    const form = document.createElement('form');
    const formDiv = document.createElement('div');
    formDiv.className = 'lenses_choice';
    const label = document.createElement('label');
    label.textContent = "Selectionez la lentille : ";
    label.setAttribute('for', "Choix de la lentille de " + cameraSelected.name);

    const select = document.createElement('select');
    select.setAttribute('name', "Choix de la lentille de " + cameraSelected.name);
    select.setAttribute('id', "select_1 ");

    const lenses = cameraSelected.lenses;
    for (i = 0; i < lenses.length; i++) {
        const selectOption = document.createElement('option');
        selectOption.textContent = lenses[i];
        selectOption.setAttribute("value", lenses[i]);
        select.appendChild(selectOption);
    }

    let addCamera = document.createElement('button');
    addCamera.type = 'submit';
    addCamera.name = 'add';
    addCamera.id = 'submit';
    addCamera.textContent = "Ajouter au panier";

    addCamera.addEventListener("click", function (event) {
        event.preventDefault();

        let cameraChoosen = {
            cameraName: cameraSelected.name,
            cameraId: cameraSelected._id,
            cameraImg: cameraSelected.imageUrl,
            quantity: 1,
            cameraPrice: cameraSelected.price / 100,
        };
        console.log(cameraChoosen);


        
        const confirm = () => {
            if (window.confirm(cameraSelected.name + " " + 'a bien été ajouté au panier. Voulez-vous consulter votre panier ?')) {
                window.location.href = "panier.html";
            } else {
                window.location.href = "index.html";
            }
        }

        let storedCameras = JSON.parse(localStorage.getItem('newArticle'));

        if (storedCameras) {
            storedCameras.push(cameraChoosen);
            localStorage.setItem("newArticle", JSON.stringify(storedCameras));
            console.log(storedCameras);
          //  confirm();

        } else {
            storedCameras = [];
            storedCameras.push(cameraChoosen);
            localStorage.setItem("newArticle", JSON.stringify(storedCameras));
            console.log(storedCameras);
         //   confirm();
        }



    });





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
    form.appendChild(addCamera);

}


getCameras();