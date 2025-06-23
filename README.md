# Gen Test TSX

Welcome! Gen Test TSX is a command line tool that generates unit tests for
frontend applications using Open AI. To run this tool you will need an Open AI
API key.

![Demo showing test generation – more details below.](https://github.com/ChrisLaneAU/gen-test-tsx/blob/main/src/assets/demo.gif?raw=true)

In this demo we:

- Generate 9 tests in 7.87 seconds.
- Format the code.
- Run the new tests (all pass).
- Spent a total of 33 seconds.

## Generating a test suite

1. Install the package:

```sh
pnpm add gen-test-tsx --save-dev
```

2. In your `.env` file, add your Open AI API key:

```sh
OPENAI_API_KEY=<your-api-key-here>
```

3. Run the generator:

```sh
pnpm gen-test-tsx path/to/your/component.tsx
```

You should now have a test file generated alongside your component with the
name: `<your-component>.test.tsx`.

You can run the test with `pnpx jest /path/to/your/component.test.tsx`.

## Examples

See some of the example tests generated:

- [Button component test](https://github.com/ChrisLaneAU/gen-test-tsx/tree/main/src/tests/components/Button.test.tsx)
- [TextInput component test](https://github.com/ChrisLaneAU/gen-test-tsx/tree/main/src/tests/components/TextInput.test.tsx)
- [TextInput test (using just the props type definition)](https://github.com/ChrisLaneAU/gen-test-tsx/tree/main/src/tests/types/TextInput.test.tsx)

## Options

There's a few configuration options you can use to customise the test
generation.

### Generating tests from type definitions only

```sh
pnpx gen-test-tsx path/to/your/Type.ts
```

You can pass a file that only holds a `type` or `interface` of component props
and generate tests to satisfy those definitions, rather than passing the whole
component. This is particularly useful for TDD.

### Shorten test names

```sh
pnpx gen-test-tsx path/to/your/Component.tsx --terse
```

By default, the generated tests will follow the given, when, then structure (AKA
Gherkin). You can
[read more about given, when, then in this great article from Martin Fowler](https://martinfowler.com/bliki/GivenWhenThen.html).
However, passing the `--terse` flag will opt out of this structure and use
shorter test names and less nested describes.

### Extra rules when generating tests

```sh
pnpx gen-test-tsx path/to/your/Component.tsx --extraRules "Add the filename in a comment at the top of the file,Use a props generator function rather than assigning default props to variables"
```

Extra rules will be added to the list of base rules and sent as part of the
prompt. The string passed to the `--extraRules` flag will be split at each comma
and you can add any rules that you like. You can see the list of base rules in
the
[generateInstructions.ts file](https://github.com/ChrisLaneAU/gen-test-tsx/tree/main/src/lib/generateInstructions.ts).

## Open AI API Alternative

If you don't want to pay for an Open AI API Key then you can just copy and paste
the prompt that generates the test into any free LLM tool. That prompt can be
found here:

[Prompt for generating test file](https://github.com/ChrisLaneAU/gen-test-tsx/tree/main/src/lib/generateInstructions.ts)

## What are the instructions based on?

There's a few parts to the philosophy behind the instructions.

### Firstly, given-when-then has proven a useful structure (especially as it becomes familiar) because it:

1. Encourages thinking about what tests need to be written – methodical
   structure to cover off props, states and code branches.
2. Helps understanding precisely where a test is failing – the environmental
   context of "when" and clear expectation of "then" point right to the culprit.

### Secondly, some great resources on testing:

- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Testing Library element selector priority order](https://testing-library.com/docs/queries/about#priority)
- [Kent C. Dodds post on Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Implicit ARIA roles for HTML elements](https://www.w3.org/TR/html-aria/#docconformance)

The most important takeaways being:

> The more your tests resemble the way your software is used, the more
> confidence they can give you.

> `getByRole` ... This should be your top preference for just about everything.
> There's not much you can't get with this (if you can't, it's possible your UI
> is inaccessible). Most often, this will be used with the name option.

> Use `@testing-library/user-event` over fireEvent where possible. [Fire] all
> the same events the user would fire when performing a specific action.

### Thirdly, some other thoughts gathered over the years:

- If each test has only one assertion, then it's easier to understand and can
  only fail at one thing, so it's easier to pinpoint bugs. Multiple tests can be
  verbose but they provide clearer output, and with the help of AI, it's no
  sweat to write.
- Jest and Testing Library have been around for years and continue to progress
  well.
- No users find elements by `data-testid`, so this should be avoided as much as
  possible.

Of course, `gen-test-tsx` is customisable via `--extraRules` and can be adapted
to any needs or preferences!

## Why not use Cursor or Augmented?

Cursor and Augmented (and friends) are great tools but not everyone has found
success with them. Gen Test TSX allows developers to stay within familiar
tooling (i.e. NPM scripts) and still leverage the power of AI.
