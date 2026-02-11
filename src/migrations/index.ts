import * as migration_20260204_092938_initial_schema from './20260204_092938_initial_schema'

export const migrations = [
  {
    up: migration_20260204_092938_initial_schema.up,
    down: migration_20260204_092938_initial_schema.down,
    name: '20260204_092938_initial_schema'
  },
];
