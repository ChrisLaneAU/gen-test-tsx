import { readFile } from 'fs/promises';

export const getFileContents = async (componentPath: string) => {
  try {
    const normalisedComponentPath =
      componentPath.match(/(?:^|\/)([A-Za-z].+?)(?=$)/)?.[1] || componentPath;
    const fileContents = await readFile(
      `./${normalisedComponentPath}`,
      'utf-8'
    );

    return {
      error: null,
      fileContents,
    };
  } catch (error) {
    return {
      error,
      fileContents: null,
    };
  }
};
