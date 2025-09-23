import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavItem({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md",
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
