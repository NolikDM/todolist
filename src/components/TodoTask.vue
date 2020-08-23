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
            <!-- <task-item
              v-for="task in tasksFiltered"
              :key="task.id"
              :task="task"
            ></task-item> -->
            <div v-for="task in tasksFiltered" :key="task.id" class="task-item">
              <div class="task-item-left">
                <div
                  v-if="!task.editing"
                  @dblclick="editTask"
                  class="task-item-label"
                >
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
                <span class="remove-task-item" @click="removeTask(task.id)"
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
      beforeEditCache: ""
    };
  },
  // watch: {
  //   task() {
  //     this.title = this.task.title;
  //   }
  // },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    tasksFiltered() {
      return this.$store.getters.tasksFiltered;
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return;
      }

      this.$store.dispatch("addTask", {
        id: this.idForTask,
        title: this.newTask
      });

      this.newTask = "";
      this.idForTask++;
    },
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
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  border-width: 1px;
  margin-right: 5px;

  &:hover {
    background: lightskyblue;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightskyblue;
}
// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
