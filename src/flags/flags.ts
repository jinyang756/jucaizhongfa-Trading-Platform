import { createHypertuneAdapter } from '@flags-sdk/hypertune';
import { type Identify } from 'flags';
import { dedupe } from 'flags/next';
import { createSource, flagFallbacks, vercelFlagDefinitions as flagDefinitions, type Context, type FlagValues } from '../../generated/hypertune';

const identify: Identify<Context> = dedupe(
  async ({  }) => {
    return {
        environment: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test')
          ? (process.env.NODE_ENV as 'production' | 'test')
          : 'development',
        user: {
          id: 'anonymous',
          name: 'Anonymous User',
          email: 'anonymous@example.com',
        },
      };
  }
);

export const hypertune = createHypertuneAdapter<
  FlagValues,
  Context
>({ createSource, flagFallbacks, flagDefinitions, identify });