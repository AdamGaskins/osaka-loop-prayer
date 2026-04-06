<template>
    <div class="bg-black text-white rounded-sm shadow-lg py-1">
        <slot></slot>
    </div>
</template>

<style scoped>
@reference '../style.css';

:deep(*) {
    @apply text-white;
}

:deep(h2) {
    @apply font-bold px-2 pt-1 mx-1 tracking-wide;
    text-shadow: 0 0 4px rgb(255 255 255 / 0.5);
}

:deep(h1) {
    @apply text-2xl px-2 pb-1 border-b-2 mx-1 tracking-wide;
    text-shadow:
        0 0 3px rgb(255 255 255 / 0.5),
        0 0 8px rgb(255 255 255 / 1);

    .small {
        @apply text-xl;
    }
}

:deep(p) {
    @apply leading-4.5 py-1 px-3 tracking-wider text-sm;
    text-shadow: 0 0 4px rgb(255 255 255 / 1);
}
</style>
