        //PORTAFOLIO  
// Array de imágenes
const galleryImages = [
    "images/portafolio1.jpg",
    "images/portafolio2.jpg",
    "images/portafolio3.jpg",
    "images/portafolio4.jpg",
    "images/portafolio5.jpg",
    "images/portafolio6.jpg",
    "images/portafolio7.jpg",
    "images/portafolio8.jpg",
    "images/portafolio9.jpg"
];

// Contenedor de la galería
const galleryContainer = document.querySelector('.row.g-4');

// Generar galería dinámica
galleryImages.forEach((src, index) => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-sm-6', 'col-lg-4');
    col.innerHTML = `
        <div class="gallery-item">
            <img src="${src}" class="img-fluid rounded" alt="Imagen ${index+1}" data-bs-toggle="modal" data-bs-target="#modalGallery">
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


