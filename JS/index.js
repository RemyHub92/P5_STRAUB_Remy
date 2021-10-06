let cameras = [];

//récupération des données de l'API 
function getCameras() {
    fetch("http://localhost:3000/api/cameras/")
        .then(async result => {
            cameras = await result.json();
            console.log(cameras);
        })

        .then(() => {
            for (let camera of cameras) {
                createCardCameras(camera);
            };
        })


        .catch((error) => {
            console.log(error);
        })


}

function createCardCameras(cameras) {
    const camerasDiv = document.getElementById('cameras');

    //création section "camera_index"
    const camerasSection = document.createElement('div');
    camerasSection.className = 'camera_index card col-lg-8';

    //création lien vers produit.html pour chaque section
    const camerasLink = document.createElement('a');
    camerasLink.href = "produit.html?id=" + cameras._id;
    camerasLink.className = 'link';

    //création image Camera + src et title
    const camerasImg = document.createElement('img');
    camerasImg.setAttribute('src', cameras.imageUrl);
    camerasImg.setAttribute('title', cameras.name);

    //création des diffents éléments div, h3 et p
    const camerasContent = document.createElement('div');
    camerasContent.className = 'cameras_content';

    const camerasTitle = document.createElement('h3');
    camerasTitle.textContent = cameras.name;

    const camerasPrice = document.createElement('p');
    camerasPrice.textContent = cameras.price / 100 + " €";


    camerasDiv.appendChild(camerasSection);
    camerasSection.appendChild(camerasLink);
    camerasLink.appendChild(camerasImg);
    camerasLink.appendChild(camerasContent);
    camerasContent.appendChild(camerasTitle);
    camerasContent.appendChild(camerasPrice);


}

//appel de la fonction getCameras
getCameras();