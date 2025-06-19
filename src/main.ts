import 'dotenv/config';
import { generateInstructions } from './lib/generateInstructions';
import { generateTestContent } from './lib/generateTestContent';
import { getArgv } from './lib/getArgv';
import { getFileContents } from './lib/getFileContents';
import { saveGeneratedTest } from './lib/saveGeneratedTest';

// Setup required variables

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

console.info(`✨ Generating tests for the ${componentName} component`);

const instructions = generateInstructions({
  component,
  isTerse: terse,
  extraRules: extraRules,
});

const generatedTestContent = await generateTestContent(instructions);

if (!generatedTestContent) {
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
  throw new Error(
    `❌ Error writing test file: ${error || '0 tests generated.'}`
  );
} else {
  console.info(
    `✅ Success! ${numOfTests} ${numOfTests === 1 ? 'test' : 'tests'} written.`
  );
}

console.info(`👀 See the test suite at ${testPath}`);
