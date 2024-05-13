import Dashboard from "./components/DashboardComponents/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Dashboard />
      </div>
    </LocalizationProvider>
  );
};

export default App;
