import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Index />
    </BrowserRouter>
  );
}

export default App;