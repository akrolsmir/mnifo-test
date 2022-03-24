import { getEntry } from '@/lib/fauna'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// TODO: use middleware instead ala https://github.com/vercel/examples/tree/main/edge-functions/redirects-upstash
export async function getStaticProps({ params }) {
  const e = await getEntry(params.slug)
  return {
    props: {
      entry: e.entry,
    },
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export default function Slug({ entry }) {
  console.log('entry', entry)
  const router = useRouter()
  const name = router.query.slug

  // useEffect means that router will only be run client-side
  useEffect(() => {
    if (router && entry) {
      const link = entry.message
      console.log('ready', router, entry, link)

      // Use router to move to the new page
      router.push(link)
      return null
    }
  }, [router, entry])

  return (
    <div>
      <p>{name}</p>
    </div>
  )
}
