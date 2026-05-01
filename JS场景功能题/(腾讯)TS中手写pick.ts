// 手写 TypeScript 的工具类型 Pick
/* 
Pick<T, K> 的作用是：从一个对象类型 T 里面，挑选出指定的属性 K，组成一个新类型

Pick 的作用：从一个对象类型中挑选部分属性组成新类型。
            实现时需要用到 keyof、泛型约束和映射类型。

interface User {
  id: number;
  name: string;
  age: number;
}

type UserInfo = Pick<User, "id" | "name">;

等价于：
type UserInfo = {
  id: number;
  name: string;
};
*/

// T ：原始对象类型
// K：要挑选的属性名，必须是 T 中存在的 key
// keyof T ：取出 T对象中 的所有 key
// K extends keyof T：K 必须是 T 里面存在的属性名
type MyPick<T, K extends keyof T> = {
    // 遍历 K 中的每一个属性 P
    // [P in K]：遍历 K 里面的每一个 key
    // T[P]：取出 T 中 P 这个属性对应的类型
    [P in K]: T[P];
};