```javascript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadDocument } from '../store/actions';
import useAPI from '../hooks/useAPI';

const DocumentScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const dispatch = useDispatch();
  const api = useAPI();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };error) {
      console.error('Error scanning document:', error);
    }
  };

  return (
    <div className="document-scanner">
      <h2>Document Scanner</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleScan}>Scan Document</button>
      {scannedText && (
        <div className="scanned-text">
          <h3> Text:</h3>
          <p>{scannedText}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentScanner;
```
</h3>Scanned</h2>

  const handleScan = async () => {
    if (!selectedFile) {
      alert('Please select a file to scan.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post('/ocr/scan', formData);
      setScannedText(response.data.text);
      dispatch(uploadDocument(response.data));
    } catch (