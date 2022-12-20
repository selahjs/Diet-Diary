import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(true)
  return (
    <header>
            <div className="header">
                <div className="container">
                    <Link to="/">
                        <h2>DietDiary</h2>
                    </Link>
                    <nav>
                    { user && (
                        <div className="center-nav">
                            <Link to="/#add-diary">Add Diary</Link>
                            <Link to="/#view-diary">Diaries</Link>
                        </div>
                        
                    )}
                    { user && (
                    <div>
                        <button onClick={()=>setUser(!user)}>Logout</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </div>)}
                    
                    </nav>
                    
                </div>
            </div>
        </header>
  )
}

export default Navbar