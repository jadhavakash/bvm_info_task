import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Switch,Route } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}>
         
        </Route>
        <Route path="/add" component={AddContact}>

        </Route>
        <Route path="/edit/:id" component={EditContact}>
         
        </Route>
      </Switch>
    </div>
  );
};

export default App;
