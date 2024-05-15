const QRCode = require('qrcode');

// Generate a QR code
const generateQRCode = async (text) => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(text);
        return qrCodeDataURL;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
};

// Decode a QR code
const decodeQRCode = async (dataURL) => {
    try {
        const decodedText = await QRCode.toString(dataURL, { type: 'terminal' });
        return decodedText;
    } catch (error) {
        console.error('Error decoding QR code:', error);
        throw new Error('Failed to decode QR code');
    }
};

module.exports = {
    generateQRCode,
    decodeQRCode,
};
