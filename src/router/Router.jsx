import { createBrowserRouter, RouterProvider, Outlet } from "react-router";


function Layout() {
  
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <></>,
      },
      
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
