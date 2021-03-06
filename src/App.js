import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-white-100 dark:bg-gray-900 dark:text-gray-200 black min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Routes />
        <Footer />
      </div>
    </div>
  );
}
