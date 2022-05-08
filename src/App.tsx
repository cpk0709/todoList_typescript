import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <div className="App">
      <h1 className="text-orange-400 text-sm font-bold">Todo List</h1>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
