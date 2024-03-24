import React from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }
    if (characters) {
      str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    }

    for (let i = 0; i <= length; i++) {
      let text = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(text);
    }
    setPassword(pass);
  }, [length, number, characters, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, characters, setPassword]);
  const handleCopy = () => {
    window.navigator.clipboard
      .writeText(password)
      .then(alert("Copied the Password"));
  };
  return (
    <div
      className="w-full max-w-lg mx-auto shadow-md
  rounded-1g p-4 mt-12 rounded-xl text-center text-orange-500 bg-gray-700"
    >
      Password Generator
      <div className="flex shadow rounded-1g overflow-hidden mb-4 mt-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          onClick={handleCopy}
          className="outline-none bg-blue-700 text-white
px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <input
        type="range"
        className="mx-2"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      Length {length}
      <input
        type="checkbox"
        className="mx-2"
        value={number}
        onChange={() => setNumber(!number)}
      />
      Numbers
      <input
        value={characters}
        onChange={() => setCharacters(!characters)}
        type="checkbox"
        className="mx-2"
      />
      Characters
    </div>
  );
}

export default App;
