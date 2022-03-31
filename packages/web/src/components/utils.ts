export const generateLabelId = (label: string) =>
  label.trim().toLowerCase().split(/\s+/).join('-');
