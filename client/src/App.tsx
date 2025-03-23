import Sidebar from './components/customs/Sidebar'
// import OrderGrid from './components/customs/OrderGrid'
import Login from './components/customs/Login'

const App = () => {
  return (
    // <Sidebar children={<OrderGrid apiPath='http://localhost:5000/orders' />} />
    <Sidebar children={<Login enableCreateAccount={false} enableOauth={false} />} />
  )
}

export default App