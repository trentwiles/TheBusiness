import Sidebar from './components/customs/Sidebar'
// import OrderGrid from './components/customs/OrderGrid'
import Login from './components/customs/Login'

const App = () => {
  return (
    // <Sidebar children={<OrderGrid apiPath=`${import.meta.env.BASE_URL}/orders` />} />
    <Sidebar children={<Login enableCreateAccount={false} enableOauth={false} />} />
  )
}

export default App