import { useState, useEffect } from 'react'

const Todos = () => {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
    const [editTodos, setEditTodos] = useState(null)

    useEffect(() => {
        if(editTodos) {
            setInput(editTodos.title)
        }else {
            setInput('')
        }
    }, [setInput, editTodos]);

    const updateTodos = (id, completed, title) => {

        const newTodos = todos.map(todo => {
            return todo.id === id ? { id, completed, title } : todo
        })

        setTodos(newTodos);
        setEditTodos("")
    }

    const addTodos = (event) => {
        event.preventDefault();

        if (!editTodos) {
            setTodos([...todos, {
                id: Math.floor(Math.random() * 10000),
                complete: false,
                title: input
            }])

            setInput('');
        } else {
            updateTodos(editTodos.id, editTodos.completed, input);
        }
    }

    const removeTodos = (todoId) => {
        const deleteTodo = todos.filter(todo => todo.id !== todoId);
        setTodos(deleteTodo);
    }

    const completeTodo = (todoId) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, completed: !todo.completed }
                }

                return todo
            })
        )
    }

    const editTodo = (todoId) => {
        const findTodo = todos.find(todo => todo.id === todoId)
        setEditTodos(findTodo)
    }




    return (
        <div className="todo">
            <form onSubmit={addTodos}>
                <input
                    id="todo"
                    type="text"
                    className="todo-input"
                    placeholder="Add Todo"
                    name="todo"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit" className="todo-addBtn">Add Todo</button>
            </form>

            <div className="todosAll">
                {
                    todos.map((todo) => (
                        <div className="todos" key={todo.id}>
                            <h5 className="todo-text">{todo.title}</h5>

                            <div className="todos-buttons">
                                <button disabled={todo.completed ? true : false} onClick={() => completeTodo(todo.id)} style={{ background: `${todo.completed === true ? 'rgb(148, 146, 146)' : 'rgb(0, 217, 255)'}`, padding: "8px 12px" }}>Completed</button>
                                <button onClick={() =>  editTodo(todo.id)} style={{ background: "rgb(126, 248, 4)", padding: "8px 12px", margin: "0 10px" }}>Edit</button>
                                <button onClick={() => removeTodos(todo.id)} style={{ background: "rgb(248, 93, 4)", padding: "8px 12px" }}>Delete</button>
                            </div>
                        </div>
                    ))

                }


            </div>
        </div>
    )
}

export default Todos