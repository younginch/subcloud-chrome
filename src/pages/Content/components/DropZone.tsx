import { Box, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

type Hover = {
  'background-color': string;
};

type Style = {
  outline: string;
  'outline-offset': string;
  'text-align': string;
  transition: string;
  'background-color': string;
  display: string;
  'align-items': string;
  'justify-content': string;
  '&:hover': Hover;
};

type Props = {
  setFiles: (file: File[]) => void;
};

export default function DropZone({ setFiles }: Props) {
  const defaultColor = '#364044';
  const dragOverColor = '#999999';
  const hoverColor = '#14181A';
  const [styleSheet, setStyle] = useState<Style>({
    outline: '2px dashed #aaaaaa',
    'outline-offset': '-10px',
    'text-align': 'center',
    transition: 'all .15s ease-in-out',
    'background-color': defaultColor,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '&:hover': {
      'background-color': hoverColor,
    },
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setStyle({
      ...styleSheet,
      'background-color': dragOverColor,
      'outline-offset': '-20px',
    });
  };

  const handleDragLeave = () => {
    setStyle({
      ...styleSheet,
      'background-color': defaultColor,
      'outline-offset': '-10px',
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleDragLeave();
    const totalFiles: File[] = [];

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i += 1) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if (file !== null) {
            totalFiles.push(file);
          }
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        totalFiles.push(e.dataTransfer.files[i]);
      }
    }
    /*
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        if (checkValidFiles(tabs[0].id, totalFiles)) setFiles(totalFiles);
      }
    });
    */
    setFiles(totalFiles);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        if (e.target.files !== null) {
          if (checkValidFiles(tabs[0].id, e.target.files)) setFiles([e.target.files[0]]);
        }
      }
    });
    */
    if (e.target.files !== null) setFiles([e.target.files[0]]);
  };

  return (
    <Box
      sx={styleSheet}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDrop={(e: React.DragEvent<HTMLElement>) => handleDrop(e)}
      onClick={() => document.getElementById('subtitleFileInput')?.click()}
      w="100%"
      h="100%"
    >
      <VStack align="center">
        <input
          type="file"
          id="subtitleFileInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e)}
          hidden
        />
        <Text color="white" fontSize="md">
          Drop
        </Text>
        <Text color="white" fontSize="md" mt="10px">
          Click
        </Text>
      </VStack>
    </Box>
  );
}
