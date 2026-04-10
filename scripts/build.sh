#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT="$ROOT/dist/output"
OUTPUT_RESOURCE="$ROOT/dist/output_resource"
OUTPUT_STATIC="$ROOT/dist/output_static"

# 映射平台环境变量到 preset 期望的变量名
export CLIENT_BASE_PATH="${MCLAW_APP_ID:+/app/$MCLAW_APP_ID}"
export ASSETS_CDN_PATH="${MCLAW_CDN_DOMAIN:-/}"
export NODE_ENV="${NODE_ENV:-production}"

# 清理
rm -rf "$ROOT/dist"

# 1. Vite 构建 → dist/client/（相对于项目根目录输出）
npx vite build --outDir "$ROOT/dist/client" --emptyOutDir

# 2. HTML → dist/output/
mkdir -p "$OUTPUT"
find "$ROOT/dist/client" -maxdepth 1 -name '*.html' -exec cp {} "$OUTPUT/" \;

# 生成 routes.json
echo '{ "version": 1, "type": "vite-react", "fallback": "index.html" }' > "$OUTPUT/routes.json"

# 3. assets/ → dist/output_resource/（JS/CSS/字体，上传到 CDN）
if [ -d "$ROOT/dist/client/assets" ]; then
  mkdir -p "$OUTPUT_RESOURCE"
  cp -r "$ROOT/dist/client/assets" "$OUTPUT_RESOURCE/"
fi

# 4. 私有静态资源 → dist/output_static/（排除代码文件）
if [ -d "$ROOT/shared/static" ]; then
  mkdir -p "$OUTPUT_STATIC"
  rsync -a --exclude='*.ts' --exclude='*.tsx' --exclude='*.js' --exclude='*.jsx' "$ROOT/shared/static/" "$OUTPUT_STATIC/"
fi

# 清理中间产物
rm -rf "$ROOT/dist/client"

echo "Build complete"
echo "  HTML     → dist/output/"
[ -d "$OUTPUT_RESOURCE" ] && echo "  Resource → dist/output_resource/" || true
[ -d "$OUTPUT_STATIC" ] && echo "  Static   → dist/output_static/" || true
