import * as migration_20250101_111849_init_migration from './20250101_111849_init_migration';
import * as migration_20250107_163330 from './20250107_163330';

export const migrations = [
  {
    up: migration_20250101_111849_init_migration.up,
    down: migration_20250101_111849_init_migration.down,
    name: '20250101_111849_init_migration',
  },
  {
    up: migration_20250107_163330.up,
    down: migration_20250107_163330.down,
    name: '20250107_163330'
  },
];
