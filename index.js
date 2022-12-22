const colorInputEl = document.getElementById('color-input')
const colorsMode = document.getElementById('colors-mode')
const buttonEl = document.getElementById('button-el')
const mainEl = document.querySelector('.main')
const count = 5;

buttonEl.addEventListener('click', function () {
    const hex = colorInputEl.value.replace('#', '');
    const mode = colorsMode.value;
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors
            render(colors)
        })

});


function render(colors) {
    const colorsOutput = colors.map(color => {
        const hexColor = color.hex.value;

        return `
            <div style="background-color: ${hexColor}" class="output-color">
                <span class="output-hex">${hexColor}</span>
            </div>
        `;
    }).join('');
    
    mainEl.innerHTML = colorsOutput;

    document.body.addEventListener('click', e => {
        const target = e.target;
        // Check if the click on hex code or color
        if(target.classList.contains('output-hex') || target.classList.contains('output-color')) {
            navigator.clipboard.writeText(target.textContent.trim());

            // Render the alert passing the message and the hex code
            renderAlert("You've copied ", target.textContent);
        }
    })
}

// Show an alert when the text copyied
function renderAlert(hexMessage, hexValue) {
    // Check if the alert already display if so delete => create next one
    const divEl = document.querySelector('.hex-alert');
    if(divEl) {
        divEl.remove();
    }

    // Create div
    const div = document.createElement('div');
    // Set a class to it
    div.className = 'hex-alert';
    // Append the message alongside the hex code
    div.appendChild(document.createTextNode(hexMessage + hexValue.trim()));

    // Get the parent element
    const main = document.querySelector('main');
    // Get the results color
    const mainOutput = document.querySelector('.main');
    
    // Set the alert above the colors that rendered from API
    main.insertBefore(div, mainOutput);

    // Delete the div after 1.5 second
    setTimeout(() => {
        div.remove();
    }, 1500)
}
