import AddPlaceForm from "./components/places/AddPlaceForm";
import {Route, Routes} from "react-router-dom";
import SinglePlace from "./pages/SinglePlace";
import Layout from "./components/Layout";
import EditPlaceForm from "./components/places/EditPlaceForm";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import PlacesPage from "./pages/PlacesPage";
import TypesPage from "./pages/TypesPage";
import SingleType from "./pages/SingleType";
import Home from "./pages/Home";
import ClientsPage from "./pages/ClientsPage";
import SingleClient from "./pages/SingleClient";

function App() {
  return (
      <Routes>
          <Route path="/" element={<AuthLayout />}>
              {/*<Route element={<RequireAuth allowedRoles={['ROLE_USER']}/>}>*/}
              {/*    <Route path="/clients" element={<Clients/>}/>*/}
              {/*</Route>*/}
              {/*<Route element={<RequireAuth allowedRoles={['ROLE_USER']}/>}>*/}
              {/*    <Route index element={<Home />} />*/}
              {/*</Route>*/}
              {/*<Route element={<RequireAuth allowedRoles={['ROLE_USER']}/>}>*/}
              {/*    <Route path={"/users"} element={<Users />} />*/}
              {/*</Route>*/}

              <Route index element={<Home />} />

              <Route path="place">
                  <Route index element={<PlacesPage />} />
                  <Route path="add" element={<AddPlaceForm />} />
                  <Route path=":placeId" element={<SinglePlace />} />
                  <Route path="edit/:placeId" element={<EditPlaceForm />} />
              </Route>

              <Route path="type">
                  <Route index element={<TypesPage />} />
                  <Route path=":typeId" element={<SingleType />} />
              </Route>

              <Route path="client">
                  <Route index element={<ClientsPage />} />
                  <Route path=":clientId" element={<SingleClient />} />
              </Route>

          </Route>
          <Route path="/login" element={<Layout />}>

              <Route index element={<Login />} />

          </Route>
      </Routes>
  );
}

export default App;
