import React from 'react';
import { createRoot } from 'react-dom/client';

export const enum AttachType {
  APPEND,
  PREPEND,
}

type Props = {
  parentQuery: string;
  targetId: string;
  children: React.ReactNode;
  attachType?: AttachType;
};

/**
 * Render provided component and return result
 * @param {string} parentQuery Selector query of parent element to insert component
 * @param {string} targetId Identifier id to render the component
 * @param {React.ReactNode} children component to render
 * @param {AttachType} attachType Attachment method
 * @returns {boolean} Returns true if successfully loaded
 */
export default function componentLoader({
  parentQuery,
  targetId,
  children,
  attachType = AttachType.APPEND,
}: Props): boolean {
  const parentElement = document.querySelector(parentQuery);
  let targetElement = document.querySelector(`#${targetId}`);

  if (targetElement) {
    targetElement.remove();
  }

  if (parentElement) {
    targetElement = document.createElement('div');
    targetElement.id = targetId;

    switch (attachType) {
      case AttachType.APPEND:
        parentElement.append(targetElement);
        break;
      case AttachType.PREPEND:
        parentElement.prepend(targetElement);
        break;
      default:
        parentElement.append(targetElement);
        break;
    }
    createRoot(targetElement!).render(children);
    return true;
  }
  return false;
}
