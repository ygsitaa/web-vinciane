export const useAsset = () => {
  const config = useRuntimeConfig()
  const baseURL = config.app?.baseURL ?? '/'

  const trim = (value: string) => value.replace(/^\s+|\s+$/g, '')
  const normalizeBaseURL = (url: string) => {
    const trimmed = trim(url).replace(/\/+$|^\/+/, '')
    if (!trimmed) {
      return ''
    }
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  }
  const normalizePath = (path: string) => trim(path).replace(/^\/+/, '')

  const asset = (path: string) => {
    if (!path) {
      return path
    }

    const normalizedPath = normalizePath(path)
    const normalizedBase = normalizeBaseURL(baseURL)

    if (!normalizedPath) {
      return normalizedBase || '/'
    }

    return normalizedBase ? `${normalizedBase}/${normalizedPath}` : `/${normalizedPath}`
  }

  return { asset }
}
