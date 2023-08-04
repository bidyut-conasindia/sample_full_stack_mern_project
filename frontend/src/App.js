import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserComp from "./pages/UserComp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserComp />} component={UserComp} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
