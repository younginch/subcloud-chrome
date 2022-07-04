// eslint-disable-next-line import/prefer-default-export
export const closeMainModal = () => {
  const mainModal = document.getElementById('subcloud-main-modal');
  if (!mainModal) return false;
  mainModal.classList.remove('modal-visible');
  return true;
};

export const toggleMainModal = () => {
  const mainModal = document.getElementById('subcloud-main-modal');
  if (!mainModal) return false;
  if (mainModal.classList.contains('modal-visible')) {
    mainModal.classList.remove('modal-visible');
  } else {
    mainModal.classList.add('modal-visible');
  }
  return true;
};
