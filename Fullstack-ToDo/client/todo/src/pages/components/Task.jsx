import { useState, useEffect } from 'react';
import axios from 'axios'

function Task (props) {
	const [title, setTitle] = useState(props.title);
	const [description, setDesc] = useState(props.description);
	
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	
	const handleDesc = (e) => {
		setDesc(e.target.value);
	};
	
	useEffect(() => {
		update();
	}, [title, description]);
	
	const update = async () => {
		console.log(title);
		console.log(title.length);
		// ensures user doesn't have to write both a title and description to save the task
		let task = {
			title: title.length > 0 ? title : '',
			description: description.length > 0 ? description : ''
		};
		console.log(task);
		try{
			await axios.put('http://localhost:8800/tasks/'+props.id, task);
		} catch(err) {
			console.log(err)
		}
	};
	
	return (
		<div className='task'>
			<input className='cardtxt bold' value={title} onChange={handleTitle} placeholder='Title...'/>
			<textarea className='cardtxt' value={description} onChange={handleDesc} placeholder='Description...'/>
			<button onClick={() => props.deleteTask(props.id)}>Delete</button>
		</div>
	);
};

export default Task;
