import { tool } from "langchain";
import { z } from "zod";


export const getCurrentTimeTool = tool(
  async ({ timeZone }: { timeZone: string }): Promise<string> => {
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone,
      }).format(new Date());
    } catch {
      return `无法识别时区：${timeZone}。请使用 IANA 时区，例如 Asia/Shanghai。`;
    }
  },
  {
    name: "get_current_time",
    description:
      "根据 IANA 时区查询当前日期和时间。用户询问某地现在几点时使用。",
    schema: z.object({
      timeZone: z
        .string()
        .describe("IANA 时区，例如 Asia/Shanghai、America/Los_Angeles"),
    }),
  },
);

export default getCurrentTimeTool;
