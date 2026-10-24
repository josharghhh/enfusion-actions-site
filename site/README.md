# Project website

Static HTML, CSS and JavaScript for Enfusion Actions. Only this folder is uploaded by the Pages workflow. The local animation editor, model files, configuration and training data are not deployed.

## Preview

From the repository root:

```sh
python -m http.server 8787 --bind 127.0.0.1 --directory site
```

Open `http://127.0.0.1:8787/`. No package install or build step is needed. All visual and video assets are local. Filters and the browser-local setup checklist require JavaScript; the rest of the page works without it.

## Publish with GitHub Pages

1. Review the website and its video before publishing updates to `main`. This public repository currently contains only the website; the animation tool remains in private development until its creator approves release.
2. In this repository's **Settings → Pages**, choose **GitHub Actions** as the source. This repository is public and contains only the approved website content.
3. Run **Project website** from the Actions tab on `main`, or push a site change. The workflow never deploys a feature branch and does not enable Pages automatically.
4. Open the URL reported by the deployment and verify video playback, navigation and asset loading. The expected project path is `/enfusion-actions-site/`; all site assets use relative URLs.

The website is public. Detailed guide links point to the private development repository and are labelled as requiring access. No public tool download is offered until release.

## Updating content

- `index.html`: hero, tutorial, setup steps and FAQ.
- `app.js`: feature explorer and status-tagged roadmap. Distinguish implemented features from experimental workflows and proposed work. Update the visible snapshot date when reviewing claims.
- `style.css`: responsive layout, keyboard focus and reduced-motion rules.
- `assets/creator-walkthrough.mp4`: existing 109.4-second creator walkthrough, recorded by `tools/record_walkthrough.py`. On-screen text is embedded. The page links the current guide because some labels have changed since recording.
- `assets/walkthrough-poster.jpg`: frame extracted from that recording at 55 seconds.
- `assets/logo.svg`: existing project mark from `ui/img/logo.svg`.

The recording depicts the tool using Bohemia's public sample character; it does not distribute that source asset. Retain the repository's licence notices. No private animal models or training datasets have been added to the website.

Feature content was checked against the user guides at main revision `a0f431d`. Graph stability remains experimental per `docs/guide/GRAPH_GENERATOR.md`. Older roadmap entries that already exist (events, animal fitting and export) are described as implemented instead of future work. Additive layers and reliability improvements are labelled proposed; no release date is promised.
