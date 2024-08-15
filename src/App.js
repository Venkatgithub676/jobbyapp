import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import ProtectedComponent from './components/ProtectedComponent'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedComponent exact path="/" component={Home} />
    <ProtectedComponent exact path="/jobs" component={Jobs} />
    <ProtectedComponent exact path="/jobs/:id" component={JobItemDetails} />
    <ProtectedComponent exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
