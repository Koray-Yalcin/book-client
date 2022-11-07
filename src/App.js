import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from '../src/store/firebase';
import { setUser } from './store/actions/userActions';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    })
  }, [dispatch])
  return (
      <Routes>
        <Route path='/' element= { <Home></Home> }></Route>
        <Route path='/register' element= {<Register></Register>}></Route>
        <Route path='/login' element= { <Login></Login> }></Route>
       </Routes>
  );
}

export default App;
