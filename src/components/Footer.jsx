import { socialLinks } from "../data/siteData";

function SocialIcon({ label }) {
  switch (label) {
    case "Facebook":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM0 8h5v13H0zM7 8h4.8v1.8h.1c.7-1.2 2.4-2.5 4.9-2.5C22 7.3 24 9.7 24 14.1V21H19v-6.1c0-1.5-.1-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21H7z" />
        </svg>
      );
    case "X":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.348-6.993L3.707 22H1l7.017-8.019L2 2h7l4.835 6.37L18.244 2Zm-1.196 18h1.497L7.137 3.896H5.53L17.048 20Z" />
        </svg>
      );
    default:
      return null;
  }
}

function Footer() {
  return (
    <footer className="border-t border-slate-900 py-12 text-center">
      <p className="text-slate-500">
        &copy; 2026 Alpha Yohanna. All rights reserved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black transition hover:opacity-90"
            aria-label={item.label}
          >
            <SocialIcon label={item.label} />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
