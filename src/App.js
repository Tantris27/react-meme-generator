import React, { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    fetch('https://api.memegen.link/templates/').then((x) =>
      x.json().then((response) => setTemplates(response)),
    );
  }, []);

  return (
    <div>
      <div>
        {(!template &&
          templates.map((temp) => {
            return (
              <input
                type="image"
                style={{ width: 200 }}
                key={temp.id}
                src={temp.example}
                alt={temp.name}
                onClick={(e) => {
                  e.preventDefault();
                  setTemplate(temp);
                  console.log(temp);
                }}
              />
            );
          })) || (
          <img
            style={{ width: 200 }}
            key={template.id}
            src={template.example}
            alt={template.name}
          />
        )}
      </div>
    </div>
  );
}
export default App;
