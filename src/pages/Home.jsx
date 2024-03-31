import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Context, server } from '../main';
import { useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [tasks, setTask] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const { isAuthenticated } = useContext(Context);

	const updateHandler = async (id) => {
		try {
			const { data } = await axios.put(
				`${server}task/${id}`,
				{},
				{ withCredentials: true }
			);
			toast.success(data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error.response.data.message);
		}
		toast.success(id);
	};
	const deleteHandler = async (id) => {
		try {
			const { data } = await axios.delete(`${server}task/${id}`, {
				withCredentials: true,
			});
			toast.success(data.message);
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error.response.data.message);
		}
		toast.error(id);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { data } = await axios.post(
				`${server}task/new`,
				{
					title,
					description,
				},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setTitle('');
			setDescription('');
			toast.success(data.message);
			setLoading(false);
			setRefresh((prev) => !prev);
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		axios
			.get(`${server}task/my`, {
				withCredentials: true,
			})
			.then((res) => {
				setTask(res.data.tasks);
			})
			.catch((e) => {
				toast.error(e.response.data.message);
			});
	}, [refresh]);

	if (!isAuthenticated) return <Navigate to={'/login'} />;

	return (
		<div className='container'>
			<div className='login'>
				<section>
					<form onSubmit={submitHandler}>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type='text'
							placeholder='Title'
							required
						/>
						<input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type='text'
							placeholder='Description'
							required
						/>

						<button disabled={loading} type='submit'>
							Add task
						</button>
					</form>
				</section>
			</div>
			<section className='todosContainer'>
				{tasks.map((i) => (
					// <div key={i._id}>{i.title}</div>
					<TodoItem
						key={i._id}
						id={i._id}
						title={i.title}
						description={i.description}
						isCompleted={i.isCompleted}
						updateHandler={updateHandler}
						deleteHandler={deleteHandler}
					/>
				))}
			</section>
		</div>
	);
};

export default Home;
