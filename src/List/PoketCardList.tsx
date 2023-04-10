import styled from "@emotion/styled";
import { PoketCard } from "./PoketCard";
import { useEffect, useState } from "react";
import { PokemonListResponseType, fetchPokemons } from "../SVC/PokemonService";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const PoketCardList = () => {
	// PokemonListResponseType을 useState로 저장하여 초기값을 넣어줌
	const [pokemons, setPokemons] = useState<PokemonListResponseType>({
		count: 0,
		next: "",
		results: [],
	});

	const [infiniteRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: pokemons.next !== "",
		onLoadMore: async () => {
			const morePokemons = await fetchPokemons(pokemons.next);
			setPokemons({
				...morePokemons,
				results: [...pokemons.results, ...morePokemons.results]
			})
		},
		disabled: false,
		rootMargin: "0px 0px 400px 0px",
	});

	useEffect(() => {
		(async () => {
			const pokemons = await fetchPokemons();
			setPokemons(pokemons);
		})();
	}, []);

	return (
		<>
			<List>
				{pokemons.results.map((pokemon, idx) => {
					return <PoketCard key={`${pokemon.name}_${idx}`} name={pokemon.name} />;
				})}
			</List>
			<Loading ref={infiniteRef}>Loading</Loading>
		</>
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

const Loading = styled.div`
	display: flex;
	flex-direction: center;
`;
