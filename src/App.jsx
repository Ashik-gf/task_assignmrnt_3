import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TaskProvider from "./context/TaskContext";
import Home from "./page/Home/Home";



function App() {
  return (
    <TaskProvider>
      <ToastContainer />
      <Home />
    </TaskProvider>
  )
}

export default App
