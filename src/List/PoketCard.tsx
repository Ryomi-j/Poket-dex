import styled from "@emotion/styled";
import { PoketNameChip } from "../Common/PoketNameChip";
import { PoketMarkChip } from "../Common/PoketMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PoketmonDetailType, fetchPokemonDetail } from "../SVC/PoketmonService";

interface PokeCardProps {
	name: string;
}

export const PoketCard = (props: PokeCardProps) => {
	const navigate = useNavigate();
	const [pokemon, setPokmon] = useState<PoketmonDetailType | null>(null);

	const handleClick = () => {
		navigate(`/pokemon/${props.name}`);
	};

	useEffect(() => {
		(async () => {
			const detail = await fetchPokemonDetail(props.name);
			setPokmon(detail);
		})();
	}, [props.name]);

	if (!pokemon) {
		return null;
	}

	return (
		<Item onClick={handleClick}>
			<Header>
				<PoketNameChip name={pokemon.name} id={pokemon.id} />
			</Header>
			<Body>
				<Image src={pokemon.images.dreamWorldFront} alt={pokemon.name} />
			</Body>
			<Footer>
				<PoketMarkChip />
			</Footer>
		</Item>
	);
};

const Item = styled.li`
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
		background-color: yellow;
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
