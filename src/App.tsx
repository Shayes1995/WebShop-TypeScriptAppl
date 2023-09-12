import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AddProduct from "./pages/AddProduct"
import Home from "./pages/Home"
import Productdetails from "./pages/Productdetails"
import Products from "./pages/Products"
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
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'products/:cathegory/:id',
          element: <Productdetails/>
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
