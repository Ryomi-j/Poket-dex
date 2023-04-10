import styled from "@emotion/styled";

export const PoketMarkChip = () => {
    return (
        <Chip>
            <Text>Pokémon</Text>
        </Chip>
    )
}

const Chip = styled.div`
	display: flex;
	align-items: center;

	border: 1px solid #c0c0c0;
	border-radius: 16px;
	font-weight: bold;
	box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
    margin: 10px 5px 16px auto;
`;

const Text = styled.label`
    padding: 0 8px;
    font-size: 14px;
`