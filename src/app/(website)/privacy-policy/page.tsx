import React from "react";
import {
  Eye,
  ShieldCheck,
  Database,
  HelpCircle,
  Lock,
  Globe,
  RefreshCw,
  Mail,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-20 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      {/* Hero Header Section */}
      <div className=" bg-white py-12 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Eye className="h-3.5 w-3.5" />
            Your Privacy Matters
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Learn how we collect, use, and safeguard your personal information.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium">Effective Date:</span> March 16, 2026
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:py-16">
        <div className="space-y-10 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800/60 dark:bg-slate-900">
          {/* 1. Introduction */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                1. Introduction
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Act on Climate
              </span>{" "}
              (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
              respects your privacy. This Privacy Policy explains how we
              collect, use, and protect your personal information when you use{" "}
              <a
                href="https://actonclimate.co"
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                actonclimate.co
              </a>
              .
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 2. Information We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Database className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                2. Information We Collect
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              We may collect the following types of information:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800/40 dark:bg-slate-900/40">
                <h3 className="font-medium text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    a
                  </span>
                  Provided Directly By You
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4">
                  <li>
                    Name and email address (e.g., when subscribing to
                    newsletters or contacting us)
                  </li>
                  <li>Messages or feedback you submit</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800/40 dark:bg-slate-900/40">
                <h3 className="font-medium text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    b
                  </span>
                  Collected Automatically
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4">
                  <li>IP address and referring website</li>
                  <li>Browser type and device information</li>
                  <li>Pages visited and time spent on the Site</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              We may use cookies and similar tracking technologies to support
              site functionality and analytics.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 3. How We Use Your Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                3. How We Use Your Information
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              We use collected information to:
            </p>
            <ul className="grid gap-2.5 pl-2 text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {[
                "Provide and maintain the Site",
                "Improve user experience and site performance",
                "Respond to inquiries or requests",
                "Send updates or newsletters (if you opt in)",
                "Analyze usage trends",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 4. Cookies and Tracking Technologies */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Eye className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                4. Cookies and Tracking Technologies
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              We use cookies to enable basic site functionality, understand how
              users interact with the Site, and improve overall content and
              performance. You can disable cookies through your browser
              settings, though some features may not function properly.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 5. Sharing of Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Globe className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                5. Sharing of Information
              </h2>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 text-emerald-900 dark:border-emerald-900/20 dark:bg-emerald-950/20 dark:text-emerald-300">
              <p className="font-semibold text-sm">Our Commitment:</p>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                We do not sell your personal information.
              </p>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300 pt-1">
              We may share information only with service providers (e.g.,
              hosting, analytics, email services), legal authorities if strictly
              required by law, or third parties in connection with a business
              transfer like a merger or acquisition.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 6 & 7. Retention & Security */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-5 dark:border-slate-800/60 dark:bg-slate-900/40">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <Database className="h-4 w-4 text-slate-400" />
                6. Data Retention
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                We retain personal information only as long as necessary for the
                purposes described in this policy or as required by applicable
                law.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-5 dark:border-slate-800/60 dark:bg-slate-900/40">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <Lock className="h-4 w-4 text-slate-400" />
                7. Security
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                We take reasonable administrative and technical measures to
                protect your info. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 8. Your Rights */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                8. Your Rights
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Depending on your location, you may have rights to access your
              personal data, request correction or deletion, withdraw consent
              for communications, or request information about how your data is
              used.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 9 & 10. International & Third Party */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <Globe className="h-4 w-4 text-slate-400" />
                9. International Users
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                If you access the Site from outside Canada, your information may
                be transferred and processed in Canada or other jurisdictions.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <ExternalLink className="h-4 w-4 text-slate-400" />
                10. Third-Party Services
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                We may use third-party analytics or email tools. These services
                collect information according to their own dynamic privacy
                policies.
              </p>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 11. Changes to This Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <RefreshCw className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                11. Changes to This Policy
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised effective date.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 12. Contact */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Mail className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                12. Contact
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              If you have any questions or concern about this Privacy Policy,
              please feel free to reach out to us:
            </p>
            <div className="mt-2 inline-flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <a
                href="mailto:info@actonclimate.net"
                className="font-semibold hover:underline"
              >
                info@actonclimate.net
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
