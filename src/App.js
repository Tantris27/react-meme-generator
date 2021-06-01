import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState([]);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [meme, setMeme] = useState([]);

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
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);
    anchor.click();
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
  if (meme.type) {
    return (
      <>
        <header>
          <h1>Meme Templates</h1>
        </header>
        <div className="divstyle3">
          <h2>Your Meme!</h2>
          <img src={meme.url} alt="custom meme" />
          <button onClick={() => download(meme.url)}>Download Meme</button>
          <button
            className="deletebutton"
            onClick={(e) => {
              e.preventDefault();
              setTemplate([]);
              setMeme([]);
            }}
          >
            Back to Memes
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {' '}
        {template.length === 0 && (
          <>
            <header>
              <h1>Meme Templates</h1>
              {/* <button
            onClick={(e) => {
              e.preventDefault();
              setTemplate([]);
            }}
          >
            Back to Memes
          </button> */}
            </header>
            <div className="divstyle1">
              <h2>Choose a Template</h2>
              <div className="picstyle">
                {templates.map((temp) => {
                  return (
                    <input
                      className="pics"
                      type="image"
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
            </div>
          </>
        )}
        {template.id && (
          <>
            <header>
              <h1>Meme Templates</h1>
            </header>
            <div className="divstyle2">
              <div className="createMeme">
                <h2 style={{ margin: 0 }}>Customize Meme</h2>
                <input
                  type="text"
                  value={text1}
                  onChange={handleChange1}
                  className="text"
                  placeholder="Top Text"
                />
                <img
                  key={template.id}
                  src={template.example}
                  alt={template.name}
                />
                <input
                  type="text"
                  value={text2}
                  onChange={handleChange2}
                  className="text"
                  placeholder="Bottom Text"
                />
                <button type="submit" onClick={handleSubmit}>
                  Create Meme
                </button>
                <button
                  className="deletebutton"
                  onClick={(e) => {
                    e.preventDefault();
                    setTemplate([]);
                  }}
                >
                  Back to Memes
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default App;
