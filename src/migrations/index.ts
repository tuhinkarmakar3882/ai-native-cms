import * as migration_20260211_023313_initial_schema from './20260211_023313_initial_schema';
import * as migration_20260227_083623_migration from './20260227_083623_migration';
import * as migration_20260309_112520_migration from './20260309_112520_migration';
import * as migration_20260310_094442_migration from './20260310_094442_migration';
import * as migration_20260310_110847_migration from './20260310_110847_migration';
import * as migration_20260310_112846_migration from './20260310_112846_migration';
import * as migration_20260310_123135_migration from './20260310_123135_migration';
import * as migration_20260310_181103_migration from './20260310_181103_migration';
import * as migration_20260310_195027_migration from './20260310_195027_migration';

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
    name: '20260309_112520_migration',
  },
  {
    up: migration_20260310_094442_migration.up,
    down: migration_20260310_094442_migration.down,
    name: '20260310_094442_migration',
  },
  {
    up: migration_20260310_110847_migration.up,
    down: migration_20260310_110847_migration.down,
    name: '20260310_110847_migration',
  },
  {
    up: migration_20260310_112846_migration.up,
    down: migration_20260310_112846_migration.down,
    name: '20260310_112846_migration',
  },
  {
    up: migration_20260310_123135_migration.up,
    down: migration_20260310_123135_migration.down,
    name: '20260310_123135_migration',
  },
  {
    up: migration_20260310_181103_migration.up,
    down: migration_20260310_181103_migration.down,
    name: '20260310_181103_migration',
  },
  {
    up: migration_20260310_195027_migration.up,
    down: migration_20260310_195027_migration.down,
    name: '20260310_195027_migration'
  },
];
