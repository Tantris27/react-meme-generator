import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch('https://api.memegen.link/templates/').then((x) =>
      x.json().then((response) => setTemplates(response)),
    );
  }, []);

  const handleChange1 = (e) => {
    setText1(e.currentTarget.value);
  };
  const handleChange2 = (e) => {
    setText2(e.currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://api.memegen.link/images/${template.id}/${text1}/${text2}.png`,
    );
    setMeme(response);
  };
  const download = () => {
    const element = document.createElement('a');

    console.log(document.createElement('a'));
    const file = new Blob([meme.url], { type: 'image/*' });
    console.log(URL.createObjectURL(file));
    element.href = URL.createObjectURL(file);
    element.download = 'image.png';
    element.click();
  };
  if (meme) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img style={{ width: 300 }} src={meme.url} alt="custom meme" />
        {console.log(meme)}
        <a href={meme.url} download onClick={() => download()}>
          Download Meme
        </a>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'space-around',
        }}
      >
        <div>
          {!template && (
            <>
              <h1 style={{ textAlign: 'center', display: 'block' }}>
                Choose a Template
              </h1>
              <div className="picstyle">
                {templates.map((temp) => {
                  return (
                    <input
                      className="pics"
                      type="image"
                      // style={{ width: 200,}}
                      key={temp.id}
                      src={temp.example}
                      alt={temp.name}
                      onClick={(e) => {
                        e.preventDefault();
                        setTemplate(temp);
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}
          {template && (
            <div>
              <img
                style={{ width: 200 }}
                key={template.id}
                src={template.example}
                alt={template.name}
              />
              <input type="text" value={text1} onChange={handleChange1} />
              <input type="text" value={text2} onChange={handleChange2} />
              <button type="submit" onClick={handleSubmit}>
                Create Meme
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
