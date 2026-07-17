import { tool } from "langchain";
import { z } from "zod";

const calculatorTool = tool(
  async ({
    operation,
    a,
    b,
  }: {
    operation: "add" | "subtract" | "multiply" | "divide";
    a: number;
    b: number;
  }): Promise<string> => {
    let result: number;

    switch (operation) {
      case "add":
        result = a + b;
        break;

      case "subtract":
        result = a - b;
        break;

      case "multiply":
        result = a * b;
        break;

      case "divide":
        if (b === 0) {
          return "计算失败：除数不能为 0。";
        }
        result = a / b;
        break;

      default:
        return "计算失败：不支持该运算。";
    }

    return String(result);
  },
  {
    name: "calculator",
    description:
      "执行两个数字之间的加法、减法、乘法或除法。涉及精确数学计算时必须使用这个工具。",
    schema: z.object({
      operation: z
        .enum(["add", "subtract", "multiply", "divide"])
        .describe("需要执行的数学运算"),
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字"),
    }),
  },
);

export default calculatorTool;