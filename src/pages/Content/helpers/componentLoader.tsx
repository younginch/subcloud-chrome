import React from 'react';
import { createRoot } from 'react-dom/client';

export const enum AttachType {
  APPEND,
  PREPEND,
}

type Props = {
  parentQuery: string;
  targetId: string;
  className?: string;
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
  className,
  children,
  attachType = AttachType.APPEND,
}: Props): boolean {
  const parentElement = document.querySelector(parentQuery);
  let targetElement = document.getElementById(targetId);

  if (targetElement) {
    const { classList } = targetElement;
    for (let i = 0; i < classList.length; i += 1) {
      if (classList[i].includes('SubCloud_')) {
        const t = Number(classList[i].replace('SubCloud_', ''));
        console.log('이양반아 ', targetId, 'dt = ', Date.now() - t);
        if (Date.now() - t >= 2000) targetElement.remove();
        else return true;
      }
    }
  }

  if (parentElement) {
    targetElement = document.createElement('div');
    targetElement.id = targetId;

    if (className) {
      targetElement.classList.add(className);
    }
    targetElement.classList.add(`SubCloud_${Date.now()}`);

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
