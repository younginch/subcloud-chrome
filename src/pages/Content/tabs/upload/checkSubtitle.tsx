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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import toast, { ToastType } from '../../utils/toast';
import getTab from '../../utils/getTab';
import uploadFile from '../../utils/api/uploadFile';
import SelectLang from '../../components/selectLang';
import { VideoCreateSchema } from '../../../../commons/schema';
import { Warning } from '../../../../../utils/error';

type Props = {
  files: File[] | undefined;
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
  sendCallback: () => void;
};

type FormData = {
  lang: string;
};

export default function CheckSubtitle({
  files,
  setFiles,
  sendCallback,
}: Props) {
  const t = chrome.i18n.getMessage;
  const [sub, setSub] = useState<SRTFile | undefined>();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(VideoCreateSchema) });

  const preview = async () => {
    try {
      if (sub) chrome.storage.local.set({ subtitle: JSON.stringify(sub) });
      await toast(ToastType.SUCCESS, 'Preview started');
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, `Error at preview`);
    }
  };

  const upload = async (lang: string) => {
    try {
      if (!files) return;
      const tab = await getTab();
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        try {
          if (!lang) throw new Error('Language not selected');
          uploadFile(String(reader.result), files[0].name, tab.url, lang);
        } catch (error: unknown) {
          if (error instanceof Error) toast(ToastType.ERROR, error.message);
          else if (!lang && error instanceof Warning)
            toast(ToastType.WARNING, error.message);
        }
      };
      await toast(ToastType.SUCCESS, 'Subtitle uploaded');
    } catch (error: unknown) {
      if (error instanceof Error) toast(ToastType.ERROR, `Error at upload`);
    }
  };

  const handleReUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFiles([e.target.files[0]]);
    }
  };

  function onSubmit(values: FormData) {
    upload(values.lang);
    sendCallback();
  }

  useEffect(() => {
    try {
      if (!files) return;
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        try {
          const data = SRTFile.fromText(String(reader.result));
          setSub(data);
        } catch (error: unknown) {
          if (error instanceof Error)
            toast(ToastType.ERROR, 'File format not supported');
        }
      };
    } catch (error: unknown) {
      if (error instanceof Error)
        toast(
          ToastType.ERROR,
          `Error at checking file format: ${error.message}`
        );
    }
  }, [files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontWeight="bold" fontSize="22px" mt="10px" textAlign="center">
        {t('CheckSubtitle_title')}
      </Text>
      <HStack w="550px" mt="15px !important">
        <Text fontSize="13px">
          {t('CheckSubtitle_details_first')}
          {sub?.array.length}
          {t('CheckSubtitle_details_end')}
        </Text>
        <Spacer />
        <Button
          colorScheme="red"
          fontSize="12px"
          onClick={() => document.getElementById('subtitleFileInput')?.click()}
        >
          {t('CheckSubtitle_reupload')}
        </Button>
        <input
          type="file"
          id="subtitleFileInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleReUpload(e)
          }
          hidden
        />
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
              width={180}
              height={40}
              mainFont="15px"
              subFont="13px"
              marginTop="4px"
              lang={watch().lang}
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
            <Text fontSize="18px">{t('CheckSubtitle_preview')}</Text>
          </Button>
          <Button
            leftIcon={<IoMdCloudUpload size="20px" />}
            h="45px"
            w="130px"
            colorScheme="green"
            ml="30px !important"
            type="submit"
          >
            <Text fontSize="18px">{t('CheckSubtitle_send')}</Text>
          </Button>
        </HStack>
      </FormControl>
    </form>
  );
}
