import { createPinia, setActivePinia } from "pinia";
import { useTodotore } from "../store/modules/todo";

describe("todoStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("使用top:命令应该将todo放到第一位", () => {
    const store = useTodotore();
    store.addTodo("top:1");
    expect(store.todoList[0].content).toBe("1");
  });

  it("调用removeTodo应该把对应下标的todo给删除", () => {
    const store = useTodotore();
    store.removeTodo(0);
    expect(store.todoList.length).toBe(0);
  });

  it("调用removeAll应该把todoList数组清空", () => {
    const store = useTodotore();
    store.addTodo('11111');
    store.addTodo('11111');
    store.addTodo('11111');
    store.removeAll();
    expect(store.todoList.length).toBe(0);
  });
});

// it("调用removeTodo应该把对应下标的todo给删除", () => {
//   const store = useTodotore();
//   store.removeTodo(0);
//   expect(store.todoList.length).toBe(0);
// });

// it("先添加一个todo再去删", () => {
//   const store = useTodotore();
//   store.addTodo("1");
//   store.addTodo("2");
//   expect(store.todoList[1].content).toBe("1");
//   expect(store.todoList[2].content).toBe("2");
//   store.removeTodo(1);
//   expect(store.todoList[1].content).toBe('2');
// });

// it("测试remove功能", () => {
//   const store = useTodotore();
//   store.addTodo("1");
//   store.addTodo("2");
//   expect(store.todoList[1].content).toBe("1");
//   expect(store.todoList[2].content).toBe("2");
//   store.removeAll();
//   expect(store.todoList.length).toBe(0);
//   expect(store.todoList).toEqual([]);
// });
