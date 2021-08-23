

let cameras = [];


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

    const camerasSection = document.createElement('section');
    camerasSection.classList.add('camera_index');

    const camerasLink = document.createElement('a');
    camerasLink.href = "produit.html?id=" + cameras._id;
    camerasLink.className = 'link';

    const camerasImg = document.createElement('img');
    camerasImg.setAttribute('src', cameras.imageUrl);
    camerasImg.setAttribute('title', cameras.name);


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


getCameras();
