
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const subImages = document.querySelectorAll('.subImage');

    subImages.forEach(subImage => {
        subImage.addEventListener('click', () => {
            mainImage.src = subImage.src;
            mainImage.alt = subImage.alt;
        });
    });
});
