# Dong Lab website

A small Astro homepage for the Dong Lab, ready for GitHub Pages. Text, images, layout and publishing configuration are stored in this repository.

## Edit the homepage

Open `src/content/home.json` to change the homepage text. On GitHub, select the pencil icon, edit the text inside the quotation marks, then commit the change to `main`. Preserve quotation marks and commas. GitHub Actions rebuilds and publishes the website after each commit.

| What to change | File |
| --- | --- |
| Homepage wording, research areas, contact information | `src/content/home.json` |
| Page layout and navigation | `src/pages/index.astro` |
| Colours, fonts and responsive layout | `src/styles/global.css` |
| Hero illustration | `public/images/ai-drug-discovery.png` |
| Research illustration | `public/images/experimental-validation.png` |
| Build and publishing workflow | `.github/workflows/deploy.yml` |

## Publish on GitHub Pages

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open **Actions → Deploy Dong Lab website → Run workflow**, select `main`, and run it.
4. When both jobs succeed, find the website URL under **Settings → Pages**.

The workflow uses Node.js 24, installs the locked dependencies with `npm ci`, builds the site, and uploads the output in `dist/`. No personal access token, API key or separate hosting account is needed.

## Connect a custom domain later

Set your custom domain in **Settings → Pages** and configure DNS at your registrar. Then manually run **Deploy Dong Lab website** again. The workflow reads the new address and supplies `SITE_URL` and `BASE_PATH` to Astro, so no source-code edit is needed when switching from a GitHub project URL to `dong-lab.ca`.

There is intentionally no `public/CNAME` file: this project uses GitHub Actions, and GitHub Pages manages the domain through repository settings.

## Optional local development

Install Node.js 24 LTS, open a terminal in this folder, then run:

```sh
npm ci
npm run dev
```

Open the local address shown in the terminal. To make a production build:

```sh
npm run build
npm run preview
```

You do not need to install anything locally to use the browser-upload workflow described above.

## Content and illustration notes

This is a first homepage draft. The research descriptions are proposed wording based on Dr. Dong's institutional research profile; review them before treating them as the final lab description.

The contact address, academic role and institutional affiliation were checked against [Dr. Xuesen Dong's VCH Research Institute profile](https://www.vchri.ca/researchers/xuesen-dong) on 19 October 2026. Research themes include RNA-binding proteins and treatment resistance, computer-aided drug design, and circular-RNA biomarkers. No clinical performance claims or unpublished results are included.

The two conceptual illustrations were reused, without changing their content, from the owner's earlier pitch-video image set: `05_AI_Drug_Discovery.png` and `07_Experimental_Validation.png`. They are illustrations, not photographs of the lab or experimental data. Institution names are text links; the starter does not include institutional logos.

## Official setup references

- [Create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [Upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Connect a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Connect a Wix domain to an external website](https://support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site)
