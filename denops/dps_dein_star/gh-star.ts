export async function star(owner: string, repo: string, token: string) {
  const url = `https://api.github.com/user/starred/${owner}/${repo}`;
  const res = await fetch(
    url,
    {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      }),
      method: "PUT",
    },
  );
  if (res.status != 204) {
    throw new Error(`${res.status} ${res.statusText} ${url}`);
  }
}
