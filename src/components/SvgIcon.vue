<template>
  <svg class="icon" :style="customizedStyle" aria-hidden="true">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      require: true,
      type: String
    },
    customizedStyle: {
      default: function() {
        return {
          width: '1rem',
          height: '1rem',
        }
      },
      type: [String, Object] 
    }
  },
  setup(props) {
    const name = computed(() => `#todo-${props.iconName}`);
    return { name }
  }
};
</script>
<style lang="scss" scoped>
.icon {
  fill: currentColor;
  overflow: hidden;
  use {
    width: 1rem;
    height: 1rem;
  }
}
</style>