import MainNav from '../components/MainNav';

const Sidebar = ({ setStartChat, setChats, setReceiverId }) => {
	return (
		<aside className="border-r border-gray-100 flex flex-col gap-2">
			<div className="flex items-center w-full justify-center text-[20px] text-white p-5 bg-slate-600">
				ChatApp
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
