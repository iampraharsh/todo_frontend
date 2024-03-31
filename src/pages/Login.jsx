import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
		useContext(Context);
	if (isAuthenticated) return <Navigate to={'/'} />;

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(name, email, password);
		try {
			const { data } = await axios.post(
				`${server}users/login`,
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true, //otherwise cookie doesn't work
				}
			);

			toast.success(data.message);
			setIsAuthenticated(true);
			setLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setLoading(false);
			setIsAuthenticated(false);
		}
	};

	return (
		<div className='login'>
			<section>
				<form onSubmit={submitHandler}>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='Email'
						required
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
						required
					/>
					<button disabled={loading} type='submit'>
						Login
					</button>
					<h4>or</h4>
					<Link to='/register'>Sign Up</Link>
				</form>
			</section>
		</div>
	);
};

export default Login;
