import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stars, setStars] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Função para gerar estrelas
  const generateStars = () => {
    const starCount = 1000; // Aumente o número de estrelas para 1000 ou mais
    const starsArray = [];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * 100; // Posição aleatória no eixo X (percentual)
      const y = Math.random() * 100; // Posição aleatória no eixo Y (percentual)
      const size = Math.random() * 2 + 1; // Tamanho aleatório entre 1 e 3px

      starsArray.push({ x, y, size });
    }

    setStars(starsArray);
  };

  // Função para mover o astronauta com as setas do teclado
  const handleKeyPress = (event) => {
    const movementSpeed = 10; // Velocidade do movimento
    switch (event.key) {
      case 'ArrowUp':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - movementSpeed }));
        break;
      case 'ArrowDown':
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + movementSpeed }));
        break;
      case 'ArrowLeft':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - movementSpeed }));
        break;
      case 'ArrowRight':
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + movementSpeed }));
        break;
      default:
        break;
    }
  };

  // Chama a função para gerar estrelas quando o componente é montado
  useEffect(() => {
    generateStars();
    window.addEventListener('keydown', handleKeyPress); // Adiciona evento de teclas

    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Remove evento ao desmontar
    };
  }, []);

  return (
    <div className="app-container">
      <div className="stars-container">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
          ></div>
        ))}
      </div>
      <h1> - Mova o Astronauta -
      </h1>
      <div className="astronaut" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <img
          src="https://img.freepik.com/vetores-premium/astronauta-no-espaco-sobre-um-fundo-preto_1057-113477.jpg"
          alt="Astronauta"
        />
      </div>
    </div>
  );
}

export default App;
