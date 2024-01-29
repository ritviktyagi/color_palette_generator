import { useEffect, useState } from "react";
import "./App.css";
import { Card, Spinner } from "react-bootstrap";
import copy from "copy-to-clipboard";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "./CustomToast";
// import axios from "axios";

function App() {
  const [colorPalette, setColorPalette] = useState(null);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    getColors();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the pressed key is the spacebar (key code 32)
      if (event.keyCode === 32) {
        // Call your action here
        getColors();
      } else if (event.keyCode === 67) {
        // Call your action here
        if (colorPalette !== null) {
          copy(colorPalette);
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  async function getColors() {
    const colorArr = [];

    function generateRandomColor() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    }

    for (let i = 0; i < 5; i++) {
      const randomColor = generateRandomColor();
      colorArr.push(randomColor);
    }
    setColorPalette(colorArr);
  }

  const copyToClipboard = (color) => {
    copy(color);
    setSelectedColor(color);
    setShowToastMessage(true);
  };

  return (
    <div
      className="container-fluid px-5 py-3 custom overflow-scroll"
      style={{
        width: "98vw",
        backgroundColor: "hsl(177, 26%, 92%)",
      }}
    >
      <h1>Color palette generator</h1>
      <div className="py-5 d-flex gap-4 justify-content-center custom-palette">
        {colorPalette !== null ? (
          colorPalette?.map((item, idx) => (
            <Card
              className="p-0"
              style={{ width: "10rem", cursor: "pointer" }}
              key={idx}
              onClick={() => copyToClipboard(item)}
            >
              <div
                className="m-1 rounded-1"
                style={{ height: "12rem", backgroundColor: `${item}` }}
              />
              <Card.Body>
                <Card.Text>{item.toUpperCase()}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
      <div className="mt-3">
        <button
          className="text-white w-25"
          style={{ backgroundColor: "#9073c1" }}
          onClick={() => getColors()}
        >
          Generate palette
        </button>
        <p className="pt-3 custom-fw">
          Or just press the "Spacebar" to generate new palettes.
        </p>
      </div>
      <div className="pt-5">
        <span className="bg-light px-3 py-2 rounded-pill">
          Click to copy individual color + Press "C" to copy palette
        </span>
      </div>
      <CustomToast
        selectedColor={selectedColor}
        showToastMessage={showToastMessage}
        setShowToastMessage={setShowToastMessage}
      />
    </div>
  );
}

export default App;
