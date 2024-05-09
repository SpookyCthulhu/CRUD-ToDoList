function Task (props) {
	return (
		<div className='task'>
			<h2>{props.title}</h2>
			<p>{props.description}</p>
			<button onClick={() => props.deleteTask(props.id)}>delete</button>
		</div>
	);
};

export default Task;
