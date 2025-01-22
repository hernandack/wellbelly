<script setup lang="ts">
import TableBody from './TableBody.vue'
import EditorMenu from './EditorMenu.vue'
</script>

<template>
  <section class="table-panel">
    <TableBody>
      <div class="table-panel__menus flex flex-col gap-8 sticky top-0 min-h-svh">
        <EditorMenu />
      </div>
      <slot></slot>
    </TableBody>
  </section>
</template>
