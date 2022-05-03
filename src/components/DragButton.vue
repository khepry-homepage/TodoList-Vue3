<template>
  <div id="drag-box" class="cursor" draggable=true @dragstart="dragstart" @drag="drag" @dragend="dragend">
    <slot name="content"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DragButton',
  setup() {
    let dragbox = null;
    let cloneDragbox = null;
    let maxOffsetX = null;
    let maxOffsetY = null;
    // 拖拽开始时处理事件
    const dragstart = (event) => {
      dragbox = document.querySelector('#drag-box');
      cloneDragbox = dragbox.cloneNode(true);
      
      maxOffsetX = document.body.clientWidth - dragbox.clientWidth;
      maxOffsetY = document.body.clientHeight - dragbox.clientHeight;
      cloneDragbox.style = `position:fixed;left:${dragbox.offsetLeft}px;top:${dragbox.offsetTop}px;z-index:1000;pointer-events:none;text-align:center;`
      document.body.appendChild(cloneDragbox);

      let img = new Image();
      img.src = "";
      event.dataTransfer.setDragImage(img, 0, 0);
    }

    // 拖拽中处理事件
    const drag = (event) => {
      event.dataTransfer.dropEffect = "none";
      dragbox.style.visibility = 'hidden';
      if(cloneDragbox){
        let newOffsetLeft = event.clientX - 0.5 * dragbox.clientWidth;
        let newOffsetTop = event.clientY - 0.5 * dragbox.clientHeight;
        newOffsetLeft = newOffsetLeft < 0 ? 0 : newOffsetLeft > maxOffsetX ? maxOffsetX : newOffsetLeft;
        newOffsetTop = newOffsetTop < 0 ? 0 : newOffsetTop > maxOffsetY ? maxOffsetY : newOffsetTop;

        let leftOffset = newOffsetLeft - dragbox.offsetLeft;
        let topOffset = newOffsetTop - dragbox.offsetTop;
        cloneDragbox.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
      }
    }

    // 拖拽结束删除源结点
    const dragend = (event) => {
      let left = event.clientX - 0.5 * dragbox.clientWidth;
      let top = event.clientY - 0.5 * dragbox.clientHeight;
      left = left < 0 ? 0 : left > maxOffsetX ? maxOffsetX : left;
      top = top < 0 ? 0 : top > maxOffsetY ? maxOffsetY : top;

      document.body.removeChild(cloneDragbox);
      cloneDragbox = null;
      dragbox.style.left = `${left}px`;
      dragbox.style.top = `${top}px`;
      dragbox.style.visibility = 'visible';
    }

    return {
      dragstart,
      drag,
      dragend,
    }
  }
});
</script>
<style scoped>
#drag-box {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(84, 121, 200);
  box-shadow: 0 1px 4px rgb(19, 148, 187);
  padding: 0.3rem 0.3rem;
  left: 25rem;
  top: 40rem;
}
#drag-box:hover {
  background-color: rgb(75, 110, 187);
}
</style>