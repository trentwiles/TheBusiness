import Sidebar from './components/customs/Sidebar'
// import OrderGrid from './components/customs/OrderGrid'
// import Login from './components/customs/Login'
import Tracking from './components/customs/Tracking'
import {Status} from './components/customs/Tracking'

const App = () => {
  return (
    // <Sidebar children={<OrderGrid apiPath=`${import.meta.env.BASE_URL}/orders` />} />
    // <Sidebar children={<Login enableCreateAccount={false} enableOauth={false} />} />
    <Sidebar children={<Tracking currentStatus={Status.Preparing}/>} />
  )
}

export default App