import styled from "@emotion/styled";
import { PoketCard } from "./PoketCard";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemons } from "../Store/pokemonsSlice";
import { useSelector } from "react-redux";

export const PoketCardList = () => {
	const dispatch = useAppDispatch()

	const {pokemons} = useSelector((state: RootState) => state.pokemons);

	const [infiniteRef] = useInfiniteScroll({
		loading: false,
		hasNextPage: pokemons.next !== "",
		onLoadMore: async () => {
			dispatch(fetchPokemons(pokemons.next))
		},
		disabled: false,
		rootMargin: "0px 0px 400px 0px",
	});

	useEffect(() => {
		dispatch(fetchPokemons())
	}, [dispatch]);

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
