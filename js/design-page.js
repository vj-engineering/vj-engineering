/* filepath: /home/erfan/Desktop/vj-engineering.github.io/js/design-page.js */
document.addEventListener('DOMContentLoaded', () => {
    const optionsPanel = document.getElementById('optionsPanel');
    const mainModelViewer = document.getElementById('mainModel');
    const descriptionArea = document.getElementById('descriptionArea'); // Added descriptionArea

    // Store the base path for GLB models
    const basePath = 'assets/glbs/';

    // Object to keep track of currently selected options
    const selectedOptions = {};

    // Initialize selectedOptions with default active buttons
    optionsPanel.querySelectorAll('.button-group .option-button.active').forEach(button => {
        const group = button.parentElement.dataset.group;
        selectedOptions[group] = button.dataset.value;
    });

    updateDescription(); // Initial description update

    optionsPanel.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-button')) {
            const button = event.target;
            const group = button.parentElement.dataset.group;
            const value = button.dataset.value;

            if (button.classList.contains('active')) {
                // Deactivate if already active
                button.classList.remove('active');
                delete selectedOptions[group];
            } else {
                // Update active state for buttons in the same group
                button.parentElement.querySelectorAll('.option-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                // Update selected options
                selectedOptions[group] = value;
            }

            // Trigger model change
            updateModel();
            updateDescription(); // Update description when options change
        }
    });

    function updateModel() {
        // Construct the model name based on selected options
        // This is a placeholder logic. You'll need to define how options map to models.
        // For example, if you have a naming convention like 'axle-material-capacity.glb'
        // let modelName = `${selectedOptions.axle}-${selectedOptions.material}-${selectedOptions.capacity}.glb`;

        // For now, let's use a simple logic: if '6*4' axle is selected, load '2.glb', else '1.glb'
        // You will need to expand this logic based on your available .glb files and how they correspond to the options.
        let modelName = '000.glb'; // Default model

        if (selectedOptions.ancillary === 'side_panel') {
            modelName = '004.glb';
        } else if (selectedOptions.ancillary === 'hose_tray') {
            modelName = '002.glb';
        } else if (selectedOptions.ancillary === 'suction') {
            modelName = '005.glb';
        } else if (selectedOptions.ancillary === 'tool_box') {
            modelName = '001.glb';
        }
        // Add more conditions for other options and their combinations
        // Example:
        // if (selectedOptions.material === 'SS316') {
        //     modelName = 'another-model.glb';
        // }

        if (mainModelViewer) {
            mainModelViewer.src = basePath + modelName;
            console.log(`Loading model: ${mainModelViewer.src}`);
        } else {
            console.error('Main model viewer not found.');
        }
    }

    // Function to update the description area
    function updateDescription() {
        if (!descriptionArea) {
            console.error('Description area not found.');
            return;
        }

        if (Object.keys(selectedOptions).length === 0) {
            descriptionArea.innerHTML = '<p class="description-placeholder">Select options to see the configuration.</p>';
            return;
        }

        let descriptionHtml = '<div class="configuration-summary">';
        descriptionHtml += '<h3 class="configuration-title">Current Configuration:</h3>';
        descriptionHtml += '<div class="configuration-items">';

        for (const group in selectedOptions) {
            if (selectedOptions.hasOwnProperty(group)) {
                const selectedButton = optionsPanel.querySelector(`.button-group[data-group="${group}"] .option-button[data-value="${selectedOptions[group]}"]`);
                const groupLabelElement = optionsPanel.querySelector(`.button-group[data-group="${group}"]`).previousElementSibling;
                let groupLabel = group; // Fallback to group name if label not found
                if (groupLabelElement && groupLabelElement.tagName === 'LABEL') {
                    groupLabel = groupLabelElement.textContent;
                }
                const valueText = selectedButton ? selectedButton.textContent : selectedOptions[group];
                
                descriptionHtml += '<div class="configuration-item">';
                descriptionHtml += `<span class="config-label">${groupLabel}:</span>`;
                descriptionHtml += `<span class="config-value">${valueText}</span>`;
                descriptionHtml += '</div>';
            }
        }
        descriptionHtml += '</div></div>';
        descriptionArea.innerHTML = descriptionHtml;
    }

    // Initial model load based on default selections
    updateModel();
});