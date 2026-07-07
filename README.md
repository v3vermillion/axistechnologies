# axistechnologies

Rebuild of **vermillionaxis.tech**.

While the new site is under construction, this repository serves a temporary
landing page that redirects visitors to the project on GitHub:
<https://github.com/v3vermillion/axistechnologies>.

## How the redirect works

- `index.html` — landing page with a `<meta http-equiv="refresh">` redirect,
  a JavaScript `location.replace` fallback, and a manual link.
- `404.html` — same redirect, so any unknown path also forwards to GitHub.
- `.github/workflows/pages.yml` — deploys the root of this repo to GitHub Pages
  on every push to `main`.

Once the rebuilt site is ready, replace `index.html` (and remove the redirect)
to publish the real site through the same Pages workflow.
