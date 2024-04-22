<script>
    import "../app.css";
    import { page } from "$app/stores";
    import {
        computePosition,
        autoUpdate,
        offset,
        shift,
        flip,
        arrow,
    } from "@floating-ui/dom";

    import { storePopup } from "@skeletonlabs/skeleton";
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    // Components & Utilities
    import { initializeStores } from "@skeletonlabs/skeleton";

    initializeStores();

    const defaultMeta = {
        title: "MastroGPT",
        description: "Develop GPT apps with Nuvolaris",
        ogImageUrl: "/og.png",
    };

    $: title = $page.data.meta?.title
        ? `${$page.data.meta?.title} - MastroGPT`
        : defaultMeta.title;
    $: description = $page.data.meta?.description ?? defaultMeta.description;
    $: ogImageUrl = `${$page.url.origin}${$page.data.meta?.ogImageUrl ?? defaultMeta.ogImageUrl}`;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Nuvolaris" />
    <meta property="og:url" content={$page.url.href} />

    <meta property="og:image" content={ogImageUrl} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<slot />
