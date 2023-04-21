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
      const removeBtn = wrapper.find('#removeBtn');
      expect(removeBtn.exists()).toBe(true);
    });
});

describe("测试remove功能", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
      });
    test("将初始化的li删除", async () => {
      expect(ToDoList).toBeTruthy();
      const store = useTodotore();
        
      const wrapper = shallowMount(ToDoList, {});
      const removeBtn = wrapper.find('#removeBtn');
      expect(removeBtn.exists()).toBe(true);
      await removeBtn.trigger("click");
      expect(store.todoList.length).toBe(0);

      const empty =wrapper.find('#empty');
      expect(empty.exists()).toBe(true);
    
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
      nextTick(()=>{
      console.log("🚀 ~ file: dom.test.ts:63 ~ test ~ store.todoList:", store.todoList)

    })
      expect(store.todoList.length).toBe(2);
      expect(store.todoList[1]).toEqual({
        content:"newTodo",
        done:false
    })
      const empty =wrapper.find('#empty');
      expect(empty.exists()).toBe(false);
    
    });
});