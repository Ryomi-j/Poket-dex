import styled from "@emotion/styled";
import { PoketNameChip } from "../Common/PoketNameChip";
import { PoketMarkChip } from "../Common/PoketMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PokeImageSkeleton } from "../Common/PoketImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

interface PokeCardProps {
	name: string;
}

export const PoketCard = (props: PokeCardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch()

	const ImageType = useSelector((state: RootState) => state.imageType.type);
	const {pokemonDetails} = useSelector((state: RootState) => state.pokemonDetail);
	const pokemon = pokemonDetails[props.name]

	const [ref, { entry }] = useIntersectionObserver();
	const isVisible = entry && entry.isIntersecting;
	const handleClick = () => {
		navigate(`/pokemon/${props.name}`);
	};

	useEffect(() => {
		if (!isVisible) return;

		dispatch(fetchPokemonDetail(props.name))
	}, [dispatch, props.name, isVisible]);

	if (!pokemon) {
		return (
			<Item color={"#ffca09"} ref={ref}>
				<Header>
					<PoketNameChip name={"포켓몬"} color={"#ffca09"} id={0} />
				</Header>
				<Body>
					<PokeImageSkeleton />
				</Body>
				<Footer>
					<PoketMarkChip />
				</Footer>
			</Item>
		);
	}

	return (
		<Item onClick={handleClick} color={pokemon.color} ref={ref}>
			<Header>
				<PoketNameChip name={pokemon.koreanName} color={pokemon.color} id={pokemon.id} />
			</Header>
			<Body>
				<Image src={pokemon.images[ImageType]} alt={pokemon.name} />
			</Body>
			<Footer>
				<PoketMarkChip />
			</Footer>
		</Item>
	);
};

const Item = styled.li<{ color: string }>`
	display: flex;
	flex-direction: column;
	padding: 8px;

	width: 250px;
	height: 300px;
	border: 1px solid #c0c0c0;
	box-shadow: 1px 1px 3px 1px #c0c0c0;

	cursor: pointer;
	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		background-color: ${(props) => props.color};
		opacity: 0.8;
		transition: background-color 0s;
	}
`;

const Header = styled.section`
	display: flex;
	margin: 10px 0;
`;

const Body = styled.section`
	display: flex;
	flex: 1 1 auto;
	justify-content: center;
	align-items: center;
	margin: 10px 0;
`;

const Image = styled.img`
	width: 180px;
	height: 180px;
`;

const Footer = styled.footer`
	display: flex;
	flex-direction: column;
`;
