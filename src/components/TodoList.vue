<template>
    <h1>ToDo App</h1>
    <div class="form">
      <label>New ToDo </label>
      <input v-model="newTodo" id="newTodo" name="newTodo" autocomplete="off" />
      <button id="newBtn" @click="addTodo()">Add ToDo</button>
    </div>
    <h2>ToDo List</h2>
    <ul class="todo-ul">
      <li v-for="(todo, index) in todoList" :key="index">
        <span :class="{ done: todo.done }" @click="store.doneTodo(index)">{{
          todo.content
        }}</span>
        <button id="removeBtn" @click="store.removeTodo(index)">Remove</button>
      </li>
    </ul>
    <h4 id="empty" v-if="todoList.length === 0">Empty list.</h4>
  </template>
<script lang="ts" setup>
import { ref } from "vue";
import { useTodotore } from "../store/modules/todo";

const store = useTodotore();
const { todoList } = store;

const newTodo = ref<String>("");
function addTodo() {
  store.addTodo(newTodo.value as string);
    newTodo.value = "";
  }




</script>
<style lang='scss'>
</style>