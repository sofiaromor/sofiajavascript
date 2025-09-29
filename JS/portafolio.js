// PORTAFOLIO  
const galleryImages = [
    { src: "../images/portafolio1.jpg", width: 1200, height: 1200 },
    { src: "../images/portafolio2.jpg", width: 960, height: 960 },
    { src: "../images/portafolio3.jpg", width: 515, height: 515 },
    { src: "../images/portafolio4.jpg", width: 900, height: 900 },
    { src: "../images/portafolio5.jpg", width: 620, height: 620 },
    { src: "../images/portafolio6.jpg", width: 1000, height: 1000 },
    { src: "../images/portafolio7.jpg", width: 1000, height: 1000 },
    { src: "../images/portafolio8.jpg", width: 512, height: 512 },
    { src: "../images/portafolio9.jpg", width: 640, height: 640 }
];

// Contenedor de la galería
const galleryContainer = document.querySelector('.row.g-4');

// Generar galería dinámica
galleryImages.forEach((imgObj, index) => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-sm-6', 'col-lg-4');
    col.innerHTML = `
        <div class="gallery-item">
            <img src="${imgObj.src}" 
                width="${imgObj.width}" 
                height="${imgObj.height}" 
                class="img-fluid rounded" 
                alt="Imagen ${index+1}" 
                data-bs-toggle="modal" 
                data-bs-target="#modalGallery">
        </div>
    `;
    galleryContainer.appendChild(col);
});

// Modal
const modalImage = document.getElementById('modalImage');
galleryContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        modalImage.src = e.target.src;
    }
});
