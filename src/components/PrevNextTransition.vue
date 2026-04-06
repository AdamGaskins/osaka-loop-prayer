<script setup lang="ts">
defineProps<{
    reverse?: boolean
}>()
</script>

<template>
    <Transition
        :duration="125"
        class="prev_next_transition"
        :name="reverse ? 'back' : 'next'"
        mode="out-in"
    >
        <slot></slot>
    </Transition>
</template>

<style scoped>
.prev_next_transition.transition-slide,
.prev_next_transition :deep(.transition-slide) {
    display: block;
    transform: translateX(0);
    opacity: 1;
    --duration: 0.125s;
}

.next-enter-active.transition-slide,
.next-enter-active :deep(.transition-slide),
.back-enter-active.transition-slide,
.back-enter-active :deep(.transition-slide) {
    transition:
        transform var(--duration) ease-out,
        opacity var(--duration) ease-in;
}
.next-leave-active.transition-slide,
.next-leave-active :deep(.transition-slide),
.back-leave-active.transition-slide,
.back-leave-active :deep(.transition-slide) {
    transition:
        transform var(--duration) ease-in,
        opacity var(--duration) ease-out;
}

.back-leave-to.transition-slide,
.back-leave-to :deep(.transition-slide),
.next-enter-from.transition-slide,
.next-enter-from :deep(.transition-slide) {
    transform: translateX(50%);
    opacity: 0;
}
.next-leave-to.transition-slide,
.next-leave-to :deep(.transition-slide),
.back-enter-from.transition-slide,
.back-enter-from :deep(.transition-slide) {
    transform: translateX(-50%);
    opacity: 0;
}

.next-enter-active :deep(.transition-fade),
.back-enter-active :deep(.transition-fade) {
    transition: opacity var(--duration) ease-out;
}
.next-leave-active :deep(.transition-fade),
.back-leave-active :deep(.transition-fade) {
    transition: opacity var(--duration) ease-in;
}

.next-enter-from :deep(.transition-fade) {
    opacity: 0;
}
.next-leave-to :deep(.transition-fade) {
    opacity: 0;
}

.back-enter-from :deep(.transition-fade) {
    opacity: 0;
}
.back-leave-to :deep(.transition-fade) {
    opacity: 0;
}
</style>
