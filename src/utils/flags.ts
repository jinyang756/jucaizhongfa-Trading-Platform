import { createHypertuneAdapter } from '@flags-sdk/hypertune';
import { type Identify } from 'flags';
import { dedupe } from 'flags/next';
import {
  createSource,
  flagFallbacks,
  vercelFlagDefinitions as flagDefinitions,
  type Context,
  type FlagValues,
} from '../../generated/hypertune';

const identify: Identify<Context> = dedupe(async (_context) => {
  // _context is intentionally unused but required by the Identify type signature
  void _context;
  return {
    environment:
      import.meta.env.MODE === 'production' || import.meta.env.MODE === 'test'
        ? (import.meta.env.MODE as 'production' | 'test')
        : 'development',
    user: {
      id: 'anonymous',
      name: 'Anonymous User',
      email: 'anonymous@example.com',
    },
  };
});

export const hypertune = createHypertuneAdapter<FlagValues, Context>({
  createSource,
  flagFallbacks,
  flagDefinitions,
  identify,
});
