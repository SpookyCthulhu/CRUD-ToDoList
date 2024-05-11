import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'chiOS101418',
	database:'tasks'
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.json('Hello this is the backend!');
});

app.get('/users', (req, res)=> {
	const q = 'SELECT * FROM users';
	db.query(q, (err, data)=>{
		if(err) return res.json(err);
		return res.json(data);
	});
});

app.get('/tasks', (req, res)=> {
	const q = 'SELECT * FROM tasks'
	db.query(q, (err, data)=>{
		if(err) return res.json(err);
		return res.json(data);
	});
});

app.post('/tasks', (req, res)=>{
	const q = "INSERT INTO tasks (`id`) VALUES (?)"
	const id = req.body.id;
	
	db.query(q, [id], (err, data)=>{
		if(err) return res.json(err);
		return res.json(data);
	});
});

app.delete('/tasks/:id', (req, res)=>{
	const id = req.params.id;
	const q = 'DELETE FROM tasks WHERE id = ?';
	
	db.query(q, [id], (err, data)=>{
		if(err) return res.json(err);
		return res.json('Task deleted successfully');
	});
});

app.put('/tasks/:id', (req, res)=>{
	const id = req.params.id;
	const q = 'UPDATE tasks SET `title` = ?, `description` = ? WHERE id = ?'
	
	const values=[
		req.body.title,
		req.body.description,
	]
	
	db.query(q, [...values, id], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.listen(8800, ()=>{
	console.log('Connected to backend!');
});
