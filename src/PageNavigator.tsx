import { Route, Routes } from "react-router-dom";
import { PoketCardList } from "./List/PoketCardList";
import { PokemonDetail } from "./Detail/PokemonDetail";

export const PageNavigator = () => {
	return (
		<Routes>
			<Route path="/" element={<PoketCardList />} />
			<Route path="/pokemon/:name" element={<PokemonDetail />} />
		</Routes>
	);
};
