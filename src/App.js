import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './pages/Search/Search';
import Result from './pages/Result/Result';

const Layout = () => (
  <>
    <Header />
    <div className="wrap">
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Search/>} />
          <Route path='/result' element={<Result/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
