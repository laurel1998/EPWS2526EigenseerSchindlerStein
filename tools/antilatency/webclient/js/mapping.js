/* Mapping Images
############################################################################ */

let mapping = null;

export async function loadMapping() {
  const res = await fetch('/assets/mapping.json');
  mapping = await res.json();
  console.log('Mapping loaded:', mapping);
  return mapping;
}

export function getMapping() {
  return mapping;
}
