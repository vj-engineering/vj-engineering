document.addEventListener('DOMContentLoaded', () => {
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    const mainModelView = document.getElementById('mainModelView'); // Changed from mainImageView
    const mainModel = document.getElementById('mainModel'); // Changed from mainImage
    const modelPlaceholder = document.getElementById('modelPlaceholder'); // Changed from mainImagePlaceholder
    const descriptionArea = document.getElementById('descriptionArea').querySelector('p');

    // Sample image data (in a real application, this might come from a server or be embedded differently)
    const images = [
        { id: 'l4', src: 'assets/images/l4.png', alt: 'Client Logo 4', description: 'The Yellow Tanker offers robust performance for heavy-duty tasks.' },
        { id: 'l3', src: 'assets/images/l3.png', alt: 'Client Logo 3', description: 'Our Gray Tanker model is designed for specialized industrial applications.' },
        { id: 'l1', src: 'assets/images/l1.png', alt: 'Client Logo 1', description: 'Client Logo 1 - Represents one of our valued partners.' },
        { id: 'l2', src: 'assets/images/l2.png', alt: 'Client Logo 2', description: 'Client Logo 2 - Showcasing strong industry collaborations.' },
        // Add more images as needed
    ];

    // Event listeners for thumbnail items
    const thumbItems = thumbnailGallery.querySelectorAll('.thumbnail-item');
    thumbItems.forEach(item => {
        item.addEventListener('click', () => {
            const modelSrc = item.dataset.model;
            const imageDescription = item.dataset.description;
            const imageAlt = item.querySelector('img') ? item.querySelector('img').alt : 'Selected Model';
            selectThumbnail(item, { src: modelSrc, description: imageDescription, alt: imageAlt });
        });
    });

    // Function to handle thumbnail selection
    function selectThumbnail(selectedThumbItem, modelData) {
        // Update main model viewer
        if (modelData && modelData.src) {
            mainModel.src = modelData.src;
            mainModel.alt = modelData.alt || 'Selected model';
            mainModel.style.display = 'block';
            if(modelPlaceholder) modelPlaceholder.style.display = 'none';
        } else {
            mainModel.style.display = 'none';
            if(modelPlaceholder) modelPlaceholder.style.display = 'block';
        }
        
        // Update description
        descriptionArea.textContent = modelData ? modelData.description : 'Select a model to see its description.';

        // Update selected state for thumbnails
        thumbnailGallery.querySelectorAll('.thumbnail-item').forEach(item => {
            item.classList.remove('selected');
        });
        selectedThumbItem.classList.add('selected');
    }

    // Set a default selected model if desired (e.g., the first one)
    if (thumbItems.length > 0) {
        const firstThumbItem = thumbItems[0];
        const firstModelSrc = firstThumbItem.dataset.model;
        const firstImageDescription = firstThumbItem.dataset.description;
        const firstImageAlt = firstThumbItem.querySelector('img') ? firstThumbItem.querySelector('img').alt : 'Selected Model';
        // Ensure the mainModel element is ready before trying to set its src
        // Sometimes model-viewer might not be fully initialized immediately
        setTimeout(() => {
            selectThumbnail(firstThumbItem, { src: firstModelSrc, description: firstImageDescription, alt: firstImageAlt });
        }, 0); 
    }

    // Back and Next button functionality (currently disabled in HTML)
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    // Example: Enable them if you have logic for them
    // backButton.disabled = false;
    // nextButton.disabled = false;

    // Add event listeners if they were to be functional
    // backButton.addEventListener('click', () => { console.log('Back clicked'); });
    // nextButton.addEventListener('click', () => { console.log('Next clicked'); });
});
