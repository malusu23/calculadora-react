import { useState } from 'react'
import { create, all } from 'mathjs';
import Button from './components/atoms/Button.jsx';
import './App.css';
import logobraun from './assets/Imágenes/logobraun.jpg';
import circulonegro from './assets/Imágenes/circulonegro.jpg';
import circuloblanco from './assets/Imágenes/circuloblanco.jpg';
import circuloverde from './assets/Imágenes/circuloverde.png';
import circulorojo from './assets/Imágenes/circulorojo.png';




const math = create(all);

function App() {
  const [data, setData] = useState({ operacion: '', resultado: '' });

  const escritura = (valor) => {
    const esOperacion = valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '%' || valor === '√';

    if (data.operacion.length >= 10) return;
    if (valor === '+/-' && data.operacion === '') return;
    if (valor === '%' && data.operacion.includes('%')) return;

    if (data.operacion.includes('Error')) {
      setData({ ...data, operacion: valor });
    } else if (data.resultado !== '' && data.operacion === '' && esOperacion) {
      setData({ ...data, operacion: `${data.resultado}` + valor });
    } else if (valor === '+/-' && data.operacion !== '') {
      if (data.operacion.slice(0, 1) === '-') {
        setData({ ...data, operacion: `${data.operacion.slice(1, data.operacion.length)}` });
      } else {
        setData({ ...data, operacion: `-${data.operacion}` });
      }
    } else {
      setData({ ...data, operacion: `${data.operacion}` + valor });
    }
  };

  const parcialclear = () => {
    setData({ ...data, operacion: data.operacion.slice(0, data.operacion.length - 1) });
  };

  const clearScreen = () => {
    setData({ operacion: '', resultado: '' });
  };

  const calculateResult = () => {
    try {
      let resultado = '';

      if (data.operacion.includes('%')) {
        const valores = data.operacion.split('%');
        resultado = math.evaluate(`${valores[0]} * (${valores[1]} / 100)`);
      } else {
        resultado = math.evaluate(data.operacion);
      }

      setData({ ...data, resultado: resultado.toString(), operacion: '' });
    } catch (error) {
      setData({ ...data, operacion: 'Error' });
    }
  };

  const calculateSquareroot = () => {
    try {
      const number = parseFloat(data.operacion);
      const result = math.sqrt(number);
      setData({ ...data, operacion: result.toString() });
    } catch (error) {
      setData({ ...data, operacion: 'Error' });
    }
  };

  return (
    <>
      <div className='wrapper'>

        <div className="logobox">
          <img className="logo" src={logobraun} alt="Logo Braun ET66"/>    
        </div >


        <div className='screenwrapper'>
          <span className="display">{data.operacion || data.resultado}</span>
        </div>

        <div className="onoff">
          <img className="puntocolor" src={circulorojo}/>
          <img className="puntocolor" src={circuloverde}/>
        </div>
       
  
        <div className="puntos">
          <img className="puntovacio" src={circuloblanco} />
          <img  className="puntovacio" src={circuloblanco} />
        </div>
       
        <div className="puntos2">
            <img className='puntodelineado' src={circuloblanco} />
            <img className='puntodelineado'  src={circulonegro} />
        </div>

     

        <div className='decorativebuttons'>
          <button className="decorative">M+</button>
          <button className="decorative">M-</button>
          <button className="decorative">MR</button>
          <button className="decorative">MC</button>
          <button className="decorative" onClick={() => escritura('+/-')}>+/-</button>
        </div>

        <div className='buttonswrapper'>
          <div className="line2">
            <Button texto='√' clase='operacion' handleClick={calculateSquareroot} />
            <Button texto='7' clase='numero' handleClick={escritura} />
            <Button texto='8' clase='numero' handleClick={escritura} />
            <Button texto='9' clase='numero' handleClick={escritura} />
            <Button texto='/' clase='operacion' handleClick={escritura} />
          </div>
          <div className="line3">
            <Button texto='%' clase='operacion' handleClick={escritura} />
            <Button texto='4' clase='numero' handleClick={escritura} />
            <Button texto='5' clase='numero' handleClick={escritura} />
            <Button texto='6' clase='numero' handleClick={escritura} />
            <Button texto='*' clase='operacion' handleClick={escritura} />
          </div>
          <div className="line4">
            <Button texto='CE' clase='operacion' handleClick={clearScreen} />
            <Button texto='1' clase='numero' handleClick={escritura} />
            <Button texto='2' clase='numero' handleClick={escritura} />
            <Button texto='3' clase='numero' handleClick={escritura} />
            <Button texto='-' clase='operacion' handleClick={escritura} />
          </div>
          <div className="line5">
            <Button texto='c' clase='numero' handleClick={parcialclear} />
            <Button texto='0' clase='numero' handleClick={escritura} />
            <Button texto='.' clase='operacion' handleClick={escritura} />
            <Button texto='=' clase='igual' handleClick={calculateResult} />
            <Button texto='+' clase='operacion' handleClick={escritura} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;