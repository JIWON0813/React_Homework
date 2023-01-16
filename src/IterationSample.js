import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function getFireWorksAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 300,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

function getSnowAnimationSettings(angle, originX) {
  return {
    particleCount: 1,
    startVelocity: 0,
    ticks: 200,
    gravity: 0.3,
    origin: {
      x: Math.random(),
      y: Math.random() * 0.999 - 0.2
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    scalar: randomInRange(0.4, 1)
  };
}

function IterationSample () {
    const [names, setNames] = useState([
      { id: 1, text: "눈사람", style: {}},
      { id: 2, text: "얼음", style: {} },
      { id: 3, text: "눈", style: {} },
      { id: 4, text: "바다", style: {} },
    ])
    const [inputText, setInputText] = useState("")
    //const [intervalId, setIntervalId] = useState()
    const idRef = useRef(5)
    const refAnimationInstance = useRef(null)
    const [divStyle, setDivStyle] = useState({})
  
    const onChange = (e) => setInputText(e.target.value);
    const onAdd = () => {
      const nextNames = names.concat({
        id: idRef.current++,
        text: inputText,
        style: {},
      });
      setNames(nextNames) // name 값을 업데이트 한다. (concat)
      setInputText("") // 이벤트가 작동하면, input을 비워준다.
    }
  
    // list 클릭시 제거
    const onRemove = (e) => {
      let inteval = null;
      if(e.text === "폭죽"){
        inteval = setInterval(fireWorksAnimation, 400);
        setTimeout(() => clearInterval(inteval), 3000);
      }
      else if(e.text === "눈"){
        inteval = setInterval(snowAnimation, 16);
        setDivStyle({ backgroundColor : 'lightgrey', width : '100%' , height : '100%'})
        setTimeout(() => {
          clearInterval(inteval)
          setDivStyle({})
        }, 10000);
      }
      const nextNames = names.filter((name) => name.id !== e.id)
      setNames(nextNames)
    }
  
    // 엔터키 로직
    const onKeyPress = (e) => {
      if (e.key === "Enter") {
        onAdd()
      }
    }

    const onChangeStyle = (id) => {
      const nextNames = names.map((name) => {
        if(name.id === id){
          name.style = name.style.textDecoration != null ? {} : {textDecoration: 'line-through'}
        }
        return name
      })
      setNames(nextNames)
    }
  
    const namesList = names.map((name) => (
      <li key={name.id} onClick={() => onChangeStyle(name.id)} onDoubleClick={() => onRemove(name)} style={name.style}>
        {name.text}
      </li>
    ))
  
    const fireWorksAnimation = useCallback(() => {
      if (refAnimationInstance.current) {
        refAnimationInstance.current(getFireWorksAnimationSettings(0.1, 0.3));
        refAnimationInstance.current(getFireWorksAnimationSettings(0.7, 0.9));
      }
    }, []);

    const snowAnimation = useCallback(() => {
      if (refAnimationInstance.current) {
        refAnimationInstance.current(getSnowAnimationSettings(60, 0));
        refAnimationInstance.current(getSnowAnimationSettings(120, 1));
      }
    }, []);

    const getInstance = useCallback((instance) => {
      refAnimationInstance.current = instance;
    }, []);

    return (
      <div style={divStyle}>
        <input value={inputText} onChange={onChange} onKeyPress={onKeyPress} />
        <button onClick={onAdd}>추가</button>
        <ul>{namesList}</ul>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </div>
    )
};
  
  export default IterationSample;