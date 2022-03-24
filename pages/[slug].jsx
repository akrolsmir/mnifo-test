import { getEntry } from '@/lib/fauna';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

async function getOneEntry(name) {
  const response = await fetch('/api/entry?name=' + name)
  const data = await response.json()
  return data?.entry
  
}

function useEntry(name) {
  const [entry, setEntry] = useState(null);
  useEffect(() => {
    getOneEntry(name).then(setEntry);
  }, [name])
  return entry;
}

export default function Slug() {
  const router = useRouter();
  const name = router.query.slug
  const entry = useEntry(name);

  if (router && entry) {
    const link = entry.message
    console.log('ready', router, entry, link)

    // Use router to move to the new page
    router.push(link)
    return null
  
  }

  return (<h1>{name}</h1>)
}