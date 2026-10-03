export default function LoadingScreen() {
  return (
    <div
      className="
        fixed inset-0 z-[999999]
        flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-white
        dark:bg-gray-950
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brand-500/[0.05]
          blur-3xl
          motion-safe:animate-[ambient_4s_ease-in-out_infinite]
          dark:bg-brand-500/[0.08]
        "
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Logo */}
        <div
          className="
            motion-safe:animate-[logoReveal_900ms_cubic-bezier(0.16,1,0.3,1)_forwards]
            opacity-0
          "
        >
          {/* Light */}
          <img
            src="/images/logo/logo.svg"
            alt="Logo"
            className="
              h-22
              w-auto
              object-contain
              dark:hidden
            "
          />

          {/* Dark */}
          <img
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            className="
              hidden
              h-22
              w-auto
              object-contain
              dark:block
            "
          />
        </div>

        {/* Company */}
        <p
          className="
            mt-7
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-brand-500
            motion-safe:animate-[fadeUp_600ms_ease-out_350ms_forwards]
            opacity-0
          "
        >
          Preparing Your Workspace
        </p>

        {/* Progress */}
        <div
          className="
            mt-9
            h-px
            w-44
            overflow-hidden
            bg-gray-100
            motion-safe:animate-[fadeUp_500ms_ease-out_850ms_forwards]
            opacity-0
            dark:bg-white/[0.08]
          "
        >
          <div
            className="
              h-full
              w-10
              bg-brand-500
              motion-safe:animate-[loading_1.4s_ease-in-out_1.1s_infinite]
            "
          />
        </div>
      </div>

      <style>{`
        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: blur(8px);
          }

          60% {
            opacity: 1;
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ambient {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.6;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 1;
          }
        }

        @keyframes loading {
          0% {
            transform: translateX(-150%);
          }

          100% {
            transform: translateX(500%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
