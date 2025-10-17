import { useConnections } from '@/hooks/network/useConnections'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export function Connections() {
  const { user, loading } = useCurrentUser()

  const { data, isLoading } = useConnections(user)

  if (isLoading) return <p>Loading connections...</p>

  return (
    <section className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-3">Your Connections</h2>
      <ul className="space-y-2">
        {data?.map((conn: any) => {
          const user =
            conn.userA?.id === conn.userB?.id
              ? null
              : (conn.userA ?? conn.userB)
          return (
            <li key={conn.id} className="flex justify-between items-center">
              <span>{user?.fullName ?? 'Unknown'}</span>
              <button className="px-3 py-1 bg-gray-100 rounded">Message</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
