# Gen Test TSX

Welcome! Gen Test TSX is a command line tool that generates unit tests for
frontend applications using Open AI. To run this tool you will need an Open AI
API key.

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

- [Button component test](src/tests/components/Button.test.tsx)
- [TextInput component test](src/tests/components/TextInput.test.tsx)
- [TextInput test (using just the props type definition)](src/tests/types/TextInput.test.tsx)

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

```
pnpx gen-test-tsx path/to/your/Component.tsx --extraRules "Add the filename in a comment at the top of the file,Use a props generator function rather than assigning default props to variables"
```

Extra rules will be added to the list of base rules and sent as part of the
prompt. The string passed to the `--extraRules` flag will be split at each comma
and you can add any rules that you like. You can see the list of base rules in
the [generateInstructions.ts file](/src/lib/generateInstructions.ts).

## Open AI API Alternative

If you don't want to pay for an Open AI API Key then you can just copy and paste
the prompt that generates the test into any free LLM tool. That prompt can be
found here:

[Prompt for generating test file](/src/lib/generateInstructions.ts)
