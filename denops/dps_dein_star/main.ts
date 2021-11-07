import {
  Denops,
  ensureArray,
  ensureObject,
  ensureString,
  isString,
  vars,
} from "./deps.ts";
import { star } from "./gh-star.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async deinStar(_args: unknown): Promise<void> {
      const token = await vars.g.get(denops, "dps_dein_star_token");
      const debug = await vars.g.get(denops, "dps_dein_star_debug");
      const plugins = await vars.g.get(denops, "dein#_plugins");
      const ignoreUsers =
        await vars.g.get(denops, "dps_dein_star_ignore_users") || [];
      ensureString(token);
      ensureObject(plugins);
      ensureArray(ignoreUsers, isString);
      for (const name in plugins) {
        const [owner, repo] = plugins[name]["repo"].split("/");
        if (owner == "" || ignoreUsers.includes(owner)) {
          continue;
        }
        try {
          await star(owner, repo, token);
          if (debug) {
            console.log(`I star ${owner}/${repo}`);
          }
        } catch (e) {
          if (debug) {
            console.error(e);
          }
        }
      }
    },
  };
  await denops.cmd(
    `command! DeinStar call denops#notify('${denops.name}', 'deinStar', [])`,
  );
}
