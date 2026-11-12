#!/bin/bash
#
# auto-push.sh — 每天在 Leetcode 仓库的 autoPushing/<日期>/ 下生成 5 个 .js 文件，
#                并分别 commit + push（5 次独立推送）。
#
# 本机触发：launchd 用户代理
#   ~/Library/LaunchAgents/com.zhangao.leetcode-autopush.plist
#   → 开机/登录后约 10 分钟跑一次；之后每小时兜底检查一次；每天最多跑一轮（按日期去重）。
#
# 云端触发：GitHub Actions
#   .github/workflows/auto-push.yml（每天 09:30 Asia/Shanghai，调用同一个脚本）
#
# 用法：
#   bash auto-push.sh                 # 正常执行（今天已完成则跳过）
#   bash auto-push.sh --force         # 忽略“今天已完成”，强制再推 5 次
#   bash auto-push.sh --dry-run       # 只打印将要做的事，不提交、不推送
#   bash auto-push.sh --no-wait       # 跳过“开机后等 10 分钟”的等待（云端用）
#
# 日志：~/Library/Logs/leetcode-autopush.log

set -uo pipefail
export GIT_TERMINAL_PROMPT=0   # 不要在后台等待账号密码输入

REPO="${LEETCODE_REPO:-/Users/zhangao/Desktop/前端学习/Leetcode}"
BRANCH="${LEETCODE_BRANCH:-main}"
DIR="$REPO/autoPushing"
COUNT=5
BOOT_WAIT_SECONDS=600            # 开机后等待 10 分钟
STATE_DIR="$HOME/Library/Application Support/leetcode-autopush"

DRY_RUN=0
FORCE=0
WAIT_BOOT=1

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --force)   FORCE=1 ;;
    --no-wait) WAIT_BOOT=0 ;;
    *) echo "未知参数: $arg" >&2 ;;
  esac
done

log() { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

TODAY="$(date +%Y-%m-%d)"
STAMP="$(date +%Y%m%d)"
DONE_MARK="$STATE_DIR/done-$TODAY"

# ---------- 0. 快速跳过：本机今天已经跑完 ----------
mkdir -p "$STATE_DIR" 2>/dev/null
if [ "$FORCE" = 0 ] && [ -f "$DONE_MARK" ]; then
  exit 0
fi

# ---------- 1. 开机后等待 10 分钟 ----------
if [ "$WAIT_BOOT" = 1 ] && [ "$DRY_RUN" = 0 ]; then
  BOOT_EPOCH="$(sysctl -n kern.boottime 2>/dev/null | sed -E 's/.*sec = ([0-9]+).*/\1/')"
  if [ -n "$BOOT_EPOCH" ] && [ "$BOOT_EPOCH" -gt 0 ] 2>/dev/null; then
    UPTIME=$(( $(date +%s) - BOOT_EPOCH ))
    if [ "$UPTIME" -lt "$BOOT_WAIT_SECONDS" ]; then
      WAIT=$(( BOOT_WAIT_SECONDS - UPTIME + 3 ))
      log "开机仅 ${UPTIME}s，等待 ${WAIT}s 后再执行"
      sleep "$WAIT"
    fi
  fi
fi

# ---------- 2. 仓库检查 ----------
if [ ! -d "$REPO/.git" ]; then
  log "错误：$REPO 不是 git 仓库，退出"
  exit 1
fi
cd "$REPO" || exit 1

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  log "当前分支是 '$CURRENT_BRANCH'（不是 '$BRANCH'），本次跳过"
  exit 0
fi

# ---------- 3. 同步远端，避免 push 被拒 ----------
if [ "$DRY_RUN" = 0 ]; then
  if git fetch --quiet origin "$BRANCH"; then
    if ! git pull --rebase --autostash --quiet origin "$BRANCH"; then
      log "pull --rebase 失败，本次中止，请手动检查仓库状态"
      git rebase --abort >/dev/null 2>&1
      exit 1
    fi
  else
    log "无法连接远端（可能离线），继续尝试本地提交"
  fi
fi

# ---------- 4. 先补推本地未推送的提交 ----------
if [ "$DRY_RUN" = 0 ]; then
  AHEAD=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 0)
  if [ "${AHEAD:-0}" -gt 0 ]; then
    log "检测到本地有 $AHEAD 个未推送提交，先补推"
    git push --quiet origin "$BRANCH" || log "补推失败，稍后重试"
  fi
fi

# ---------- 5. 今天是否已经做过（本机 / 云端共用同一“日期文件夹”判断）----------
existing_js=0
if [ -d "$DIR/$TODAY" ]; then
  existing_js=$(find "$DIR/$TODAY" -maxdepth 1 -name '*.js' 2>/dev/null | wc -l | tr -d ' ')
fi
existing_js=${existing_js:-0}

if [ "$existing_js" -ge "$COUNT" ] && [ "$FORCE" = 0 ]; then
  log "今天（$TODAY）已有 $existing_js 个文件，跳过"
  [ "$DRY_RUN" = 0 ] && date '+%Y-%m-%d' > "$DONE_MARK"
  exit 0
fi

# ---------- 6. 生成 5 个文件，逐个 commit + push ----------
mkdir -p "$DIR/$TODAY" 2>/dev/null
i=1
while [ "$i" -le "$COUNT" ]; do
  FILE="$DIR/$TODAY/$(printf '%02d' "$i").js"
  idx="$i"
  i=$(( i + 1 ))

  if [ -e "$FILE" ]; then
    log "已存在，跳过：autoPushing/$TODAY/$(basename "$FILE")"
    continue
  fi

  if [ "$DRY_RUN" = 1 ]; then
    log "[dry-run] 将创建并推送：$FILE"
    continue
  fi

  {
    printf '// auto push %s #%d\n' "$TODAY" "$idx"
    printf 'const autoPush_%s_%02d = %d;\n' "$STAMP" "$idx" "$idx"
  } > "$FILE"

  git add -- "$FILE" 2>/dev/null
  if git diff --cached --quiet -- "$FILE" 2>/dev/null; then
    log "内容无变化，跳过 commit：$(basename "$FILE")"
  else
    if git commit --quiet -m "chore(auto): daily push $TODAY #$idx" -- "$FILE"; then
      log "已提交：autoPushing/$TODAY/$(basename "$FILE")"
    else
      log "commit 失败：$(basename "$FILE")，跳过"
      continue
    fi
  fi

  PUSHED=0
  for attempt in 1 2 3; do
    if git push --quiet origin "$BRANCH"; then
      PUSHED=1
      break
    fi
    log "push 失败（第 $attempt 次），同步远端后重试"
    if ! git pull --rebase --autostash --quiet origin "$BRANCH"; then
      git rebase --abort >/dev/null 2>&1
      sleep 5
    fi
  done

  if [ "$PUSHED" = 1 ]; then
    log "已推送：#$idx"
  else
    log "推送失败：本地提交已保留，下次运行会自动补推"
  fi
  sleep 1
done

# ---------- 7. 全部成功才写“今天已完成”标记（失败的话每小时会再补）----------
if [ "$DRY_RUN" = 0 ]; then
  remaining=$(find "$DIR/$TODAY" -maxdepth 1 -name '*.js' 2>/dev/null | wc -l | tr -d ' ')
  ahead=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 1)
  if [ "${remaining:-0}" -ge "$COUNT" ] && [ "${ahead:-1}" = "0" ]; then
    date '+%Y-%m-%d' > "$DONE_MARK"
    log "今天（$TODAY）处理完成：$remaining 个文件全部已推送"
  else
    log "未全部成功（文件 $remaining/$COUNT，未推送提交 ${ahead:-?} 个），稍后自动重试"
  fi
fi

exit 0
