import User from "./User";

function UsersPanel(){
  const kickout = (userid) => {
    console.log('kickout '+userid);
  }
  const users = {
    123: 'Guilherme',
    361: 'dukilee'
  };
  
  return <div>
    {Object.entries(users).map(([userid, username]) => (
      <User userid={userid} username={username} kickout={kickout} />
    ))}
  </div>

}

export default UsersPanel;