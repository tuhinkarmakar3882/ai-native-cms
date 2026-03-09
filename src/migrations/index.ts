import * as migration_20260211_023313_initial_schema from './20260211_023313_initial_schema';
import * as migration_20260227_083623_migration from './20260227_083623_migration';
import * as migration_20260309_112520_migration from './20260309_112520_migration';

export const migrations = [
  {
    up: migration_20260211_023313_initial_schema.up,
    down: migration_20260211_023313_initial_schema.down,
    name: '20260211_023313_initial_schema',
  },
  {
    up: migration_20260227_083623_migration.up,
    down: migration_20260227_083623_migration.down,
    name: '20260227_083623_migration',
  },
  {
    up: migration_20260309_112520_migration.up,
    down: migration_20260309_112520_migration.down,
    name: '20260309_112520_migration'
  },
];
