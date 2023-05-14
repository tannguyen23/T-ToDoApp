import "./App.css";
// import font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import MainPage from "./pages/Task";
import Notification from "./components/Notification";

import { useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import AuthProvider from "./contexts/AuthContext";

function App() {
  const { message } = useAppSelector((state) => state.notification);
  const [currentMessage, setCurrentMessage] = useState(message);
  useEffect(() => {
    console.log(`Current message : ${message}`);
    setCurrentMessage(message);
  }, [message]);

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
