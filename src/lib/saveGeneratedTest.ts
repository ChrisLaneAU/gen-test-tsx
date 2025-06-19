import { writeFile } from 'fs/promises';

type SaveGeneratedTestArgs = {
  /** The path of the component to generate a test file alongside. */
  componentPath: string;
  /** The content of the test file to be saved. */
  content: string;
};

export async function saveGeneratedTest({
  componentPath,
  content,
}: SaveGeneratedTestArgs) {
  try {
    const testPath =
      componentPath.match(/(?:^|\/)([A-Za-z].+?)(?=\.[^\/.]+$)/)?.[1] ||
      componentPath;
    const fileLocation = `./${testPath}.test.tsx`;

    await writeFile(fileLocation, content, 'utf-8');

    return {
      error: null,
      testPath: fileLocation.slice(2),
      numOfTests: content.match(/expect\(/g)?.length || 0,
    };
  } catch (error) {
    return {
      error,
      testPath: null,
      numOfTests: 0,
    };
  }
}
