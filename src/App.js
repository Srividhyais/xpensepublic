import Home from "./Home";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <div>
        <Home />
      </div>
    </SnackbarProvider>
  );
}

export default App;