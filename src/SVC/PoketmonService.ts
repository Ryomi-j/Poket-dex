import axios from "axios";

const remote = axios.create();

export interface PokemonListResponseType {
	count: number,
	next: string,
	results: {
		name: string,
		url: string,
	}[]; // 배열로 들어오므로 배열을 붙여줌
}

export const fetchPokemons = async () => {
	const defaultUrl = `https://pokeapi.co/api/v2/pokemon`;
    // 제네릭으로 타입을 넘겨주면 response에 해당 타입으로 데이터가 넘어옴
	const response = await remote.get<PokemonListResponseType>(defaultUrl);
	return response.data;
};
