import { Route, Routes } from "react-router-dom"
import { CategoryLayout } from "./cases/categories/components/category-layout"
import { CategoryForm } from "./cases/categories/components/category-form"
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className="wrapper">
      <main>
        <Routes>
          <Route path="/categorias" element={CategoryLayout()}>
            <Route path="new" element={CategoryForm()}></Route>
            <Route path=":id" element={CategoryForm()}></Route>
          </Route>
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App
