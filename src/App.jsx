import './App.css'
import { useState , useEffect} from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev , { id: Date.now() , ...todo}])
  }

  const updatedTodo = (id , todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id) === id ? todo : prevTodo ))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((each) => each.id === id ? {...each , completed: !each.completed} : each))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos' , JSON.stringify(todos))
  }, [todos])

  return (
    <>
    <TodoProvider value={{todos , addTodo , updatedTodo , deleteTodo , toggleComplete}}>
      <div className='bg-[#172842] min-h-screen py-8'>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage Todos</h1>

              <div className="mb-4">
                {/* todo goes here */}
                <TodoForm/>
              </div>

              <div className="flex flex-wrap gap-y-3">
                {/* loop */}
                {
                  todos.map((todo) => (
                    <div className='w-full' key={todo.id}>
                      <TodoItem todo={todo}/>
                    </div>
                  ))
                }
              </div>

          </div>
      </div>
      </TodoProvider>
    </>
  )
}

export default App
