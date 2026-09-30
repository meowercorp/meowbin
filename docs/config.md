# Meowbin Configuration

This project uses Bun. Creating a `.env` in the root folder (optionally `.env.production` and `.env.development`) will automatically load variables from that file.

Optionally, they can be configured via TypeScript by editing `src/config.ts`.

| Name               | Default                        | Description                                                      |
| ------------------ | ------------------------------ | ---------------------------------------------------------------- |
| BASE_PATH          | `~/.config/meowercorp/meowbin` | The root folder where config files are stored.                   |
| PASTE_PATH         | `$BASE_PATH/data`              | The folder where pastes are stored.                              |
| DISABLE_PRUNE      | `false`                        | Disable the prune cron task                                      |
| MAX_PRUNE_TIME     | `604800000`                    | Maximum time (ms) before pastes are expired, defaults to 1 week. |
| PRUNE_TIME_TO_WAIT | `1000`                         | Time (ms) between each file checked when pruning                 |
