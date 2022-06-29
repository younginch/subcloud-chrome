import { Tbody, Td, Tr } from '@chakra-ui/react';
import { Status } from '../../../../utils/type';

type Props = {
  lang: string;
  rating: number;
  viewCount: number;
  status: Status;
  madeBy: string;
  onClick: () => void;
};

export default function TableRow({
  lang,
  rating,
  viewCount,
  status,
  madeBy,
  onClick,
}: Props) {
  const width = ['80px', '50px', '70px', '100px', '100px'];
  const style = {
    '&:hover': {
      'background-color': '#444444',
    },
  };
  return (
    <Tbody bgColor="white" sx={style} onClick={onClick}>
      <Tr>
        <Td minW={width[0]} color="white">
          {lang}
        </Td>
        <Td minW={width[1]} color="white">
          {rating}
        </Td>
        <Td minW={width[2]} color="white">
          {viewCount}
        </Td>
        <Td minW={width[3]} color="white">
          {status}
        </Td>
        <Td minW={width[4]} color="white">
          {madeBy}
        </Td>
      </Tr>
    </Tbody>
  );
}
