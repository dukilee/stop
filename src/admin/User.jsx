function User({ userid, username, kickout}){
  return <div>
    {username} 
    <button onClick={() => kickout(username)}> KICK </button>
  </div>


}

export default User;