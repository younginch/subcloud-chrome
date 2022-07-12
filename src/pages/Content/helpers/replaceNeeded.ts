export default function replaceNeeded(targetId: string) {
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const { classList } = targetElement;
    for (let i = 0; i < classList.length; i += 1) {
      if (classList[i].includes('SubCloud_')) {
        const t = Number(classList[i].replace('SubCloud_', ''));
        if (Date.now() - t >= 2000) return true;
        return false;
      }
    }
    return true;
  }
  return false;
}
