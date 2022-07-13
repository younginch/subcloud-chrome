import { Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';

type Style = {
  outline: string;
  outlineOffset: string;
  textAlign: string;
  transition: string;
  backgroundColor: string;
  display: string;
  alignItems: string;
  justifyContent: string;
};

type Props = {
  setFiles: (file: File[]) => void;
  children?: React.ReactNode;
  uploadCallback: () => void;
};

export default function DropZone({
  setFiles,
  uploadCallback,
  children,
}: Props) {
  const defaultColor = '#364044';
  const dragOverColor = '#999999';
  const [styleSheet, setStyle] = useState<Style>({
    outline: '2px dashed #aaaaaa',
    outlineOffset: '-10px',
    textAlign: 'center',
    transition: 'all .15s ease-in-out',
    backgroundColor: defaultColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setStyle({
      ...styleSheet,
      backgroundColor: dragOverColor,
      outlineOffset: '-20px',
    });
  };

  const handleDragLeave = () => {
    setStyle({
      ...styleSheet,
      backgroundColor: defaultColor,
      outlineOffset: '-10px',
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
    setFiles(totalFiles);
    uploadCallback();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFiles([e.target.files[0]]);
      uploadCallback();
    }
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
      _hover={{
        backgroundColor: '#14181A',
      }}
      cursor="pointer"
    >
      <VStack align="center">
        <input
          type="file"
          id="subtitleFileInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e)}
          hidden
        />
        {children}
      </VStack>
    </Box>
  );
}

DropZone.defaultProps = {
  children: undefined,
};
