import "./App.css";

import Calculator from "./pages/Calculator/Calculator";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Calculator />}>
            <Route path="/:importString" element={<Calculator />} />
        </Route>
    )
);

function App() {
    return (
        <div className="h-screen">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
