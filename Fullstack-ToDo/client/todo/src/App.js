import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Task from './components/Task';

function App() {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState([]);
	const [description, setDesc] = useState([]);
	
	useEffect(()=>{
		const fetchAllBooks = async () => {
			try{
				const res = await axios.get('http://localhost:8800/tasks');
				setTasks(res.data);
			} catch(err) {
				console.log(err);
			}
		}
		fetchAllBooks()
	}, []);
	
	const dbAdd = async (task) => {
		try{
			await axios.post('http://localhost:8800/tasks', task);
		} catch(err) {
			console.log(err);
		}
	}
	
	const dbDel = async (id) => {
		try {
			await axios.delete('http://localhost:8800/tasks/'+id);
		} catch(err) {
			console.log(err)
		}
	}
		
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	
	const handleDesc = (e) => {
		setDesc(e.target.value);
	};
	
	const addTask = () => {
		const task = {
			id: tasks.length === 0 ? 1 : tasks[tasks.length-1].id + 1,
			title: title,
			description: description
		};
		// Sends taask to DB
		dbAdd(task);
		// Adds task to React tasks list.
		setTasks([...tasks, task]);
		console.log(setTasks);
	};
	
	const handleDelete = (id) => {
		dbDel(id);
		setTasks(tasks.filter((task) => task.id !== id));
	};
	
	  return (
	  <div className='app'>
	  	<div className='addtask'>
	  		<input onChange={handleTitle} placeholder="title"/>
	  		<input onChange={handleDesc} placeholder="description"/>
	  		<button onClick={addTask} > Add Task </button>
	  	</div>
			<div className='list'>
				{tasks.map(task => {
					return (
						<Task
							id={task.id}
							title={task.title}
							description={task.description}
							deleteTask={handleDelete}
						/>
					);
				})}
			</div>
		</div>
  );
};

export default App;
