import { useState } from 'react';
import Game from './game/Game';
import InputName from './game/InputName';

function App() {
  const [username, setUsername] = useState(import.meta.env.VITE_USERNAME || '');
  console.log({username});
  // const 

  if(username){
    return <div>
      <Game username={username}/>
    </div>
  }else{
    return <div>
      <InputName setUsername={setUsername} />
    </div>
  }
}

export default App;
