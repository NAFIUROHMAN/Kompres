const fs = require('fs');
const path = require('path');

const testFolderPath = path.join('D:', 'KOMPRES', 'uploads');

// Cek apakah folder dapat dibaca
fs.readdir(testFolderPath, (err, files) => {
    if (err) {
        console.error('Gagal membaca folder:', err);
    } else {
        console.log('Folder dapat dibaca, daftar file:', files);
    }
});

// Cek apakah folder dapat ditulis
fs.writeFile(path.join(testFolderPath, 'test.txt'), 'Test', (err) => {
    if (err) {
        console.error('Gagal menulis file:', err);
    } else {
        console.log('File berhasil ditulis ke folder.');
        // Hapus file uji setelah berhasil menulis
        fs.unlink(path.join(testFolderPath, 'test.txt'), (err) => {
            if (err) {
                console.error('Gagal menghapus file:', err);
            } else {
                console.log('File uji berhasil dihapus.');
            }
        });
    }
});
