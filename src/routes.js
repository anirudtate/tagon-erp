// This file is where we mention all routes used in this product
import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { Root, TemporaryPassword } from "./pages/root";
import { PageNotFound } from "./pages/pageNotFound";
import { useSelector } from "react-redux";
import { OrderStatusDashboard } from "./pages/orderStatus";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root path handle only where to redirect a user based on it's authentication state */}
      <Route path="/" element={<Root />} />
      <Route path="/upd_tmp_pswd" element={<TemporaryPassword />} />

      {/* All paths mentioned here would be wrapped by layout component which includes sidebar, search field and user profile */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="masters">
            <Route path="order_status" element={<OrderStatusDashboard />}>
              <Route path="new" element={<OrderStatusDashboard />} />
            </Route>
          </Route>

          {/* "*" indicates any route, alway keep this route mensioned last. */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  )
);

function ProtectedRoute() {
  const access = useSelector((state) => state.user.accessToken);
  // const permissions = useSelector((state) => state.user.permissions);
  // const pwd_temp = useSelector((state) => state.user.pwd_temp);
  // const { path } = useRouteMatch();

  // if (pwd_temp === true) {
  //   return <Redirect to="/upd_tmp_pswd" relative={false} replace />;
  // }
  if (!access) {
    return <Navigate to="/" />;
  }
  // if (!isAuthorized(permissions, path)) {
  //   return (
  //     <Content>
  //       <Unauthorized />
  //     </Content>
  //   );
  // }
  return <Outlet />;
}

export function isAuthorized(permissions, path) {
  return true;
  // let ok = false;
  // permissions.forEach((permission) => {
  //   if (
  //     matchPath(path, {
  //       path: codeToPath[permission.label_code || permission.perm_code],
  //       exact: true,
  //     })
  //   ) {
  //     ok |= true;
  //   }
  //   if (permission.child) {
  //     ok |= isAuthorized(permission.child, path);
  //   }
  //   if (permission.perms) {
  //     ok |= isAuthorized(permission.perms, path);
  //   }
  // });
  // return ok;
}

const preparePerms = (name, route) => {
  const obj = {};
  obj[name] = route;
  obj["add_" + name] = route + "/new";
  obj["view_" + name] = route + "/view/:id";
  obj["edit_" + name] = route + "/edit/:id";
  obj["delete_" + name] = route + "/delete/:id";
  return obj;
};

export const codeToPath = {
  order_status: "/orders/masters/order_status",
  dashboard: "/dashboard",
  orders: "/orders",
  order_masters: "/orders/masters",
  products: "/products",
  products_master: "/products/masters",
  category1: "/products/masters/first_category",
  category2: "/products/masters/second_category",
  ...preparePerms("products_list", "/products/product_list"),
};
