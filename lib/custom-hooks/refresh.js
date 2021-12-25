import { useCallback } from "react"
import { useRouter } from "next/router"

/**
 *
 * @param {Boolean} scrollToTop Wheather to scroll to top after refresh or not default true
 * @returns Custom hook to refresh data after updation
 */
export default function useRefreshData(scrollToTop = true) {
  const router = useRouter()
  return useCallback(() => {
    router.replace(router.asPath, undefined, { scroll: scrollToTop })
  }, [router.asPath])
}
