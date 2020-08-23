<template>
  <div class="task-item">
    <div class="task-item-left">
      <div v-if="!task.editing" @dblclick="editTask" class="task-item-label">
        {{ title }}
      </div>
      <input
        v-else
        class="task-item-edit"
        type="text"
        v-model="title"
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
  name: "task-item",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: this.task.id,
      title: this.task.title,
      editing: this.task.editing,
      beforeEditCache: ""
    };
  },
  watch: {
    task() {
      this.title = this.task.title;
      // this.completed = this.task.completed;
    }
  },
  directives: {
    inserted: function(el) {
      el.focus();
    }
  },
  methods: {
    removeTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    editTask() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim().length == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch("updateTask", {
        id: this.id,
        title: this.title,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>
