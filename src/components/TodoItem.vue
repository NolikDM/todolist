<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <form action="#">
        <p>
          <label>
            <input type="checkbox" v-model="completed" @change="doneEdit" />
            <span></span>
          </label>
        </p>
      </form>
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  created() {
    this.$eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    this.$eventBus.$off("pluralize", this.handlePluralize);
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
    todo() {
      this.title = this.todo.title;
      this.completed = this.todo.completed;
    }
  },
  directives: {
    inserted: function(el) {
      el.focus();
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim().length == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: false
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      this.$eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      const index = this.$store.state.todos.findIndex(
        item => item.id == this.id
      );
      this.$store.state.todos.splice(index, 1, {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    }
  }
};
</script>
