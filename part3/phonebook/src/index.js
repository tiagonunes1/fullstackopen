import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import personService from './services/persons'
import { allowedNodeEnvironmentFlags } from 'process';


ReactDOM.render(
    <App />,
  document.getElementById('root')
);