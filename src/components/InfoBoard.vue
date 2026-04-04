<template>
    <div class="mx-4 bg-black text-white rounded-sm shadow-xl">
        <slot></slot>
    </div>
</template>

<style scoped>
@reference '../style.css';

:deep(*) {
    @apply text-white;
}

:deep(h1) {
    @apply text-2xl px-3 py-1 border-b-2 mx-1 tracking-wide;
    text-shadow:
        0 0 3px rgb(255 255 255 / 0.5),
        0 0 8px rgb(255 255 255 / 1);

    .small {
        @apply text-xl;
    }
}

:deep(p) {
    @apply leading-4.5 py-2 px-4 tracking-wide;
    text-shadow: 0 0 4px rgb(255 255 255 / 1);
}
</style>
