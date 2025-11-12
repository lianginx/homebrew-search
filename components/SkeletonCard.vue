<template>
  <UCard>
    <template #header>
      <div class="flex space-x-6 justify-between items-center">
        <div class="flex-1 flex flex-col space-y-2">
          <USkeleton class="h-5 w-2/4" />
          <USkeleton class="h-4 w-full" />
        </div>
        <USkeleton class="h-6 w-12" />
      </div>
    </template>

    <USkeleton class="h-4 w-full" />
    <USkeleton class="h-4 w-3/5 mt-2" />

    <template #footer>
      <USkeleton class="h-4 w-2/5" />
    </template>
  </UCard>
</template>
