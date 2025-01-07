import * as migration_20250101_111849_init_migration from './20250101_111849_init_migration';
import * as migration_20250107_172212 from './20250107_172212';

export const migrations = [
  {
    up: migration_20250101_111849_init_migration.up,
    down: migration_20250101_111849_init_migration.down,
    name: '20250101_111849_init_migration',
  },
  {
    up: migration_20250107_172212.up,
    down: migration_20250107_172212.down,
    name: '20250107_172212'
  },
];
