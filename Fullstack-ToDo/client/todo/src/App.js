import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/login' element={<Login/>}/>
					<Route path='/createaccount' element={<CreateAccount/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
