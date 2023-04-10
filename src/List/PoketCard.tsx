import styled from "@emotion/styled";
import { PoketNameChip } from "../Common/PoketNameChip";
import { PoketMarkChip } from "../Common/PoketMarkChip";
import { useNavigate } from "react-router-dom";

const TempImgUrl = `https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg`;

interface PokeCardProps {
	name: string;
}

export const PoketCard = (props: PokeCardProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/pokemon/${props.name}`);
	};

	return (
		<Item onClick={handleClick}>
			<Header>
				<PoketNameChip name={props.name}/>
			</Header>
			<Body>
				<Image src={TempImgUrl} alt="피카츄" />
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
