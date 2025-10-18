import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { GalleryVerticalEnd, LoaderCircle } from 'lucide-react'
// import { toast } from 'sonner'
// import { SignInSocialButton } from '@/components/sign-in-social-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authClient from '@/lib/auth-client'
// import authClient from '@/lib/auth/auth-client'
// import { authQueryOptions } from '@/lib/auth/queries'

export const Route = createFileRoute('/(auth-pages)/signup')({
  component: SignupForm,
})

function SignupForm() {
  const { redirectUrl } = Route.useRouteContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: async (data: {
      name: string
      email: string
      password: string
    }) => {
      await authClient.signUp.email(
        {
          ...data,
          callbackURL: redirectUrl,
        },
        {
          onError: ({ error }) => {
            toast.error(error.message || 'An error occurred while signing up.')
          },
          onSuccess: () => {
            queryClient.removeQueries({ queryKey: authQueryOptions().queryKey })
            navigate({ to: redirectUrl })
          },
        },
      )
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isPending) return

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (!name || !email || !password || !confirmPassword) return

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    signupMutate({ name, email, password })
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                readOnly={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                readOnly={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                readOnly={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                readOnly={isPending}
                required
              />
            </div>
            <Button
              type="submit"
              className="mt-2 w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending && <LoaderCircle className="animate-spin" />}
              {isPending ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2"></div>
        </div>
      </form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}
