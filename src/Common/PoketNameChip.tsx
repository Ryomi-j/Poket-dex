import styled from "@emotion/styled";

interface PokeNameChipProps {
	name: string,
	id: number
}

export const PoketNameChip = (props: PokeNameChipProps) => {
	const renderNumber = (id: number) => {
		const digits = 3
		const numStr = id.toString();
		
		if(numStr.length >= digits) return numStr

		let result = ''
		for(let i = 0; i < digits - numStr.length; i++){
			result += 0
		}
		return `${result}${numStr}`
	}

	return (
		<Chip>
			<NumberChip>
				<Number>{renderNumber(props.id)}</Number>
			</NumberChip>
			<Text>{props.name}</Text>
		</Chip>
	);
};

const Chip = styled.div`
	display: flex;
	align-items: center;

	border: 1px solid #c0c0c0;
	border-radius: 16px;
	font-weight: bold;
	box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;

const NumberChip = styled.div`
	padding: 4px 6px;
	background-color: yellow;
	border-radius: 16px;
	opacity: 0.8;
`;

const Number = styled.label`
	opacity: 1;
`;

const Text = styled.label`
	margin: 0 8px 0 5px;
`;
