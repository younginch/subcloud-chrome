import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoMdCloudUpload } from 'react-icons/io';
import { SRTFile } from '@younginch/subtitle';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import toast, { ToastType } from '../../utils/toast';
import getTab from '../../utils/getTab';
import uploadFile from '../../utils/api/uploadFile';
import SelectLang from '../../components/selectLang';
import { VideoCreateSchema } from '../../../../commons/schema';

type Props = {
  files: File[] | undefined;
  sendCallback: () => void;
};

type FormData = {
  lang: string;
};

export default function CheckSubtitle({ files, sendCallback }: Props) {
  const [sub, setSub] = useState<SRTFile | undefined>();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(VideoCreateSchema) });

  const preview = async () => {
    try {
      if (sub) chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
      await toast(ToastType.SUCCESS, 'preview started');
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  const upload = async () => {
    try {
      if (!files) return;
      const tab = await getTab();
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        try {
          uploadFile(String(reader.result), files[0].name, tab.url, 'en');
        } catch (error: unknown) {
          if (error instanceof Error) toast(ToastType.ERROR, error.message);
        }
      };
      await toast(ToastType.SUCCESS, 'subtitle uploaded');
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  };

  function onSubmit(values: FormData) {
    upload();
    sendCallback();
  }

  useEffect(() => {
    try {
      if (!files) return;
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        setSub(SRTFile.fromText(String(reader.result)));
      };
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, error.message);
    }
  }, [files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontWeight="bold" fontSize="22px" mt="10px" textAlign="center">
        자막을 검토하고 업로드하세요
      </Text>
      <HStack w="550px" mt="15px !important">
        <Text fontSize="13px">
          파일 미리보기 (자막 수 {sub?.array.length}개)
        </Text>
        <Spacer />
        <Button colorScheme="red" fontSize="12px">
          다시 업로드
        </Button>
      </HStack>
      <Box
        w="550px"
        h="230px"
        mt="5px"
        bg="bgColor.300"
        borderRadius="5px"
        borderWidth="1px"
        borderColor="gray.500"
        overflow="auto"
      >
        {sub
          ?.toText()
          .split('\n')
          .map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text fontSize="14px" key={index}>
              {line}
            </Text>
          ))}
      </Box>
      <FormControl isInvalid={errors.lang !== undefined} as="fieldset">
        <HStack mt="30px !important" alignItems="flex-start">
          <Stack>
            <SelectLang
              width="180px"
              height="40px"
              mainFont="15px"
              subFont="13px"
              marginTop="4px"
              clickEvent={(code: string) => setValue('lang', code)}
            />
            <FormErrorMessage
              justifyContent="center"
              fontSize="14px"
              color="red.300"
            >
              {errors.lang && errors.lang.message}
            </FormErrorMessage>
          </Stack>
          <Button
            leftIcon={<ViewIcon w="20px" h="20px" />}
            h="45px"
            w="130px"
            colorScheme="blue"
            onClick={preview}
            ml="80px !important"
          >
            <Text fontSize="18px">프리뷰</Text>
          </Button>
          <Button
            leftIcon={<IoMdCloudUpload size="20px" />}
            h="45px"
            w="130px"
            colorScheme="green"
            ml="30px !important"
            type="submit"
          >
            <Text fontSize="18px">전송</Text>
          </Button>
        </HStack>
      </FormControl>
    </form>
  );
}
