// script.js

document.addEventListener('DOMContentLoaded', function () {
    const fabricTechnologySection = document.getElementById('fabric-technology');
    const itemsPerRow = 4;

    // Function to create a fabric item element
    function createFabricItem(fabric) {
        const fabricItem = document.createElement('div');
        fabricItem.classList.add('fabric-item');
        fabricItem.innerHTML = `
            <a href="${fabric.link}">
            <img class="lazy" data-src="${fabric.image}" alt="${fabric.name}"">
            </a>
            <p>${fabric.description}</p>
            <a href="${fabric.link}">Read more...</a>
        `;
        return fabricItem;
    }

    function loadFabricItems() {
        fetch('fabrics.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((fabric, index) => {
                    const fabricItem = createFabricItem(fabric);
                    fabricTechnologySection.appendChild(fabricItem);
                });
                const fabricItems = document.querySelectorAll('.fabric-item');
                const remainder = fabricItems.length % itemsPerRow;
                if (remainder !== 0) {
                    const placeholdersNeeded = itemsPerRow - remainder;
                    for (let i = 0; i < placeholdersNeeded; i++) {
                        const placeholderItem = document.createElement('div');
                        placeholderItem.classList.add('fabric-item');
                        placeholderItem.style.visibility = 'hidden';
                        fabricTechnologySection.appendChild(placeholderItem);
                    }
                }
                lazyLoadImages();
            })
            .catch(error => console.error('Error fetching fabric data:', error));
    }

    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img.lazy');

        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy');
                        lazyImage.classList.add('lazy-loaded');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            lazyImages.forEach(lazyImage => {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy');
                lazyImage.classList.add('lazy-loaded');
            });
        }
    }

    loadFabricItems();
});
