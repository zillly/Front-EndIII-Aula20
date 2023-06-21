import React, { useReducer, useEffect, useState } from 'react';

const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return  action.payload;
      case 'REMOVE_ITEM':
        return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const List = () => {
  const [list, dispatch] = useReducer(listReducer, [
    {
        id: 1,
        text: "teste"
      }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      dispatch({ type: 'ADD_ITEM', payload: JSON.parse(storedList) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
        const newItem = {
            id: Date.now(),
            text: inputValue
          };

          dispatch({
            type: "ADD_ITEM",
            payload: [...list, newItem]
          });
          
      setInputValue('');
    }
  };

  const handleRemoveItem = (id) => {

    dispatch(
      {
        type: "REMOVE_ITEM",
        payload: id
      }
    )
  };

  return (
    <div>
      <h2>Lista</h2>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Adicionar</button>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
