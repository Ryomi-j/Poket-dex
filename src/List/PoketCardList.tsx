import styled from "@emotion/styled";
import { PoketCard } from "./PoketCard";

export const PoketCardList = () => {
	return (
		<List>
			{Array.from({ length: 10 }).map((_, idx) => {
				return <PoketCard key={idx} />;
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
