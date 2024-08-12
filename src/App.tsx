
import React, { useState } from 'react';
import JsonComparison from './JsonComparison';

const App: React.FC = () => {
  const [jsons, setJsons] = useState<Record<string, any>[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setJsons((prevJsons) => [...prevJsons, json]);
        } catch (err) {
          console.error('Invalid JSON file:', err);
          alert('The uploaded file is not a valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>JSON Comparison</h1>
      <input type="file" accept="application/JSON" onChange={handleFileUpload} style={{ float: 'right' }} />
      {jsons.length > 0 && <JsonComparison jsons={jsons} />}
    </div>
  );
};

export default App;