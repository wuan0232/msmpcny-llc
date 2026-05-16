/**
 * 将 public/images 下的 PNG/JPEG 压成多档 WebP，并生成 JPEG 回退图与 srcset 清单。
 *
 * 用法：npm run optimize:images
 * 生成物：public/images/*-{宽度}.webp、*-fallback.jpg、src/generated/public-image-manifest.json
 *
 * 依赖：sharp（devDependency）
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const IMAGES_DIR = path.join(ROOT, 'public', 'images')
const MANIFEST_OUT = path.join(ROOT, 'src', 'generated', 'public-image-manifest.json')

/** 目标宽度档；超过原图宽度时会自动缩小档位（不放大） */
const TARGET_WIDTHS = [480, 800, 1200, 1920]

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function optimizeOne(filePath, baseName) {
  const metadata = await sharp(filePath).metadata()
  const origW = metadata.width ?? 1920

  /** @type {Map<number, string>} 实际像素宽 -> public URL */
  const byWidth = new Map()

  for (const targetW of TARGET_WIDTHS) {
    const pipeline = sharp(filePath).resize({
      width: targetW,
      withoutEnlargement: true,
    })

    const { data, info } = await pipeline.webp({ quality: 82, effort: 6 }).toBuffer({
      resolveWithObject: true,
    })

    const w = info.width
    if (byWidth.has(w)) continue

    const filename = `${baseName}-${w}.webp`
    const outAbs = path.join(IMAGES_DIR, filename)
    await fs.writeFile(outAbs, data)
    byWidth.set(w, `/images/${filename}`)
    console.log('webp', filename, `(${w}px)`)
  }

  const sortedWidths = [...byWidth.keys()].sort((a, b) => a - b)
  const webpSrcset = sortedWidths.map((w) => `${byWidth.get(w)} ${w}w`).join(', ')

  const maxFallbackW = Math.min(1920, origW)
  const fallbackName = `${baseName}-fallback.jpg`
  const fallbackAbs = path.join(IMAGES_DIR, fallbackName)

  await sharp(filePath)
    .resize({ width: maxFallbackW, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(fallbackAbs)

  console.log('jpeg fallback', fallbackName)

  return {
    webpSrcset,
    fallback: `/images/${fallbackName}`,
  }
}

async function main() {
  if (!(await fileExists(IMAGES_DIR))) {
    console.error('Missing directory:', IMAGES_DIR)
    process.exit(1)
  }

  const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true })
  const manifest = {}

  for (const ent of entries) {
    if (!ent.isFile()) continue
    const ext = path.extname(ent.name).toLowerCase()
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue
    // 跳过已生成的产物
    if (/-\d+\.webp$/i.test(ent.name) || /-fallback\.jpg$/i.test(ent.name)) continue

    const baseName = path.basename(ent.name, ext)
    const abs = path.join(IMAGES_DIR, ent.name)

    console.log('\n→', ent.name)
    manifest[baseName] = await optimizeOne(abs, baseName)
  }

  await fs.mkdir(path.dirname(MANIFEST_OUT), { recursive: true })
  await fs.writeFile(MANIFEST_OUT, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  console.log('\nWrote manifest:', path.relative(ROOT, MANIFEST_OUT))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
