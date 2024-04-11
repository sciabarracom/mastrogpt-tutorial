<script>
    import {
        TreeView,
        TreeViewItem,
        getDrawerStore,
    } from "@skeletonlabs/skeleton";

    export let services;

    const drawerStore = getDrawerStore();

    function drawerClose() {
        drawerStore.close();
    }

    export let sendMessage;

    function sendMsg(name) {
        return () => {
            sendMessage(name);
            drawerClose();
        };
    }
</script>

<div
    class="flex h-full flex-col items-center rounded-tr-lg bg-surface-500 text-white shadow"
>
    <div aria-current="page" aria-label="Homepage" class="mt-4">
        <span class="p-3 font-arista text-4xl h-16 w-56 underline">
            MastroGPT
        </span>
    </div>
    <nav class="w-full p-4">
        <hr class="mb-8" />
        {#each Object.keys(services) as name}
            <TreeView class="rounded-r-lg">
                <button
                    {name}
                    on:click={sendMsg(name)}
                    class="w-full text-center text-lg"
                >
                    <TreeViewItem>{name}</TreeViewItem>
                </button>
            </TreeView>
        {/each}
    </nav>
</div>
