/**
 * 把平铺的数组结构转成树形结构
 * 根据每一项的 id 和 pid，把扁平数组整理成父子结构。
 * 
const arr = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];

  结果：
  [
  {
    id: "01",
    name: "张大大",
    pid: "",
    job: "项目经理",
    children: [
      {
        id: "02",
        name: "小亮",
        pid: "01",
        job: "产品leader",
        children: [
          {
            id: "07",
            name: "小丽",
            pid: "02",
            job: "产品经理",
            children: []
          }
        ]
      }
    ]
  }
]
*/

const { Children } = require("react");

function arrayToTree(arr){
  // 解题思路： 前后两遍遍历

  const map = new Map();
  const roots = [];

  // 第一遍：Map 存每个节点，key为 节点id, 多加一个 chirldren 数组
  arr.forEach((item) => {
    map.set(item.id, {
      ...item,
      Children: []
    })
  })

  // 第二遍：找到父节点，并把 父节点 放进父节点的 children
  arr.forEach((item) => {
    // 获取当前节点
    const curNode = map.get(item.id);

    // 获取当前节点的父节点
    const parentNode = map.get(item.pid);

    // 如果 父节点 存在
    if(parentNode){
      // 将 当前节点 放在父节点 的 children 
      parentNode.Children.push(curNode);
    } else {
      // 父节点不存在，放到根节点数组
      roots.push(curNode);
    }
  })

  return roots;
}
