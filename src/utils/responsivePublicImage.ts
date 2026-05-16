import manifest from '@/generated/public-image-manifest.json'

export type ResponsivePictureMeta =
  | {
      kind: 'responsive'
      webpSrcset: string
      fallbackSrc: string
    }
  | {
      kind: 'passthrough'
      imgSrc: string
    }

type ManifestEntry = {
  webpSrcset?: string
  fallback?: string
}

function getManifestEntry(baseName: string): ManifestEntry | undefined {
  const map = manifest as Record<string, ManifestEntry>
  return map[baseName]
}

/**
 * 将 `/images/foo.png` 映射到 `optimize:images` 生成的 WebP srcset + JPEG 回退。
 * 若清单中无条目（尚未运行脚本），则退回原始路径单图加载。
 */
export function getResponsivePublicImage(publicPath: string): ResponsivePictureMeta {
  const m = publicPath.match(/^\/images\/([^/]+)\.(png|jpe?g)$/i)
  if (!m || !m[1]) {
    return { kind: 'passthrough', imgSrc: publicPath }
  }

  const baseName = m[1]
  const entry = getManifestEntry(baseName)
  if (!entry?.webpSrcset || !entry?.fallback) {
    return { kind: 'passthrough', imgSrc: publicPath }
  }

  return {
    kind: 'responsive',
    webpSrcset: entry.webpSrcset,
    fallbackSrc: entry.fallback,
  }
}
