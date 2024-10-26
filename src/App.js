import Rotas from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

function App() {

  return (
    <>
      <Rotas />
      <ToastContainer />
    </>
  );
}

export default App;
