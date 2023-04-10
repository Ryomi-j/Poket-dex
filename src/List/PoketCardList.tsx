import styled from "@emotion/styled";
import { PoketCard } from "./PoketCard";
import { useEffect, useState } from "react";
import { PokemonListResponseType, fetchPokemons } from "../SVC/PoketmonService";

export const PoketCardList = () => {
	// PokemonListResponseType을 useState로 저장하여 초기값을 넣어줌
	const [pokemons, setPokemons] = useState<PokemonListResponseType>({
		count: 0,
		next: "",
		results: [],
	});

	useEffect(() => {
		(async () => {
			const pokemons = await fetchPokemons();
			setPokemons(pokemons);
		})();
	}, []);

	return (
		<List>
			{pokemons.results.map((pokemon, idx) => {
				return <PoketCard key={`${pokemon.name}_${idx}`} name={pokemon.name} />;
			})}
		</List>
	);
};

const List = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 0 32px 0;
	padding: 0;
	gap: 20px;
	list-style: none;
`;
