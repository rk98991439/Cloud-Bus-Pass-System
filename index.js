function generateQRCode(value) {
    let formData = new FormData();
    formData.append('data', value);
    fetch('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+value, {
        method: 'POST',
        body: formData
    }).then((res) => {
        res.body.getReader().read().then((img) => {
            let imageByteArray = img.value;
            let stringValue = String.fromCharCode(...imageByteArray);
            let encodedValue = btoa(stringValue);
            document.getElementById('qrcode').src = `data:image/png;base64,${encodedValue}`;
        })
    })
}


function readQRCode(files) {
    const resultContainer = document.querySelector('#result');

    if (files && files[0]) {
      const apiUrl = 'http://api.qrserver.com/v1/read-qr-code/';
      const formData = new FormData();
      formData.append('file', files[0]);

      // Send the image file to the QR code reader API using a POST request
      fetch(apiUrl, { method: 'POST', body: formData })
        .then((response) => response.json())
        .then((data) => {
          if (data[0].symbol[0].error) {
            console.error(data[0].symbol[0].error);
          } else {
            // Display the QR code content in the result container
            resultContainer.innerText = data[0].symbol[0].data;
          }
        })
        .catch((error) => console.error(error));
    }
  }