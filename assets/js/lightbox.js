document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightboxImg = document.getElementById('lightbox-img');

    let currentIndex = 0;
    let images = [];
    let numImages = 20;

    

    // Function to update images
    function updateImages() {
        // Fetch random images from Lorem Picsum or your preferred image service
        images = Array.from({ length: numImages }, (_, index) => `https://picsum.photos/400/300?random=${index + 1}`);

        // Update image sources in the gallery
        const galleryImages = document.querySelectorAll('.gallery img');
        galleryImages.forEach((image, index) => {
            image.src = images[index];

            // Add click event listener to open the lightbox
            image.addEventListener('click', function () {
                currentIndex = index;
                openLightbox();
            });
        });
    }

    // Function to open the lightbox
    function openLightbox() {
        // Update the image inside the lightbox
        lightboxImg.src = images[currentIndex];

        // Display the lightbox
        lightboxContainer.style.display = 'flex';

        // Update navigation arrows visibility
        updateNavigationArrows();
    }

    // Function to close the lightbox
    function closeLightbox() {
        // Hide the lightbox
        lightboxContainer.style.display = 'none';
    }

    // Function to navigate through images
    function navigate(direction) {
        // Move to the next or previous image
        currentIndex += direction;

        // Wrap around if reaching the end
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        // Update the image inside the lightbox
        lightboxImg.src = images[currentIndex];

        // Update navigation arrows visibility
        updateNavigationArrows();
    }

    // Function to update navigation arrows visibility
    function updateNavigationArrows() {
        const leftArrow = document.querySelector('.lightbox-navigation-left');
        const rightArrow = document.querySelector('.lightbox-navigation-right');

        // Show/hide arrows based on the current index
        leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
        rightArrow.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
    }

    // Function to check if the user has scrolled to the bottom of the page
    function isScrolledToBottom() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    // Function to handle infinite scroll
    function handleInfiniteScroll() {
        if (isScrolledToBottom()) {
            // Load more images when the user reaches the bottom
            const newImages = Array.from({ length: 10 }, (_, index) => `https://picsum.photos/400/300?random=${images.length + index + 1}`);
            images = images.concat(newImages);
            numImages += 10;

            // Append new images to the gallery
            newImages.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                gallery.appendChild(img);

                // Add click event listener to open the lightbox
                img.addEventListener('click', function () {
                    currentIndex = images.length - newImages.length + index;
                    openLightbox();
                });
            });
        }
    }

    updateImages();

    // Update images every minute (adjust the interval as needed)
    setInterval(updateImages, 60000);

    // Attach navigation functions to the global scope for onclick attribute in HTML
    window.navigate = navigate;
    window.closeLightbox = closeLightbox;

    // Attach infinite scroll handler to window scroll event
    window.addEventListener('scroll', handleInfiniteScroll);
});
