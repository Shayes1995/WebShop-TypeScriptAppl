import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AddProduct from "./pages/AddProduct"
import Checkout from "./pages/Checkout"
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
          path: 'products',
          element: <Products />
        },
        {
          path: 'products/:cathegory/:id',
          element: <Productdetails/>
        },
        {
          path: 'add-product',
          element: <AddProduct />
        },
        {
          path: 'checkout',
          element: <Checkout/>
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
