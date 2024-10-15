import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Register from './components/Register';
import Chat from './components/Chat';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="register" element={<Register />}></Route>
				<Route path="chat" element={<Chat socket={socket} />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
