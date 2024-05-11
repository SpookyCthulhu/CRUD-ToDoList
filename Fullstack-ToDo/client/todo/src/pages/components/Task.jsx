import { useState, useEffect } from 'react';
import axios from 'axios'

function Task (props) {
	const [title, setTitle] = useState(props.title);
	const [description, setDesc] = useState(props.description);
	
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	
	const handleDesc = (e) => {
		let desc = e.target
		setDesc(desc.value);
		desc.style.height = 0;
		desc.style.height = `${e.target.scrollHeight}px`;
	};
	
	useEffect(() => {
		update();
	}, [title, description]);
	
	
	const update = async () => {
		// ensures user doesn't have to write both a title and description to save the task
		let task = {
			title: title.length > 0 ? title : '',
			description: description.length > 0 ? description : ''
		};
		try{
			await axios.put('http://localhost:8800/tasks/'+props.id, task);
		} catch(err) {
			console.log(err)
		}
	};
	
	return (
		<div className='task'>
			<h1>{props.id}</h1>
			<input className='cardtxt bold' value={title} onChange={handleTitle} placeholder='Title...'/>
			<textarea className='cardtxt desc' value={description} onChange={handleDesc} placeholder='Description...'/>
			<button onClick={() => props.deleteTask(props.id)}>Delete</button>
		</div>
	);
};

export default Task;
