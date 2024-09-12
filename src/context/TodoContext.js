import { useContext , createContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo: "Todo",
            completed: false
        }
    ] ,
    addTodo: (todo) => {},
    updatedTodo: (todo , id) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});



export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider;