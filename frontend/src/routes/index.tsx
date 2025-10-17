import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user, loading } = useCurrentUser()

  return (
    <div className="min-h-screen ">
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading}
          <Header
            user={user ?? { id: '', fullName: 'Loading...', avatarUrl: '' }}
          />
        </div>
      </section>
    </div>
  )
}
