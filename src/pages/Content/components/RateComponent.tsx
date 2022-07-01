import { Box, HStack } from '@chakra-ui/react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

type Props = {
  rating: number;
  size: number | string;
};

export default function RatingComponent({ rating, size }: Props) {
  const mapper = [0, 1, 2, 3, 4];
  return (
    <HStack>
      {mapper.map((key: number) =>
        // eslint-disable-next-line no-nested-ternary
        rating - key >= 0.75 ? (
          <FaStar fill="#FFD966" />
        ) : rating - key >= 0.25 ? (
          <FaStarHalf fill="#FFD966" />
        ) : (
          <Box w={size} h={size} />
        )
      )}
    </HStack>
  );
}
