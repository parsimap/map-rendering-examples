# Security policy

## Reporting a vulnerability

Report security problems privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**. Do not open a public issue or pull request for a security problem.

Include the affected example folder, the steps to reproduce the problem, and its impact. We will acknowledge the report, keep you updated while we work on it, and credit you when the fix is published unless you prefer not to be named.

## Scope

This repository holds minimal example projects. Reports are in scope when they concern the example code, the build configuration, or the CI workflows in this repository. Vulnerabilities in a third-party library (MapLibre, Mapbox, Leaflet, a framework, or a build tool) belong to that project; report them upstream. Problems with the Parsimap service itself, such as the tile or style APIs or the dashboard, are out of scope here.

## Leaked map tokens

The examples read map tokens from files that Git ignores, so a token should never reach this repository. If you find a real Parsimap or Mapbox token in a commit, an issue, or a pull request:

- Report it privately as described above rather than pointing it out in public.
- If the token is yours, revoke it and create a new one in the [Parsimap dashboard](https://dashboard.parsimap.ir) or your [Mapbox account](https://account.mapbox.com/access-tokens/). Removing it from Git history does not make a leaked token safe again.

A token used in a web page or a mobile app is visible to the people who use it. Restrict each token to the domains or apps that use it where the token settings allow it.
