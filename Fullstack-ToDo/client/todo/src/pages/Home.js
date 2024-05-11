import { useState, useEffect } from 'react';
import axios from 'axios'
import Task from './components/Task';

function Home() {
	const [tasks, setTasks] = useState([]);
	
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
	
	useEffect(()=>{
		
	}, [tasks]);
	
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
	
	const addTask = () => {
		const task = {
			// Unique keys accurate to the millisecond, should work for an individual users database.
			id: Date.now().toString(36),
			title: '',
			description: ''
		};
		// Sends taask to DB
		dbAdd(task);
		// Adds task to React tasks list.
		setTasks([...tasks, task]);
	};
	
	const handleDelete = (id) => {
		dbDel(id);
		setTasks(tasks.filter((task) => task.id !== id));
	};
	
	  return (
	  <div className='app'>
			<div className='list'>
				{tasks.map(task => {
					return (
						<Task
							key={task.id}
							id={task.id}
							title={task.title}
							description={task.description}
							deleteTask={handleDelete}
						/>
					);
				})}
			</div>
			<div className='addtask'>
	  		<button id='addbtn' onClick={addTask} >Add Task</button>
	  	</div>
		</div>
  );
};

export default Home;
