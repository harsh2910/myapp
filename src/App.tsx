import React, { useState } from 'react';
import JsonComparison from './JsonComparison';

const App: React.FC = () => {
  const [jsons, setJsons] = useState<Record<string, any>[]>([]);
  const [jsonString, setJsonString] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (Array.isArray(json)) {
            setJsons((prevJsons) => [...prevJsons, ...json]);
          } else {
            setJsons((prevJsons) => [...prevJsons, json]);
          }
        } catch (err) {
          console.error('Invalid JSON file:', err);
          alert('The uploaded file is not a valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonStringChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(event.target.value);
  };

  const handleAddJsonString = () => {
    try {
      const json = JSON.parse(jsonString);
      if (Array.isArray(json)) {
        setJsons((prevJsons) => [...prevJsons, ...json]);
      } else {
        setJsons((prevJsons) => [...prevJsons, json]);
      }
      setJsonString('');
    } catch (err) {
      console.error('Invalid JSON string:', err);
      alert('The entered string is not a valid JSON.');
    }
  };

  const handleNewComparison = () => {
    setJsons([]);
    setJsonString('');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>JSON Comparison</h1>
      <input type="file" accept="application/JSON" onChange={handleFileUpload} style={{ float: 'right' }} />
      <div>
        <textarea
          value={jsonString}
          onChange={handleJsonStringChange}
          placeholder="Enter JSON string here"
          rows={2}
          cols={50}
          style={{ marginLeft: '20px' }}
        />
        <button onClick={handleAddJsonString}>Add JSON</button>
        <button style={{ marginLeft: '100px' }}onClick={handleNewComparison}>New Comparison</button>
      </div>
      {jsons.length > 0 && <JsonComparison jsons={jsons} />}
    </div>
  );
};

export default App;