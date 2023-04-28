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

  const todoList = ref<Todo[]>([{
    done:false,
    content:'默认的todo'
  }]);

  const addTodo = (todo: string) => {
    const isTop = todo.includes("top:");
    const addContent = todo.replace("top:", "")
    if (isTop) {
      todoList.value.unshift({
        done: false,
        content: addContent,
      });
      return;
    }
    todoList.value.push({
      done: false,
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
