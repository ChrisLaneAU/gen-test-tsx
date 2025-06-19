import { cli } from 'cleye';

export const getArgv = () => {
  const argv = cli({
    name: 'main.ts',
    parameters: [
      '<component path>', // Component path is required
    ],

    flags: {
      terse: {
        type: Boolean,
        description: 'Use terse test names.',
        default: false,
      },
      extraRules: {
        type: String,
        description:
          'Add extra rules for test creation by passing a comma-separated list.',
        default: '',
      },
    },
  });

  const componentPath = argv._.componentPath;
  const { extraRules, terse } = argv.flags;

  return {
    componentPath,
    extraRules,
    terse,
  };
};
