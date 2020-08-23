<template>
  <div>
    <form action="#">
      <p>
        <label>
          <input
            type="checkbox"
            :checked="!anyRemaining"
            @change="allChecked"
          />
          <span>Check All</span>
        </label>
      </p>
    </form>
    <!-- <label>
      <input type="checkbox" :checked="!anyRemaining" @change="allChecked" />
      Check All
    </label> -->
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>
