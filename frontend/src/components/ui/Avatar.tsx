interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <img
      src={src || "https://avatars.githubusercontent.com/u/8942758?v=4"}
      alt={alt || "avatar"}
      className={`${sizes[size]} rounded-full object-cover bg-gray-200`}
    />
  );
}
