<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div>
          <div class="flex-center">Tasks</div>
          <!-- <div v-if="$store.state.loading" class="lds-hourglass"></div> -->
          <input
            type="text"
            class="task-input"
            placeholder="New list"
            v-model="newTask"
            @keyup.enter="addTask"
          />
          <transition-group
            name="fade"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <div
              v-for="(task, index) in tasks"
              :key="task.id"
              class="task-item"
            >
              <div class="task-item-left">
                <div
                  v-if="!task.editing"
                  @dblclick="editTask(task)"
                  class="task-item-label"
                >
                  {{ task.title }}
                </div>
                <input
                  v-else
                  class="task-item-edit"
                  type="text"
                  v-model="task.title"
                  @blur="doneEdit(task)"
                  @keyup.enter="doneEdit(task)"
                  @keyup.esc="cancelEdit(task)"
                  v-focus
                />
              </div>
              <div>
                <span class="remove-task-item" @click="removeTask(index)"
                  >&times;</span
                >
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-task",
  data() {
    return {
      newTask: "",
      idForTask: 3,
      beforeEditCache: "",
      tasks: [
        {
          id: 1,
          title: "Home tasks",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Work tasks",
          completed: false,
          editing: false
        }
      ]
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return;
      }

      this.tasks.push({
        id: this.idForTask,
        title: this.newTask,
        completed: false
      });

      this.newTask = "";
      this.idForTask++;
    },
    editTask(task) {
      this.beforeEditCache = task.title;
      task.editing = true;
    },
    doneEdit(task) {
      if (task.title.trim() == "") {
        task.title = this.beforeEditCache;
      }
      task.editing = false;
    },
    cancelEdit(task) {
      task.title = this.beforeEditCache;
      task.editiong = false;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
// Animate CSS Library
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css");

.task-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.task-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-task-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.task-item-left {
  display: flex;
  align-items: center;
}

.task-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.task-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}
</style>
