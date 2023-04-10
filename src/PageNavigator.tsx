import { Route, Routes } from "react-router-dom";
import { PoketCardList } from "./List/PoketCardList";
import { PoketmonDetail } from "./Detail/PoketmonDetail";

export const PageNavigator = () => {
	return (
		<Routes>
			<Route path="/" element={<PoketCardList />} />
			<Route path="/poketmon/:name" element={<PoketmonDetail />} />
		</Routes>
	);
};
