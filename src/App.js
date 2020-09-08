import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/navbar.component"
import ExerciceList from "./components/exercice-list.component"
import EditExercice from "./components/edit-exercice.component"
import CreateUser from "./components/create-user.component"
import CreateE from "./components/create-e.component"
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <Route path="/" exact component={ExerciceList}></Route>
      <Route path="/edit/:id"  component={EditExercice}></Route>
      <Route path="/create"   component = {CreateE}/>
      <Route path="/user" component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
