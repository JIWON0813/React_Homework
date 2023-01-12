import React, {useState, useRef} from 'react';

function IterationSample () {
    const [names, setNames] = useState([
      { id: 1, text: "눈사람", style: {}},
      { id: 2, text: "얼음", style: {} },
      { id: 3, text: "눈", style: {} },
      { id: 4, text: "바다", style: {} },
    ])
    const [inputText, setInputText] = useState("")
    const idRef = useRef(5)
  
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
    const onRemove = (id) => {
      const nextNames = names.filter((name) => name.id !== id)
      setNames(nextNames)
    }
  
    // 엔터키 로직
    const onKeyPress = (e) => {
      if (e.key === "Enter") {
        onAdd()
      }
    }

    const onChangeStyle = (id) => {
      const nextNames = names.map((name) =>{
        if(name.id == id){
          if(name.style.textDecoration != null){
            name. style = {}
          }
          else{
            name.style = {textDecoration: 'line-through'}
          }
        }
      })
      setNames(nextNames)
    }
  
    const namesList = names.map((name) => (
      <li key={name.id} onClick={() => onChangeStyle(name.id)} onDoubleClick={() => onRemove(name.id)} style={name.style}>
        {name.text}
      </li>
    ))
    return (
      <>
        <input value={inputText} onChange={onChange} onKeyPress={onKeyPress} />
        <button onClick={onAdd}>추가</button>
        <ul>{namesList}</ul>
      </>
    )
};
  
  export default IterationSample;