# Integrate <KageLandingPage /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: `KageLandingPage`
Runtime: Full HTML + DOM/CSS + Three.js
Source revision: `SHA-256 c8e06b90397a`

Reference brief:
The complete authored Kage temple experience, preserved as an interactive full-page document with its original navigation, scroll scenes, and local Three.js world.

## Current configured usage

```tsx
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

## Exact implementation source

Canonical HTML: [kage.html](https://threeui.com/landing-pages/kage.html)
Complete registered source bundle: [https://threeui.com/source-code/kage-landing-page.json](https://threeui.com/source-code/kage-landing-page.json)

Required registered files:

- `src/shaders/landing-pages/LandingPages.tsx` — component · SHA-256 `d34af7b5bf8239835102e34de46e7cae69ab29f875acffd3050209ba64b684f5`
- `src/shaders/landing-pages/pageTypography.ts` — controls-source · SHA-256 `809cc65797d531cd3b3ca5a56815d55d24b3ee8d293e4e4bad6fdfe6c83244cc`
- `src/shaders/landing-pages/pageRecipes.ts` — controls-source · SHA-256 `c9d9849cc255bac2d1d938d088c50917f84916f1c516d2bbb27fcfd803523233`
- `public/landing-pages/kage.html` — canonical-source · SHA-256 `c8e06b90397ac246baf0ab6f32f5f6b570acc6fe03c7009f711b579fb72d9f49`
- `public/landing-pages/secret-pathways-assets/fonts.css` — font-source · SHA-256 `985f85a904a4096f92c06552b06f42a45973ac004af4780d68f18af65ddcc1b0`
- `public/landing-pages/secret-pathways-assets/three.min.js` — three-runtime · SHA-256 `8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271`
- `src/shaders/threeui.css` — shared-style · SHA-256 `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf`

Required binary assets:

Binary assets cannot be represented as executable text. Copy each asset byte-for-byte from the ThreeUI package and verify its hash:

| Path | MIME type | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `public/landing-pages/secret-pathways-assets/generated/kage-sanmon-preview.webp` | image/webp | 186398 | `23937f8c8350c55730c3bd17066a250548b2d29aad0e6ffb96218c1354b6db43` |
| `public/landing-pages/secret-pathways-assets/generated/kage-approach.webp` | image/webp | 180064 | `39ff338936097e1bde0c4eadcf09805b9890862703186e67314942de7e0bc36c` |
| `public/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp` | image/webp | 197940 | `c0a6ff7da1cd6909d66e2f3f690b0d524a693e01d2222ab846d0074a90f47471` |
| `public/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp` | image/webp | 102234 | `b8c8060c51c87a103bae619b3a4cc8b8b80632649d83f1f2c2299051e7f9b400` |
| `public/landing-pages/secret-pathways-assets/foreground/png/temple-wall.webp` | image/webp | 86466 | `41c00f017e4ecf2147ee468d74da955bb4e2dad773f75a575022842eaf7609ce` |
| `public/landing-pages/secret-pathways-assets/foreground/png/pine-tree.webp` | image/webp | 195918 | `79b233716d067bbc64c1507f79e4a30ba5f445995158c78562cc5b81f607ede7` |
| `public/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp` | image/webp | 351644 | `8db0b5fbd160a7225391a6283a99681e346e205f24191031657285ef85ef12d2` |
| `public/landing-pages/secret-pathways-assets/foreground/png/sakura-branch.webp` | image/webp | 252528 | `48564194d40496090dbf3bba2a68785cf91fafb655dc8d43ac16f6678aff196d` |
| `public/landing-pages/secret-pathways-assets/foreground/png/maple-leaves.webp` | image/webp | 178208 | `35a90fec62c1a6bbfbbe73cd5d7b1acb889e80546d404182ef9a45fe417b531f` |
| `public/landing-pages/secret-pathways-assets/foreground/png/stone-lantern.webp` | image/webp | 150108 | `d5f3c881bc9d92b72eaaff2b709614d66e21a19e14025d2b9b16a15ab52df3bc` |
| `public/landing-pages/secret-pathways-assets/foreground/png/garden-bush.webp` | image/webp | 286406 | `707e2516ebc0108041fe0ddc26d8bff0a69dc9700641f837765018b64e9ff15e` |
| `public/landing-pages/secret-pathways-assets/foreground/png/basalt-stones.webp` | image/webp | 167866 | `150f1c87e181d651c318168c271bb65c9c8abac6dea6f2421fdd081c5b740471` |
| `public/landing-pages/secret-pathways-assets/foreground/png/hill.webp` | image/webp | 84142 | `ffba816244bcba98e4e33c6ee56165edfe4048db4af122ef3f5822180a85edbc` |
| `public/landing-pages/secret-pathways-assets/foreground/png/shrine-ruins.webp` | image/webp | 145814 | `77006e58f2066e6fa9bfc504df396db49b1c7977858fa52d34dd2dad5feced77` |

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured `<KageLandingPage />` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.