import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

const init = () => JSON.parse( localStorage.getItem('todos') ) || [];

export const useTodos = () => {
    const [ todos , dispatchTodo ] = useReducer( todoReducer, [], init );
    const totalTodos = todos.length;
    const pendingTodos = todos.filter( todo => !todo.done ).length;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'ADD',
            payload: todo
        }
        dispatchTodo(action)
    }

    const handleDeleteTodo = ( todo ) => {
        const action = {
            type: 'DELETE',
            payload: todo
        }
        dispatchTodo( action );
    }

    const onToggleTodo = ( todo ) => {
        const action = {
            type: 'TOGGLE',
            payload: todo
        }
        dispatchTodo( action );
    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        onToggleTodo,
        totalTodos,
        pendingTodos
    }
}