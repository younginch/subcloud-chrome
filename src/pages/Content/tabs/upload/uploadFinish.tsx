import { HStack, Text, Link } from '@chakra-ui/react';
import { AppreciationIcon } from '../../components/icons';

export default function UploadFinish() {
  return (
    <>
      <Text fontWeight="bold" fontSize="22px" m="10px">
        자막이 업로드되었습니다.
      </Text>
      <HStack fontWeight="bold" fontSize="18px" m="10px !important">
        <Link href={API_URL} mt="">
          여기서
        </Link>
        <Text>검토 진행상황을 확인하실 수 있습니다.</Text>
      </HStack>
      <AppreciationIcon size={300} />
      <Text fontWeight="bold" fontSize="20px" mt="-10px !important">
        언어 장벽 극복에 기여해주셔서 감사합니다.
      </Text>
    </>
  );
}
