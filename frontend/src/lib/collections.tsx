import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, useLiveQuery } from '@tanstack/react-db'

import {
  commentsCollection,
  db,
  postsCollection,
  queryClient,
  usersCollection,
} from './db'
import type { Post } from '@/types/post'

export function setupQueryCollections() {
  // Query option to load server posts
  queryClient.setDefaultOptions({ queries: { refetchOnWindowFocus: false } })

  // Use queryCollectionOptions to tie a query to populating the collection
  const postsLoader = queryCollectionOptions({
    key: ['posts', 'server'],
    fetcher: async () => {
      const res = await fetch('http://localhost:4000/api/posts')
      if (!res.ok) throw new Error('Failed to load posts')
      const data: Array<Post> = await res.json()
      return data
    },
    onSuccess: (data) => {
      // insert into the collection transactionally
      db.mutate((tx) => {
        // upsert users, posts, comments
        data.forEach((p) => {
          if (p.user) tx.insert(usersCollection, p.user)
          tx.insert(postsCollection, {
            ...p,
            // ensure comments array property exists
            comments: p.comments ?? [],
          })
          if (p.comments) {
            p.comments.forEach((c) => {
              tx.insert(commentsCollection, c)
            })
          }
        })
      })
    },
  })

  return { postsLoader }
}
