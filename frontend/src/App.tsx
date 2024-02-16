import {Router} from './router';
import {Layout} from './components';
import {BrowserRouter} from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Router/>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
