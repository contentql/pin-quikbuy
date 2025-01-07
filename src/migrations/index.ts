import * as migration_20250101_111849_init_migration from './20250101_111849_init_migration';
import * as migration_20250106_104536 from './20250106_104536';

export const migrations = [
  {
    up: migration_20250101_111849_init_migration.up,
    down: migration_20250101_111849_init_migration.down,
    name: '20250101_111849_init_migration',
  },
  {
    up: migration_20250106_104536.up,
    down: migration_20250106_104536.down,
    name: '20250106_104536'
  },
];
