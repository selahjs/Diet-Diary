import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    //const [authed, setAuthed] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:3001/api/user/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json();

        if(!response.ok){
            //setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            setError(null);
            setUser(json);
            navigate('/');

            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //console.log(localStorage.getItem('user'));

            // //update Auth context
            // dispatch({type: 'LOGIN', payload: json})
            // setIsLoading(false)
        }

    }
  return (
    <form className='login' onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <label>Email: </label>
        <input 
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
        />

        <label>Password: </label>
        <input 
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
        />
        <button>Log in</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login