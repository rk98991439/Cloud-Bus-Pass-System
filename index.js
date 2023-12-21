function generateQRCode(value) {
    // Create a FormData object to send data in the request
    const formData = new FormData();
    formData.append('data', value);

    // Define the API URL for generating QR codes
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`;

    // Fetch the QR code image and update the src attribute of the img element
    fetch(apiUrl, {
        method: 'GET', // Use GET since we are fetching an image
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then((blob) => {
        const reader = new FileReader();
        reader.onload = function() {
            document.getElementById('qrcode').src = reader.result;
        };
        reader.readAsDataURL(blob);
    })
    .catch((error) => {
        console.error('Error fetching and displaying QR code:', error);
    });
}

function readQRCode(files) {
    const resultContainer = document.querySelector('#result');

    if (files && files[0]) {
        // Create a FormData object and append the selected file to it
        const formData = new FormData();
        formData.append('file', files[0]);

        // Define the API URL for reading QR codes
        const apiUrl = 'https://api.qrserver.com/v1/read-qr-code/';

        // Send the image file to the QR code reader API using a POST request
        fetch(apiUrl, {
            method: 'POST',
            body: formData
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data[0].symbol[0].error) {
                console.error('QR code read error:', data[0].symbol[0].error);
            } else {
                // Display the QR code content in the result container
                resultContainer.innerText = data[0].symbol[0].data;
            }
        })
        .catch((error) => {
            console.error('Error reading QR code:', error);
        });
    }
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// color change 

const toggleSwitch = document.querySelector('.toggle-checkbox');

function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		// set the background color to black
		document.body.style.backgroundColor = "#FFA900";
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		// set the background color to white
		document.body.style.backgroundColor = "#FFD085";
	}
}

toggleSwitch.addEventListener('change', switchTheme);
