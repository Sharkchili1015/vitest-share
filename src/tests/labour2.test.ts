import {
    coverEstimateLabour,
  } from "../utils";
  
  import { describe, expect, it, beforeEach } from "vitest";

  describe("coverEstimateLabour函数测试", () => {
    it("在最后的汇总函数中对所有的函数再重复执行一遍", () => {
      console.log('coverEstimateLabour(1,1,1)',coverEstimateLabour('1','1','1'))
      expect(coverEstimateLabour('1','1','1')).toContain({
        estimateLabour: 1,
        remainingLabour:0,
        totalEstimateLabour:2
      });
    });
  });
  