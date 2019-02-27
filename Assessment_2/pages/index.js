import Content from '../components/index/Content'
import Layout from '../components/Layout'
import data from '../data/index/data';

const App = (props) => (
  <Layout>
    <Content {...props}/>
  </Layout>
)

App.getInitialProps = () => {
  return {
    data,
    maxRooms: 4
  }
}

export default App
