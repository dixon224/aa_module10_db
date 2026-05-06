import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "https://todo-backend-blush-nine.vercel.app/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await axios.post(API_URL, { title });
      setTodos([response.data, ...todos]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-blue-200 text-sm uppercase tracking-widest mb-2">
            Module 10 After Assignment
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Simple Todo List App
          </h1>
          <p className="text-slate-300 mt-3">
            Manage your tasks with React, Express, MongoDB, and Tailwind CSS and
            see you Pronto.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
          <form
            onSubmit={addTodo}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <input
              type="text"
              placeholder="What do you need to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-white text-slate-800 placeholder:text-slate-400 rounded-xl px-5 py-3 outline-none focus:ring-4 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition"
            >
              Add Task
            </button>
          </form>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">Your Tasks</h2>
            <span className="text-sm text-blue-100 bg-white/10 px-3 py-1 rounded-full">
              {todos.length} task{todos.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {loading ? (
              <p className="text-center text-slate-300 py-6">
                Loading tasks...
              </p>
            ) : todos.length === 0 ? (
              <div className="text-center bg-white/10 border border-white/10 rounded-2xl py-10">
                <p className="text-5xl mb-3">📝</p>
                <p className="text-white font-medium">No tasks yet</p>
                <p className="text-slate-300 text-sm mt-1">
                  Add your first task above.
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="group flex justify-between items-center bg-white rounded-2xl px-5 py-4 shadow-md hover:shadow-xl transition"
                >
                  <div>
                    <p className="text-slate-800 font-medium">{todo.title}</p>
                    <p className="text-xs text-slate-400 mt-1">Created task</p>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-medium hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
