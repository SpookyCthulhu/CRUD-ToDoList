import { Link } from 'react-router-dom';

function Login() {
	return (
		<div className='app'>
			<h1>Login</h1>
			<div className='addtask form'>
				<input placeholder='username'/>
				<input placeholder='password'/>
				<button id='login'>Login</button>
				<p>Or create a new <Link to='../CreateAccount'>account</Link></p>
			</div>
		</div>
	);
};

export default Login;
