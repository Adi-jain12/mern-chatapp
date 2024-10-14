import Login from '../components/Login';

export const Home = () => {
	return (
		<div className="grid grid-cols-[1fr_1fr] h-screen">
			<Login />

			<main className="bg-blue-600 p-16 pb-24">
				<div className="max-w-[120rem] mx-auto flex flex-col gap-8"></div>
			</main>
		</div>
	);
};
