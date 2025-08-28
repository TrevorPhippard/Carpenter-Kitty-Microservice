import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { useRouter as useTanstackRouter } from "@tanstack/react-router";
import { authClient } from "./client";
import { queryClient } from "../query/client"; // your react-query client

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useTanstackRouter();

  const navigate = (href: string) => {
    router.navigate({ to: href });
  };

  const replace = (href: string) =>
    router.navigate({ to: href, replace: true });

  const LinkWrapper: React.FC<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }> = ({ href, children, className, ...props }) => (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );

  return (
    <AuthQueryProvider>
      <AuthUIProviderTanstack
        authClient={authClient}
        navigate={navigate}
        replace={replace}
        persistClient={false}
        onSessionChange={() => {
          queryClient.invalidateQueries(); // refresh all queries
        }}
        Link={LinkWrapper}
      >
        {children}
      </AuthUIProviderTanstack>
    </AuthQueryProvider>
  );
}
