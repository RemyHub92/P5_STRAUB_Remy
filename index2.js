const getCameras =  async function() {
  //récupération des données de l'API 
  try {
      let response = await fetch('http://localhost:3000/api/cameras');
      if (response.ok) {
          let cameras = await response.json();
          console.log(cameras);

          for (let camera of cameras) {
              const camerasDiv = document.getElementById('cameras');
      
              //création section "camera"
              const camerasSection = document.createElement('section');
              camerasDiv.appendChild(camerasSection);
              camerasSection.className = 'camera';
      
              //création lien vers produit.html pour chaque section
              const productLink = document.createElement("a");
              productLink.href = "produit.html?id=" + camera._id;
              camerasSection.appendChild(productLink);
              productLink.className = 'section_zoom';
              productLink.setAttribute('title', "Les appareils photo " + camera.name + " vous attendent !");
      
              //création image Camera + src, alt et title
              const cameraImg = document.createElement('img');
              CameraLink.appendChild(cameraImg);
              cameraImg.setAttribute('src', camera.imageUrl);
              cameraImg.setAttribute('alt', 'Appareils photo ' + camera.name);
              cameraImg.setAttribute('title', 'Appareils photo ' + camera.name);
      
              //création div cameraRef
              const camerasRef = document.createElement('div');
              productLink.appendChild(camerasRef);
              camerasRef.className = 'cameras_ref';
      
              //création h3 de cameraRef
              const h3CamerasRef = document.createElement('h3');
              camerasRef.appendChild(h3CamerasRef);
              h3CamerasRef.textContent = camera.name;
      
              //création p de cameraRef
              const pCamerasRef = document.createElement('p');
              camerasRef.appendChild(pCamerasRef);
              pCamerasRef.textContent = camera.price / 100 + " €";
          }
      } else {
          console.error('Retour du serveur : ', response.status);
          alert('Erreur rencontrée : ' + response.status);
      } 
  } catch (error) {
      alert("Erreur : " + error);
  }
}

//appel de la fonction getCameras
getCameras();
