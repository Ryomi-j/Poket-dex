import axios from "axios";

const remote = axios.create();

export interface PokemonListResponseType {
	count: number;
	next: string;
	results: {
		name: string;
		url: string;
	}[]; // 배열로 들어오므로 배열을 붙여줌
}

export const fetchPokemons = async () => {
	const defaultUrl = `https://pokeapi.co/api/v2/pokemon`;
	// 제네릭으로 타입을 넘겨주면 response에 해당 타입으로 데이터가 넘어옴
	const response = await remote.get<PokemonListResponseType>(defaultUrl);
	return response.data;
};

interface PokemonDetailResponseType {
	id: number;
	weight: number;
	height: number;
	name: string;
	types: {
		type: {
			name: string;
		};
	}[]; // types는 배열로 들어오므로 뒤에 배열을 붙임
	sprites: {
		front_default: string;
		other: {
			dream_world: {
				front_default: string;
			};
			"official-artwork": {
				front_default: string;
			};
		};
	};
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}

interface PoketmonSpeciesResponseType {
	color: {
		name: string;
	};
	names: {
		name: string;
		language: {
			name: string;
		};
	}[];
}

export interface PokemonDetailType {
	id: number;
	weight: number;
	height: number;
	name: string;
	koreanName: string;
	color: string;
	types: string[];
	images: {
		frontDefault: string;
		dreamWorldFront: string;
		officialArtworkFront: string;
	};
	baseStats: {
		name: string;
		value: number;
	}[];
}

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetailType> => {
	const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
	const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

	const response = await remote.get<PokemonDetailResponseType>(pokemonDetailUrl);
	const detail = response.data;

	const speciesResponse = await remote.get<PoketmonSpeciesResponseType>(pokemonSpeciesUrl);
	const species = speciesResponse.data;
	const koreanName = species.names.find((el) => el.language.name === "ko")?.name ?? detail.name;

	return {
		id: detail.id,
		name: detail.name,
		color: species.color.name,
		koreanName: koreanName,
		height: detail.height / 10, // dm를 미터단위로 변환
		weight: detail.weight / 10, // kg 단위
		types: detail.types.map((el) => el.type.name),
		images: {
			frontDefault: detail.sprites.front_default,
			dreamWorldFront: detail.sprites.other.dream_world.front_default,
			officialArtworkFront: detail.sprites.other["official-artwork"].front_default,
		},
		baseStats: detail.stats.map((el) => {
			return {
				name: el.stat.name,
				value: el.base_stat,
			};
		}),
	};
};
