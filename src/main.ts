import 'dotenv/config';
import ora from 'ora';
import { generateInstructions } from './lib/generateInstructions';
import { generateTestContent } from './lib/generateTestContent';
import { getArgv } from './lib/getArgv';
import { getFileContents } from './lib/getFileContents';
import { saveGeneratedTest } from './lib/saveGeneratedTest';

const main = async () => {
  // Setup required variables

  const spinner = ora();

  const { componentPath, extraRules, terse } = getArgv();

  const componentName =
    componentPath.match(/(?:^|\/)([^\/]+?)(\..*)$/)?.[1] || componentPath;

  // Get file contents

  const { error: fileContentsError, fileContents: component } =
    await getFileContents(componentPath);

  if (fileContentsError || !component) {
    throw new Error(
      `❌ Error getting contents of component file. Please ensure the path is correct and try again, or raise an issue in the GitHub repo. ${fileContentsError}`
    );
  }

  // Generate tests

  spinner.start(`Generating tests for the ${componentName} component`);

  const startTime = performance.now();

  const instructions = generateInstructions({
    component,
    isTerse: terse,
    extraRules: extraRules,
  });

  const generatedTestContent = await generateTestContent(instructions);

  if (!generatedTestContent) {
    spinner.stop();

    throw new Error(
      '❌ No test content generated. Please try again or you can open an issue in the GitHub repo.'
    );
  }

  // Save the tests

  const { error, numOfTests, testPath } = await saveGeneratedTest({
    componentPath,
    content: generatedTestContent,
  });

  if (error || !numOfTests) {
    spinner.stop();

    throw new Error(
      `❌ Error writing test file: ${error || '0 tests generated.'}`
    );
  } else {
    const endTime = performance.now();

    spinner.stopAndPersist({ symbol: '✨' });

    spinner.succeed(
      ` Success! ${numOfTests} ${numOfTests === 1 ? 'test' : 'tests'} written in ${((endTime - startTime) / 1000).toFixed(2)} seconds.`
    );
  }

  console.info(`👀 See the test suite at ${testPath}`);
};

main();
