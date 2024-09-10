import express from 'express';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';
import PDFDocumentKit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const app = express();
const port = 3000;

// Setup multer untuk mengelola file upload
const upload = multer({ dest: 'uploads/' });

// Serve file statis dari direktori 'public'
app.use(express.static('public'));

// Endpoint untuk mengunggah dan mengolah file PDF
app.post('/compress-pdf', upload.single('pdf'), async (req, res) => {
    console.log('File yang diterima:', req.file);
    try {
        const pdfPath = req.file.path;
        const pdfBytes = fs.readFileSync(pdfPath);
        console.log('File PDF berhasil dibaca.');
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Kompresi dengan menghapus metadata
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');

        const compressedPdfBytes = await pdfDoc.save();

        // Simpan file PDF yang dikompresi
        const compressedPdfPath = path.join('uploads', `compressed-${req.file.originalname}`);
        fs.writeFileSync(compressedPdfPath, compressedPdfBytes);

        res.download(compressedPdfPath, 'compressed-pdf.pdf', () => {
            fs.unlinkSync(pdfPath);
            fs.unlinkSync(compressedPdfPath);
        });
    } catch (error) {
        console.error('Error saat mengompresi PDF:', error);
        res.status(500).send('Terjadi kesalahan saat mengompresi PDF.');
    }
});


// Mulai server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
