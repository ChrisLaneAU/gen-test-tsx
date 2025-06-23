const baseInstructions = [
  `The component passed may have props that need to be tested based on the type definitions or it may only be the type definitions.`,
  `Use React Testing Library, Jest, and userEvent for interaction simulation.`,
  `Use "getByRole" as the top priority rather than other methods such as "getByLabelText" wherever possible.`,
  `Use "toBeVisible" as the top priority wherever possible rather than other mehtods such as "toBeInTheDocument".`,
  `Use "userEvent" as a priority over direct methods on elements.`,
  `Ensure that every test has only one "expect" statement.`,
  `If a test has more than one assertion, create additional "test" statements for each one.`,
  `If a component accepts user input and has "value" and "onChange" props, create a test with a controlled version of the component.`,
  `If a component renders a link, always check that the href is correctly attached to the link. Sometimes the prop may be named "url" or similar.`,
  `Always use the full accessible name when selecting elements, e.g. don't use case-insensitive regex.`,
  `Always use "screen", never destructure methods.`,
  `Don't test "htmlFor".`,
  `Don't wrap the response in triple backticks, or include the file name in a comment.`,
  `When using "React" hooks or methods, only import the named exports.`,
  `Always use full word variables, e.g. "event" and not "e".`,
  `Always put an empty line before the "expect" and after the "render" but never put two empty lines and never put an empty line if the only line in the test is the "expect".`,
];

const givenWhenThenInstructions = [
  `Always use "Given, When, Then" format in the test names.`,
  `"Given" should be the start of the first "describe" followed by "a" or "an" appropriately, then the name of the component and "is rendered".`,
  `"When" should be the nested "describe".`,
  `"Then" should be the name for the nested test (use "test", not "it").`,
];

const terseInstructions = [
  `Keep test names terse but clearly describe what the test is doing.`,
];

type GenerateInstructionsArgs = {
  /** The component to generate the tests for. */
  component: string;
  /** A set of extra rules to be added to the list. */
  extraRules?: string;
  /** Set to true for a terse set of test names. This skips the given, when, then structure. */
  isTerse?: boolean;
};

export const generateInstructions = ({
  component,
  extraRules,
  isTerse,
}: GenerateInstructionsArgs) => `You are a code generation assistant who helps create unit tests for React components. 
Write a set of Jest tests using the following rules:

${[
  ...(isTerse ? terseInstructions : givenWhenThenInstructions),
  ...baseInstructions,
  ...(extraRules ? extraRules.split(',') : []),
].map(instruction => `  - ${instruction}`).join(`
`)}

Based on these rules, generate a test file for the following React component:

${component}
`;
