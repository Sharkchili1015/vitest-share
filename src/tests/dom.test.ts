import { mount,shallowMount } from '@vue/test-utils'
import ToDoList from '../components/ToDoList.vue'
import { createPinia, setActivePinia } from "pinia";
import { useTodotore } from "../store/modules/todo";
import { nextTick } from 'vue';
describe("测试Dom是否存在", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
      });
    test("挂载组件", async () => {
      expect(ToDoList).toBeTruthy();
      const wrapper = shallowMount(ToDoList, {});
      const newBtn = wrapper.find('#newTodo');
      expect(newBtn.exists()).toBe(true);
      const removeBtn = wrapper.find('#removeAllBtn');
      expect(removeBtn.exists()).toBe(true);
    });
});

describe("测试removeAll功能", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
      });
    test("清除所有todo", async () => {
      expect(ToDoList).toBeTruthy();
      const store = useTodotore();
        
      const wrapper = shallowMount(ToDoList, {});
      const removeBtn = wrapper.find('#removeAllBtn');
      expect(removeBtn.exists()).toBe(true);
      await removeBtn.trigger("click");
      await nextTick()
      expect(store.todoList.length).toBe(0);
      const empty =wrapper.find('#empty');
      expect(empty.exists()).toBe(false);
    });
});

describe("测试addTodo功能", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
      });
    test("在初始化的基础上添加新的todo", async () => {
      expect(ToDoList).toBeTruthy();
      const store = useTodotore();
        
      const wrapper = mount(ToDoList, {});
      const input = wrapper.find("input");
      await input.setValue("newTodo");
      expect(input.element.value).toBe("newTodo");
      const addBtn = wrapper.find('#newBtn');
      await addBtn.trigger("click");
      expect(store.todoList.length).toBe(2);
      expect(store.todoList[1]).toEqual({
        content:"newTodo",
        done:false
    })
      const empty =wrapper.find('#empty');
      expect(empty.exists()).toBe(false);
    
    });
});

describe("测试Command:addTodo功能", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
      });
    test("在初始化的基础上添加一个top指令的todo", async () => {
      expect(ToDoList).toBeTruthy();
      const store = useTodotore();
        
      const wrapper = mount(ToDoList, {});
      const input = wrapper.find("input");
      await input.setValue("top:newTodo");
      expect(input.element.value).toBe("top:newTodo");
      const addBtn = wrapper.find('#newBtn');
      await addBtn.trigger("click");
      expect(store.todoList.length).toBe(2);
      await nextTick()
      expect(store.todoList[0].content).toBe('newTodo')
      expect(store.todoList[0]).toEqual({
        done:false,
        content:"newTodo"
    })
      const empty =wrapper.find('#empty');
      expect(empty.exists()).toBe(false);
    
    });
});

describe("在store执行了removeAll，测试dom变化", () => {
  beforeEach(() => {
      setActivePinia(createPinia());
    });
  test("在store执行了removeAll功能后应该出现'empty'", async () => {
    expect(ToDoList).toBeTruthy();
    const wrapper = mount(ToDoList, {});
    const store = useTodotore();
    const empty =wrapper.find('#empty');
    expect(empty.exists()).toBe(false);
    // store.addTodo('newTodo');
    store.removeAll();
    expect(empty.exists()).toBe(false);
  });
});