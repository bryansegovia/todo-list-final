import { useState } from "react";
function RegisterPage(){
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [passwordConfirmation, setPasswordConfirmation]= useState('');


    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('Register');
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value) }/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Password Confirmation</label>
                    <input 
                        type="password" 
                        id="passwordConfirmation" 
                        placeholder="Confirm Password" 
                        value={passwordConfirmation} 
                        onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;