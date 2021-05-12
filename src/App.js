/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.css';
import { useEffect, useState } from 'react';

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
      {templates.map((template1) => {
        return (
          <img
            key={template1.id}
            src={template1.example}
            alt={template1.name}
            onClick={setTemplate(template1)}
          />
        );
      })}
    </div>
  );
}
export default App;
