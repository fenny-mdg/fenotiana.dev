export type FileType = "pdf";

const fileTypeMatcher: { [key in FileType]: string } = {
  pdf: "data:application/pdf;base64",
};

export const downloadBase64 = (
  base64: string,
  filename: string,
  fileType: FileType
) => {
  const linkSource = `${fileTypeMatcher[fileType]},${base64}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = `${filename}.${fileType}`;
  downloadLink.click();
};
