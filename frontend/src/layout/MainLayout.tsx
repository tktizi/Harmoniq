import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import { useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
				<AudioPlayer />
				{/* left sidebar */}
				<ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
					<LeftSidebar />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<Outlet />
				</ResizablePanel>
				
			</ResizablePanelGroup>

			<PlaybackControls />
		</div>
		
	);
};
export default MainLayout;