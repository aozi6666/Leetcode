/*
原生 Ajax 技术思想: 
    用 JS 在不刷新页面的情况下，异步 向服务器发送请求，并拿到数据

XMLHttpRequest： 浏览器最早提供的一个原生请求API
fetch：浏览器原生提供的 基于Promise 请求 API
axios：第三方库，把 请求封装 得更好用，更适合业务开发
*/ 


// 原生 XMLHttpRequest

// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 初始化请求,第三个参数 true 表示异步请求
xhr.open('GET', '/api/users', true);

// 3. 监听请求变化
xhr.onreadystatechange = function () {
    // readyState：请求状态, readyState === 4 表示请求完成
    if(xhr.readyState === 4) {
        // status：HTTP 状态码, 2xx请求成功
        if(xhr.status >= 200 && xhr.status < 300){
            // responseText：服务器返回的数据
            console.log(xhr.responseText);
        } else {
            // 请求失败
            console.log('请求失败');
        }
    }
}

// 4. 发送请求 
xhr.send();

// 原生 Ajax: 用 XMLHttpRequest 封装一个方法
// 只能在回调里拿结果，不方便链式调用
function ajax(url){
    // 1. 创建 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();

    // 2. 初始化请求,第三个参数 true 表示异步请求
    xhr.open('GET', url, true);

    // 3.监听请求变化
    xhr.onreadystatechange = function () {
        // readyState：请求状态, readyState === 4 表示请求完成
        if(xhr.readyState === 4) {
            // status：HTTP 状态码, 2xx请求成功
            if(xhr.status >= 200 && xhr.status < 300){
                // responseText：服务器返回的数据
                console.log(xhr.responseText);
            } else {
                console.log('请求失败');
            }
        }
    }

    // 4. 发送请求
    xhr.send();
}

// 使用方法：
ajax("https://jsonplaceholder.typicode.com/posts/1");


// 原生 ajax 封装成 Promise
// GET 请求里，data 会被拼到 URL 后面
// POST请求里 data 会放到请求体 body 里

function ajax(url, method, data){
    // 设置method默认值
   let methodType  = method || 'GET';

    // 统一转成大写，避免 get / post 这种小写影响判断
    methodType  = methodType.toUpperCase();

    // 返回一个Promise
    return new Promise((resolve, reject) => {
        // 1. 创建 XMLHttpRequest 对象
        const xhr = new XMLHttpRequest();

        // GET请求的参数处理: GET 请求里，data 会被拼到 URL 后面
        // 把对象 data 转成 URL 查询参数
        if(methodType === 'GET' && data){
            // 数组，用来存参数
            const query = [];
            // for...in 取属性名
            for(let key in data){
                query.push(
                    // 从  id: 1, 拼出 id=1
                    `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                );
            }
            // 把参数拼到 URL 中
            url += url.indexOf("?") === -1 
                ? "?" + query.join("&") 
                : "&" + query.join("&");
        }

        // 2. 初始化请求
        xhr.open(methodType, url, true);

        // 3.监听请求变化
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        }

        // 监听网络错误
        xhr.onerror = function () {
            reject(new Error('网络错误'));
        }

       // 4. 发送请求 （分为POST/GET）
        if(methodType === 'POST'){
            // 如果是 POST 请求，需要设置请求头
            // application/json: 请求体是 JSON 格式
            xhr.setRequestHeader(
                'Content-Type', 
                'application/json;charset=utf-8' 
            )

            // POST 请求，参数data放在请求体里
            // JSON.stringify()： JS 对象转成 JSON 字符串
            xhr.send(JSON.stringify(data))
        } else {
            // GET 请求，参数已经拼到 url 后面了
            xhr.send();
        }
    })
}

// GET 调用示例
// https://jsonplaceholder.typicode.com/posts/1?id=1&page=2
ajax("https://jsonplaceholder.typicode.com/posts/1", "GET", { id: 1, page: 2 })
  .then(function (res) {
    console.log("成功：", res);
  })
  .catch(function (err) {
    console.log("失败：", err);
  });

// POST 调用示例
ajax("https://jsonplaceholder.typicode.com/posts", "POST", {
    title: "hello",
    body: "world",
    userId: 1
  })
    .then(function (res) {
      console.log("成功：", res);
    })
    .catch(function (err) {
      console.log("失败：", err);
    });
  
