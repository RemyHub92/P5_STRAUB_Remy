
let storedCameras = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedCameras);


const storedDiv = document.getElementById('stored');
const storedCard = document.createElement('div');
storedCard.className = 'stored_card';

if(storedCameras == null || storedCameras.length === 0) {
    const emptyStored = document.createElement('p');
    emptyStored.className = 'empty_stored';
    emptyStored.textContent = 'Votre panier est vide !';
    storedCard.appendChild(emptyStored);

} else {
    let i =  0;
    for (storedCamera of storedCameras) {
        const cardProd = document.createElement('div');
        cardProd.className = 'card_prod';
        storedCard.appendChild(cardProd);

        const cameraInfo = document.createElement('p');
        cameraInfo.textContent = storedCamera.cameraName;
        cardProd.appendChild(cameraInfo);

        const cameraPrice = document.createElement('div');
        cameraPrice.className = 'camera_price',
        cardProd.appendChild(cameraPrice);
        cameraPrice.id = i++;

        const price = document.createElement('p');
        cameraInfo.appendChild(price);
        price.textContent = storedCamera.cameraPrice + " €";

        const garbageButton = document.createElement('button');
        garbageButton.className = 'garbage_button';
        garbageButton.title = 'Supprimer cet article ?';
        cameraInfo.appendChild(garbageButton);

        const iconButton = document.createElement('i');
        garbageButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt';
    };

    let garbageButton = document.getElementsByClassName('garbage_button');
    for (let i = 0 ; i < garbageButton.length; i++) {
        garbageButton.addEventListener("click" , function (event) {
            event.preventDefault();
            let id = this.closest('.camera_price').id;

            storedCameras.splice(id, 1);

            localStorage.setItem('newArticle', JSON.stringify(storedCameras));
            JSON.parse(localStorage.getItem('newArticle'));

            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html";
        });
    };

    let calculPrice = []
    for (storedCamera of storedCameras) {
        let article = storedCamera.cameraPrice;
        calculPrice.push(article);
    };

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = calculPrice.reduce(reducer, 0);
    console.log(totalPrice);

    const total = document.createElement('p');
    storedCard.appendChild(total);
    total.className = 'total';
    total.textContent = "Montant total = " + totalPrice + " €";

    const garbage = document.createElement('button');
    storedCard.appendChild(garbage),
    garbage.className = 'icon_garbage';

    const garbageLink = document.createElement('a');
    garbage.appendChild(garbageLink);
    garbageLink.id = 'garbage_link';
    garbageLink.href = 'panier.html';
    garbageLink.title = 'Vider le panier';
    garbageLink.textContent = 'Vider mon panier';

    const icon = document.createElement('i');
    garbageLink.appendChild(icon);
    icon.className = 'fas fa-trash-alt';

    garbage.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem('newArticle');
        alert('votre panier a bien été vidé !');
        window.location.href = "panier.html";
    });


};





storedDiv.appendChild(storedCard);


