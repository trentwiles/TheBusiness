import Sidebar from './components/customs/Sidebar'
import OrderGrid from './components/customs/OrderGrid'

const App = () => {
  return (
    <Sidebar children={<OrderGrid apiPath='http://localhost:5000/orders' />} />
  )
}

export default App