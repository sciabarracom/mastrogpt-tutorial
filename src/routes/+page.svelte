<script>
    import "../app.css";

    import { onMount } from "svelte";
    import Navigation from "../lib/components/Navigation.svelte";
    import { AppBar, AppShell, getDrawerStore } from "@skeletonlabs/skeleton";

    // Components & Utilities
    import { Modal, Drawer } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import Chat from "$lib/components/Chat.svelte";

    const drawerStore = getDrawerStore();

    function drawerOpen() {
        drawerStore.open({});
    }

    let services = {};

    onMount(() => {
        fetch($page.url.href + "api/my/mastrogpt/index")
            .then((x) => x.json())
            .then((data) => {
                for (const service of data["services"]) {
                    let name = "" + service.name;
                    services[name] = service.url;
                }
            })
            .catch((e) => {
                console.log(e);
                alert("ERROR: cannot load index");
            });
    });

    let receiveMessage;

    let sendMessage = (name) => {
        let url = $page.url.href + "api/my/" + services[name];
        receiveMessage(name, url);
    };
</script>

<!-- Overlays -->
<Drawer><Navigation {services} {sendMessage} /></Drawer>
<Modal />

<!-- (AppShell) -->
<div class="flex h-full w-auto flex-col justify-between">
    <AppShell
        slotSidebarLeft="bg-surface-500/5 w-0 md:w-64"
        slotPageHeader="md:hidden"
        regionPage={"scroll-smooth"}
    >
        <!-- (header) -->
        <svelte:fragment slot="sidebarLeft">
            <Navigation {services} {sendMessage} />
        </svelte:fragment>
        <!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
        <svelte:fragment slot="pageHeader"
            ><AppBar>
                <svelte:fragment slot="trail">
                    <div
                        class="flex flex-row-reverse items-center justify-between w-full"
                    >
                        <button
                            class="btn btn-sm md:mr-4"
                            on:click={drawerOpen}
                        >
                            <span>
                                <svg
                                    viewBox="0 0 100 80"
                                    class="fill-token h-4 w-4"
                                >
                                    <rect width="100" height="20" />
                                    <rect y="30" width="100" height="20" />
                                    <rect y="60" width="100" height="20" />
                                </svg>
                            </span>
                        </button>

                        <span
                            class="font-arista text-2xl font-bold text-surface-600 ml-2"
                        >
                            MastroGPT
                        </span>
                    </div>
                </svelte:fragment>

                <!-- <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment> -->
            </AppBar></svelte:fragment
        >

        <!-- Content -->
        <div class="relative h-full w-full p-2 py-4">
            <Chat bind:receiveMessage />
        </div>
        <!-- <iframe title="chat" id="chat" src="/chat"></iframe>
                 -->
    </AppShell>
</div>

<!-- 
<link rel="stylesheet" href="/css/almond.min.css" />

<link rel="stylesheet" href="/css/index.css" /> -->

<!-- <div id="iframe-container">
    <iframe title="chat" id="chat" src="/chat"></iframe>
    <iframe title="display" id="display" src="/display"></iframe>
</div> -->
