import React, { useState } from 'react';
import './App.css';

function Todo({todo, index, completeTodo, removeTodo}){
  return (
    <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}
         className='todo'>
      {todo.text}
    <div>
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>x</button>

    </div>
    </div>
  )
}

// Setting empty state for the form input using Hook
function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        placeholder= 'Add Todo...'
        onChange={e => setValue(e.target.value)}/>
    </form>
  )
}

// Add states to componants
export default function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Enter your TODO list',
      isCompleted: false
    },
    {
      text: 'Apply for INHAABIT',
      isCompleted: false
    }
  ]);

  const addTodo = text =>{
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Mapping over todo items from state and displaying them.
  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
          <TodoForm classNmae='todo-add'addTodo={addTodo}/>
      </div>
    </div>
  )
}

