function compressImage() {
    const input = document.getElementById('uploadImage');
    const canvas = document.getElementById('canvas');
    const compressedImage = document.getElementById('compressedImage');
    const downloadImage = document.getElementById('downloadImage');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const width = img.width;
                const height = img.height;
                const scaleFactor = 0.5; // Rasio kompresi

                // Resize canvas ke ukuran baru
                canvas.width = width * scaleFactor;
                canvas.height = height * scaleFactor;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Konversi canvas ke URL gambar
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Mengatur kualitas (0-1)

                // Tampilkan hasil kompresi
                compressedImage.src = compressedDataUrl;
                compressedImage.style.display = 'block';

                // Siapkan link download
                downloadImage.href = compressedDataUrl;
                downloadImage.style.display = 'inline-block';
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert('Pilih gambar terlebih dahulu!');
    }
}

function uploadPDF() {
    const form = document.getElementById('pdfForm');
    const formData = new FormData(form);

    fetch('/compress-pdf', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const link = document.getElementById('downloadPDF');
        link.href = URL.createObjectURL(blob);
        link.style.display = 'inline-block';
        link.download = 'compressed-pdf.pdf';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengunggah PDF.');
    });
}
