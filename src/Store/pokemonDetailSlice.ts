import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPokemonsDetailAPI, PokemonDetailType } from "../SVC/PokemonService";

// First, create the thunk
export const fetchPokemonDetail = createAsyncThunk(
    "pokemon/fetchPokemonsDetail", 
    async (name: string) => {
	const response = await fetchPokemonsDetailAPI(name);
	return response;
}
);

interface PokemonDetailState {
	pokemonDetails: Record<string, PokemonDetailType>
}

const initialState = {
	pokemonDetails: {},
} as PokemonDetailState;

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
	name: "pokemonDetail",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchPokemonDetail.fulfilled, (state, action:PayloadAction<PokemonDetailType>) => {
			state.pokemonDetails = {
                ...state.pokemonDetails = {
                    ...state.pokemonDetails,
                    [action.payload.name] : action.payload
                }
            }
		});
	},
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer
