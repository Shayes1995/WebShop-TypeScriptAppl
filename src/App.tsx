import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AddProduct from "./pages/AddProduct"
import Home from "./pages/Home"
import RootLayout from "./rootlayout/RootLayout"


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'add-product',
          element: <AddProduct />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
