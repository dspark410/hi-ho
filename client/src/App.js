import './App.css'
// import { gql, useQuery } from '@apollo/client'
// import { GET_COST_OF_LIVING } from './graphql/queries'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  // const { loading, error, data } = useQuery(GET_COST_OF_LIVING, {
  //   variables: {
  //     city: 'Nashville',
  //     search: 'engineer',
  //     radius: '50',
  //     daysAgo: '1',
  //     page: '1',
  //   },
  // })

  // console.log(data)

  // if (loading) return <p>loading...</p>
  // if (error) return `Error! ${error}`

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route />
      </Switch>
    </Router>
  )
}

export default App
