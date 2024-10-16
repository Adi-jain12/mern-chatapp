import MainNav from '../components/MainNav';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const Sidebar = ({ setStartChat, setChats, setReceiverId }) => {
	return (
		<aside className="border-r border-gray-100 flex flex-col gap-2">
			<div
				className="flex items-center w-full justify-center text-[20px] p-5 border-b-2 border-orange-400
			"
			>
				<IoChatbubbleEllipsesSharp size={50} />
			</div>
			<MainNav
				setStartChat={setStartChat}
				setChats={setChats}
				setReceiverId={setReceiverId}
			/>
		</aside>
	);
};

export default Sidebar;
