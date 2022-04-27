import {BrowserRouter,Route,Switch} from 'react-router-dom'
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';
import UpdateCategory from './components/Categories/update-category';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar';
import AdminProtectRoute from './components/Navigation/protectedroutes/AdminProtectRoute';
import PrivateProtectRoute from './components/Navigation/protectedroutes/PrivateProtectRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import Login from './components/users/login/Login';
import Register from './components/users/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <Switch>
         <Route exact path='/' component={HomePage} />
         <Route exact path='/register' component={Register} />
         <Route exact path='/login' component={Login} />
         <PrivateProtectRoute exact path='/create-post' component={CreatePost} />
         <PrivateProtectRoute exact path='/posts' component={PostsList} />
         <AdminProtectRoute exact path='/add-category' component={AddNewCategory} />
         <AdminProtectRoute exact path='/category-list' component={CategoryList} />
         <AdminProtectRoute exact path='/update-category/:id' component={UpdateCategory} />
       </Switch>
    </BrowserRouter>
  );
}

export default App;
