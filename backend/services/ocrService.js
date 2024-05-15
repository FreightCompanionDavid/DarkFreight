const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

// Function to process OCR on a given image file
const processOCR = async (imagePath) => {
    try {
        const result = await Tesseract.recognize(
            imagePath,
            'eng',
            {
                logger: (m) => console.log(m),
            }
        );
        return result.data.text;
    } catch (error) {
        console.error('Error processing OCR:', error);
        throw new Error('OCR processing failed');
    }
};

// Function to save OCR result to a file
const saveOCRResult = (text, outputPath) => {
    try {
        fs.writeFileSync(outputPath, text, 'utf8');
        console.log('OCR result saved to', outputPath);
    } catch (error) {
        console.error('Error saving OCR result:', error);
        throw new Error('Failed to save OCR result');
    }
};

// Function to handle OCR processing and saving result
const handleOCR = async (imagePath, outputDir) => {
    try {
        const text = await processOCR(imagePath);
        const outputFilePath = path.join(outputDir, `${path.basename(imagePath, path.extname(imagePath))}.txt`);
        saveOCRResult(text, outputFilePath);
        return outputFilePath;
    } catch (error) {
        console.error('Error handling OCR:', error);
        throw new Error('OCR handling failed');
    }
};

module.exports = {
    processOCR,
    saveOCRResult,
    handleOCR,
};
