import "./App.css";
// import font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Notification from "./components/Notification";

import { useAppSelector } from "./redux/store";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { routes as appRoutes } from "./routes";

function App() {
  const { message } = useAppSelector((state) => state.notification);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.component}
              />
              
            ))}
          </Routes>
        </Router>
      </AuthProvider>
      {message !== "" ? <Notification message={message} /> : <></>}
    </div>
  );
}

export default App;
