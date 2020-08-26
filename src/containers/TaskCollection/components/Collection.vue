<template>
  <div @click="() => goToDo(task.id)" class="task-item">
    <div class="task-item-left">
      <div v-if="!task.editing" @dblclick="editTask" class="task-item-label">
        {{ task.title }}
      </div>
      <input
        v-else
        class="task-item-edit"
        type="text"
        v-model="task.title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div>
      <span class="remove-task-item" @click="removeTask(task.id)">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  props: ["editTask", "task", "doneEdit", "cancelEdit", "removeTask"],
  methods: {
    goToDo(id) {
      this.$router.replace(`todo/${id}`);
    }
  }
};
</script>

<style scoped></style>
