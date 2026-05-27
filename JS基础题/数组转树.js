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

function arrayToTree(arr) {
    // 解题思路: 两遍遍历
    // 第一遍：先用 Map 把所有节点存起来，方便通过 id 快速找人
    // 第二遍：根据 pid 找父节点，找到就放进父节点 children，找不到就是根节点

    // 1. 初始化
    // 用 Map 保存每一个节点: key 是 id，value 是节点对象
    const map = new Map();  
    const roots = [];  // 保存最终的根节点

    // 2. 第一遍遍历: 先把每一项都放进 map
    arr.forEach((item) => {
        map.set(item.id, {
            ...item, 
            children: []  // 给每个节点加一个 children 属性，用于保存子节点
        });
    });

    // 3. 第二遍遍历: 找到父节点，并把子节点放进父节点的 children
    arr.forEach((item) => {
        // 获取当前节点
        const curNode = map.get(item.id);

        // 获取当前节点的父节点
        const parentNode = map.get(item.pid);

        //  如果存在父节点
        if(parentNode) {
            // 把 当前节点 放进父节点的 children 里
            parentNode.children.push(curNode);
        } else {
            // 如果不存在父节点(为根节点)，则把当前节点放进 roots
            roots.push(curNode);
        }
    })

    // 4. 返回结果
    return roots;
}
