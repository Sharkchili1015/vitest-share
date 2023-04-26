import {
  isEnableToUpdateEstimateLabour,
  isNullValue,
  calculateRemainingLabour,
  calculateTotalEstimateLabour,
  coverEstimateLabour,
} from "../utils";

import { describe, expect, it, beforeEach } from "vitest";

describe("isEnableToUpdateEstimateLabour函数测试，进入预估工时函数之前的前置条件函数", () => {
  it("当两个值相同的时候返回false", () => {
    expect(isEnableToUpdateEstimateLabour(1, 1)).toBe(false);
  });
  it("当两个值不同的时候返回true", () => {
    expect(isEnableToUpdateEstimateLabour(1, 2)).toBe(true);
  });
});

describe("isNullValue函数测试", () => {
  it("输入的值为null或者为''的时候返回true", () => {
    expect(isNullValue('')).toBe(true);
  });

  it("输入的值不为null或''的时候返回false", () => {
    // navieUI输入框默认是string类型
    expect(isNullValue('1')).toBe(false);
  });
});

 // 3、计算剩余工时的值（预估工时 - 已用工时）
describe("calculateRemainingLabour函数测试", () => {
  it("当剩余工时小于0时，应该返回0", () => {
    expect(calculateRemainingLabour(0,1)).toBe(0);
  });

  it("当预估工时为null时，默认为0", () => {
    expect(calculateRemainingLabour(null,1)).toBe(0);
  });

  it("当剩余工时为>0时，正常输出", () => {
    expect(calculateRemainingLabour(10,1)).toBe(9);
  });
  it("当预估工时为1，剩余工时为1，输出为0", () => {
    expect(calculateRemainingLabour(1,1)).toBe(0);
  });
});

describe("calculateTotalEstimateLabour函数测试", () => {
  it("当剩余工时小于0时，应该返回0", () => {
    expect(calculateTotalEstimateLabour('1','1')).toBe(2);
  });
});
//4、计算总的预估工时（子任务总预估工时+当前登记的预估工时）
describe("coverEstimateLabour函数测试", () => {
  it("在最后的汇总函数中对所有的函数再重复执行一遍", () => {
    console.log('coverEstimateLabour(1,1,1)',coverEstimateLabour(1,1,1))
    expect(coverEstimateLabour('1','1','1')).toContain({
      estimateLabour: isNullValue('1') ? null : 1,
      remainingLabour:calculateRemainingLabour(1,1),
      totalEstimateLabour:calculateTotalEstimateLabour('1','1')
    });
  });
});
