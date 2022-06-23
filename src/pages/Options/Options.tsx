import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

export default function Options({ title }: Props) {
  return <div className="OptionsContainer">{title} Page</div>;
}
