import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Register from './components/Register';
import Chat from './components/Chat';
import io from 'socket.io-client';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io.connect(API_BASE_URL);

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
