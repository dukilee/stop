import { useState } from 'react';
import Game from './game/Game';
import InputName from './game/InputName';
import GoToAdminButton from './GoToAdminButton';

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
      <div>
        <InputName setUsername={setUsername} />
      </div>
      <div>
        <GoToAdminButton />
      </div>
    </div>
  }
}

export default App;
