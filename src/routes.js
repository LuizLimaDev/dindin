import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Login from './Pages/Login/Login'
import Cadastro from './Pages/Cadastro/cadastro'
import Principal from './Pages/Principal/Principal'

// API da escola de programação desligada!
// function RotasPrivadas({ redirectTo }) {
//   const token = localStorage.getItem('token');
//   return token ? <Outlet /> : <Navigate to={redirectTo} />;
// }

export default function Rotas() {
  return (
    <Routes>
      // <Route path='/' element={<Login />} />
      <Route path='/' element={<Principal />} />
      <Route path='/cadastro' element={<Cadastro />} />

      // <Route element={<RotasPrivadas redirectTo={'/'} />}>
      //   <Route path='/principal/' element={<Principal />} />
      // </Route>
    </Routes>
  )
}
