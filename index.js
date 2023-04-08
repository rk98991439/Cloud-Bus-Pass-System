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