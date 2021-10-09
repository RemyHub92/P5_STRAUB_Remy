//récuperation des données du localstorage
let storedCameras = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedCameras);


const storedDiv = document.getElementById('stored');
//création de la page du panier
const storedCard = document.createElement('div');
storedCard.className = 'stored_card';
storedDiv.appendChild(storedCard);

//si panier vide:
if (storedCameras == null || storedCameras.length === 0) {
    const emptyStored = document.createElement('p');
    emptyStored.className = 'empty_stored';
    emptyStored.textContent = 'Votre panier est vide !';
    storedCard.appendChild(emptyStored);
    //sinon: récupération des éléments du panier
} else {
    let i = 0;
    for (storedCamera of storedCameras) {
        //création des différents éléments du panier
        const cardProd = document.createElement('div');
        cardProd.className = 'card_prod d-flex justify-content-around border border-secondary';
        cardProd.setAttribute('data-id', storedCamera.cameraId);
        storedCard.appendChild(cardProd);

        const cameraInfo = document.createElement('p');
        cameraInfo.className = 'camera_info';
        cameraInfo.textContent = storedCamera.cameraName;
        cardProd.appendChild(cameraInfo);

        const cameraPrice = document.createElement('div');
        cameraPrice.className = 'camera_price';
        cardProd.appendChild(cameraPrice);
        cameraPrice.id = i++;

        const price = document.createElement('p');
        cameraPrice.appendChild(price);
        price.textContent = storedCamera.cameraPrice + " €";

        //création d'un bouton suppression pour chaque élément du panier
        const garbageButton = document.createElement('button');
        garbageButton.className = 'garbage_button btn btn-secondary btn-rounded';
        garbageButton.addEventListener("click", function (event) {
            event.preventDefault();
            //récupétion de l'article
            let productsRemoveId = event.target.closest('.card_prod').dataset.id;
            console.log(productsRemoveId);
            let storedCameras = JSON.parse(localStorage.getItem('newArticle'));
            let i = 0;
            while (i < storedCameras.length) {
                if (storedCameras[i].cameraId == productsRemoveId) {
                    //suppression de l'article du local storage
                    storedCameras.splice(i, 1);
                    i = storedCameras.length;
                }
                i++;
            };
            //enregistement du nouveau localstorage
            localStorage.setItem('newArticle', JSON.stringify(storedCameras));
            //suppression de la div de la camera supprimée
            event.target.closest('.card_prod').remove();
            console.log(JSON.parse(localStorage.getItem('newArticle')));
            console.log(storedCard);
            totalCalculator(storedCard);
        });
        garbageButton.title = 'Supprimer cet article ?';
        cardProd.appendChild(garbageButton);

        const iconButton = document.createElement('i');
        garbageButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt';

    };

    //calcul du montant total
    let calculPrice = []
    for (storedCamera of storedCameras) {
        let article = storedCamera.cameraPrice;
        calculPrice.push(article);
    };

    function totalCalculator(storedCard) {
        let storedCameras = JSON.parse(localStorage.getItem('newArticle'));
        let i = 0;
        let totalPrice = 0;
        while (i < storedCameras.length) {
            totalPrice += storedCameras[i].cameraPrice;
            i++;
        };
        console.log(totalPrice);
        return (totalPrice);
    };

    function setTotal(storedCard) {
        totalPrice = totalCalculator(storedCard);
        let totalElement = document.getElementsByClassName('total')[0];
        if (totalElement) {
            totalElement.textContent = "Montant total = " + totalPrice + " €";
        } else {
            const total = document.createElement('p');
            total.className = 'total';
            total.textContent = "Montant total = " + totalPrice + " €";
            storedCard.appendChild(total);
        }
    };

    setTotal(storedCard);

    //création d'un bouton pour vider le panier
    const garbage = document.createElement('button');
    storedCard.appendChild(garbage),
    garbage.className = 'icon_garbage btn btn-secondary btn-rounded';

    const garbageLink = document.createElement('a');
    garbage.appendChild(garbageLink);
    garbageLink.className = 'garbage_link';
    garbageLink.href = 'panier.html';
    garbageLink.title = 'Vider le panier';
    garbageLink.textContent = 'Vider mon panier';

    garbage.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem('newArticle');
        alert('votre panier a bien été vidé !');
        window.location.href = "panier.html";
    });

    //création du formulaire de commande
    const form = document.createElement('form');
    form.className = 'contact_form';
    storedCard.appendChild(form);

    const formTitle = document.createElement('h3');
    formTitle.textContent = "Pour valider votre commande, merci de valider le formulaire ci-dessous:";
    form.appendChild(formTitle);

    //création des fonctions de valité (prénom, nom, ville)
    function validFirstName(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    }

    function validLastName(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    }

    function validCity(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    }

    //création des fonctions de validité de l'adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value);
    };

    //création des fonctions de validité du mail
    function validMail(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    };

    //création du formulaire prénom
    const divFirstName = document.createElement('div');
    form.appendChild(divFirstName);
    divFirstName.className = 'div_info';

    const labelFirstName = document.createElement('label');
    divFirstName.appendChild(labelFirstName);
    labelFirstName.setAttribute('for', 'prenom');
    labelFirstName.textContent = 'Votre prénom : ';

    const firstName = document.createElement('input');
    divFirstName.appendChild(firstName);
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('class', 'name');
    firstName.name = "Prénom";
    firstName.required = true;

    //vérification de la validité du prénom
    firstName.addEventListener("change", function (event) {
        if (validFirstName(firstName.value)) {} else {
            alert("Les chiffres et symboles ne sont pas autorisés.");
            event.preventDefault();
        }
    });

    //création du formulaire nom
    const divLastName = document.createElement('div');
    form.appendChild(divLastName);
    divLastName.className = 'div_info';

    const labelLastName = document.createElement('label');
    divLastName.appendChild(labelLastName);
    labelLastName.setAttribute('for', 'nom');
    labelLastName.textContent = 'Votre nom : ';

    const lastName = document.createElement('input');
    divLastName.appendChild(lastName);
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('class', 'name');
    lastName.name = "Nom";
    lastName.required = true;

    //vérification de la validité du nom
    lastName.addEventListener("change", function (event) {
        if (validLastName(lastName.value)) {} else {
            alert("Les chiffres et symboles ne sont pas autorisés.");
            event.preventDefault();
        }
    });

    //création du formulaire adresse
    const divAddress = document.createElement('div');
    form.appendChild(divAddress);
    divAddress.className = 'div_info';

    const labelAddress = document.createElement('label');
    divAddress.appendChild(labelAddress);
    labelAddress.setAttribute('for', 'adresse');
    labelAddress.textContent = 'Votre adresse : ';

    const address = document.createElement('textarea');
    divAddress.appendChild(address);
    address.setAttribute('type', 'text');
    address.setAttribute('class', 'name');
    address.name = "Adresse";
    address.required = true;

    //vérification de la validité de l'adresse
    address.addEventListener("change", function (event) {
        if (validAddress(address.value)) {} else {
            alert("Aucun symbole n'est autorisé.");
            event.preventDefault()
        }
    });

    //création du formulaire ville
    const divCity = document.createElement('div');
    form.appendChild(divCity);
    divCity.className = 'div_info';

    const labelCity = document.createElement('label');
    divCity.appendChild(labelCity);
    labelCity.setAttribute('for', 'ville');
    labelCity.textContent = 'Votre ville : ';

    const city = document.createElement('input');
    divCity.appendChild(city);
    city.setAttribute('type', 'text');
    city.setAttribute('class', 'name');
    city.name = "Ville"
    city.required = true;

    //vérification de la validité de la ville
    city.addEventListener("change", function (event) {
        if (validCity(city.value)) {} else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    });

    //création du formulaire mail
    const divMail = document.createElement('div');
    form.appendChild(divMail);
    divMail.className = 'div_info';

    const labelMail = document.createElement('label');
    divMail.appendChild(labelMail);
    labelMail.setAttribute('for', 'email');
    labelMail.textContent = 'Votre adresse mail : ';

    const mail = document.createElement('input');
    divMail.appendChild(mail);
    mail.setAttribute('type', 'email');
    mail.setAttribute('class', 'name');
    mail.name = "Adresse mail"
    mail.required = true;

    //vérification de la validité du mail
    mail.addEventListener("change", function (event) {
        if (validMail(mail.value)) {} else {
            event.preventDefault()
            alert("Veuillez saisir une adresse mail valide (exemple : prenom.nom@mail.com).");
        }
    });

    //creation du bouton validation
    const divButton = document.createElement('div');
    form.appendChild(divButton);
    divButton.className = 'div_button';

    const submit = document.createElement('button');
    divButton.appendChild(submit);
    submit.className = 'btn btn-secondary btn-rounded'; /////////
    submit.type = 'submit';
    submit.name = 'add';
    submit.id = 'valid';
    submit.textContent = "Valider ma commande";

    // envoie des données panier + contact au serveur si le formulaire est valide
    submit.addEventListener("click", function (event) {
        if (validFirstName(firstName.value) && validLastName(lastName.value) && validAddress(address.value) && validCity(city.value)) {
            event.preventDefault();

            // envoie du prix total au localStorage
            totalPrice = totalCalculator(storedCard);
            localStorage.setItem('totalPrice', totalPrice);
            const storagePrice = localStorage.getItem('totalPrice');
            console.log(storagePrice);

            //Création de l'objet "contact"
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: mail.value,
            }
            console.log(contact);

            // création du tableau products (id des cameras du panier)
            let products = [];
            for (storedCamera of storedCameras) {
                let productsId = storedCamera.cameraId;
                products.push(productsId);
            }
            console.log(products);

            let send = {
                contact,
                products,
            }
            console.log(send);

            // envoie des données au serveur
            const post = async function (data) {
                try {
                    let response = await fetch('http://localhost:3000/api/cameras/order', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        let data = await response.json();
                        console.log(data.orderId);
                        localStorage.setItem("responseOrder", data.orderId);
                        window.location = "confirmation.html";
                        localStorage.removeItem("newArticle");

                    } else {
                        event.preventDefault();
                        console.error('Retour du serveur : ', response.status);
                        alert('Erreur rencontrée : ' + response.status);
                    }

                } catch (error) {
                    alert("Erreur : " + error);
                }
            };
            post(send);
        }

    })


};