# 每日自动推送（autoPushing）

每天在 `autoPushing/<日期>/` 下生成 5 个 `.js` 文件，每个文件**单独 commit + push**（共 5 次推送）。

## 它是怎么跑的

| 入口 | 触发时机 | 说明 |
| --- | --- | --- |
| 本机 launchd | 开机/登录后约 10 分钟，之后每小时兜底 | `~/Library/LaunchAgents/com.zhangao.leetcode-autopush.plist` |
| GitHub Actions | 每天 09:30（Asia/Shanghai） | `.github/workflows/auto-push.yml` |

两边跑的是同一个脚本 `autoPushing/auto-push.sh`，并且都用「今天的日期文件夹是否已经存在」去重，
所以**每天最多只有 5 次推送**，不会重复。哪边先跑成算哪边：电脑没开机就由云端跑，云端跑过本机就跳过。

## 生成的文件长这样

```
autoPushing/2026-11-12/01.js   // auto push 2026-11-12 #1
autoPushing/2026-11-12/02.js   const autoPush_20261112_01 = 1;
...
autoPushing/2026-11-12/05.js
```

## 手动执行

```bash
cd "/Users/zhangao/Desktop/前端学习/Leetcode"

bash autoPushing/auto-push.sh              # 正常跑（今天已完成会直接跳过）
bash autoPushing/auto-push.sh --dry-run    # 只看会做什么，不提交、不推送
bash autoPushing/auto-push.sh --force      # 忽略“今天已完成”，再推 5 次
```

## 查看日志

```bash
tail -f ~/Library/Logs/leetcode-autopush.log
```

## 临时停用本机任务

```bash
launchctl bootout gui/$(id -u)/com.zhangao.leetcode-autopush
```

## 重新启用本机任务

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.zhangao.leetcode-autopush.plist
```

## 修改数量 / 时间

- 数量：改 `autoPushing/auto-push.sh` 里的 `COUNT=5`。
- 开机等待时长：改 `BOOT_WAIT_SECONDS`（默认 600 秒 = 10 分钟）。
- 云端时间：改 `.github/workflows/auto-push.yml` 里的 cron（**UTC 时间**）。
- 本机每小时兜底频率：改 plist 里的 `StartInterval`（秒）。

## 备注

- 脚本只 `git add` 自己新建的那 5 个文件，不会提交你其它未提交的改动。
- 如果当天推送失败（比如断网），本地提交会保留，下一个整点会自动补推。
- 云端用的是仓库自带的 `GITHUB_TOKEN`（workflow 里已声明 `contents: write`）。
  如果希望提交在 GitHub 上明确算作你的 contribution，可在 Settings → Actions → General
  确认 Workflow permissions 为 “Read and write permissions”。

## 本机任务需要的系统权限（一次性）

macOS 的「桌面文件夹保护」会拦截后台进程读写 `~/Desktop`，表现为日志里出现
`/bin/bash: ... Operation not permitted`。解决办法是给 bash 开启「完全磁盘访问权限」：

1. 系统设置 → 隐私与安全性 → **完全磁盘访问权限**
2. 把 `bash` 打开（如果没有：Finder → `Cmd+Shift+G` → 输入 `/bin` → 把 `bash` 拖进列表）
3. 开关置为蓝色即可，不需要重启

> 如果换了电脑或重置了权限，重复上面步骤即可。
