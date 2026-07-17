import { tool } from "langchain";
import { z } from "zod";
import de from "zod/v4/locales/de.js";

// 查询天气工具
const getWeather = tool(
    (input) => { return "在 ${input.city} 是晴天☀️!" },
    {
        name:"get_weather",
        description:"查询城市的天气",
        schema: z.object({
            city: z.string().describe("要查询天气的城市")
        })
    }
);

export default getWeather;