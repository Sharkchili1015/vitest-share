import { describe, expect, it, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useTodotore } from "../store/modules/todo";

describe("todoStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("调用add函数count应该+1", () => {
    const store = useTodotore();
    store.add();
    expect(store.count).toBe(1);
  });

  it("使用top:命令应该将todo放到第一位", () => {
    const store = useTodotore();
    store.addTodo("top:1");
    expect(store.todoList[0].content).toBe("1");
  });


  it("调用removeDone应该将对应index的todo删除", () => {
    const store = useTodotore();
    store.addTodo("1")
    store.addTodo("2")
    store.addTodo("3")
    const remove = store.removeTodo(1)
    const remover = store.removeTodo(0)
    expect(store.todoList).toContain(remove)
    expect(store.todoList).toContain(remover)
  });

  it("调用removeAll应该将所有的todo删除", () => {
    const store = useTodotore();
    store.addTodo("1")
    store.addTodo("2")
    store.addTodo("3")
    store.removeAll();
    expect(store.todoList).toEqual([])
  });
});
