import './App.css';
import {MemeMaker} from './Components/memes.component'
import doge from './doge.jpg'

const App = () => {
  document.title = "Meme Generator"
  
  return (

    <div className="app">
    
    <MemeMaker />
      
    </div>
    
  );
}

export default App;
