import React from 'react';
import './options.css';

interface Props {
  title: string;
}

export default function Options({ title }: Props) {
  return <div className="OptionsContainer">{title} Page</div>;
}
