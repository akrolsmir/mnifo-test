import { getEntry } from '@/lib/fauna'

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const entry = await getEntry(req.query.name)

      res.json(entry)
    },
  }

  if (!handlers[req.method]) {
    return res.status(405).end()
  }

  await handlers[req.method]()
}
