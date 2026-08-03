'use client'

import { useState, useEffect } from 'react';

type Comment = {
    id: number | string;
    content: string;
}

export default function ClientFetch() {
    const [comments, setComments] = useState<Comment[]>([]);

    // 客户端 Fetch 请求: 获取评论列表(fetch 缓存配置: force-cache)
    async function getPeoducts() {
        const res = await fetch('https://dummyjson.com/products', {
            // 尽量缓存，适合很少变化
            cache: 'force-cache',
        }) 
        return res.json();
    }
    // 客户端 Fetch 请求: 获取评论列表(fetch 缓存配置: no-store)
    async function getStockPrice(){
        const res = await fetch('/api/stock-price', {
            cache: 'no-store',
        });
        return res.json();
    }

    // 客户端 Fetch 请求: 获取评论列表(fetch 缓存配置: revalidate缓存时间)
    async function getComment(){
        const res = await fetch('https://dummyjson.com/products/${id}', {
            next: {
                revalidate: 60,
            }
        });
        
        return res.json();
    }

    useEffect(()=> {
        async function loadComments() {
            // 客户端 Fetch 请求: 获取评论列表
            const res = await fetch('/api/comments');
            const data = await res.json();

            setComments(data);
        }
        loadComments();
    }, [])

    return (
        <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    )
}