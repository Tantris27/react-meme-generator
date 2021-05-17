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
  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }
  function download(url, filename) {
    if (!filename) filename = 'customMeme';

    fetch(url, {
      headers: new Headers({ Origin: window.location.origin }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((e) => console.error(e));
  }
  if (meme) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img style={{ width: 300 }} src={meme.url} alt="custom meme" />
        {console.log(meme)}
        <a href={meme.url} download onClick={() => download(meme.url)}>
          Download Meme
        </a>
      </div>
    );
  } else {
    return (
      <>
        {' '}
        <header>
          <h1>Meme Templates</h1>
        </header>
        <div className="divstyle">
          <div>
            {!template && (
              <>
                <h2 style={{ textAlign: 'center', display: 'block' }}>
                  Choose a Template
                </h2>
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
      </>
    );
  }
}

export default App;
