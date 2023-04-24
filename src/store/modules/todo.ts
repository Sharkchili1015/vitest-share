import { defineStore } from "pinia";
import { nextTick, ref, watch } from "vue";
type Todo = {
  done: boolean;
  content: string;
};
export const useTodotore = defineStore("todo", () => {

  const count = ref(0);
  const add = () => {
    count.value++;
  };

  const defaultData = [
    {
      done: false,
      content: "Write a blog post",
    },
  ];
  const isRealClear = ref<Boolean>(false)
  const todoList = ref<Todo[]>([]);
  watch(
    () => todoList.value,
    () => {
      if (todoList.value.length === 0 && !isRealClear.value) {
        todoList.value.push(...defaultData);
      }
    },{
      immediate:true
    }
  );
  const addTodo = (todo: string) => {
    const isTop = todo.includes("top:");
    const isDone = todo.includes("done:");
    const addContent = todo.replace("top:", "").replace("done:", "");
    if (isTop) {
      todoList.value.unshift({
        done: isDone,
        content: addContent,
      });
      return;
    }
    todoList.value.push({
      done: isDone,
      content: addContent,
    });
  };
  const removeTodo = (index: number) => {
    todoList.value.splice(index, 1);
    return todoList.value[index]
  };
  const doneTodo = (index:number) =>{
    todoList.value[index].done = !todoList.value[index].done
  }

  const removeAll = () =>{
    isRealClear.value = true
    todoList.value = [];
  }
  return {
    count,
    add,
    addTodo,
    removeTodo,
    todoList,
    doneTodo,
    removeAll
  };
});
