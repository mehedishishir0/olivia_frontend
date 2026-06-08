import React from "react";
import {
  Shield,
  Info,
  Scale,
  Globe,
  Copyright,
  AlertTriangle,
  FileText,
  Calendar,
} from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen my-20 bg-slate-50/50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      {/* Hero Header Section */}
      <div className=" bg-white py-12 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Shield className="h-3.5 w-3.5" />
            Legal Agreement
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Please read these terms carefully before using our platform.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium">Effective Date:</span> March 16, 2026
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto container  px-4 py-12 sm:px-6 lg:py-16">
        <div className="space-y-10 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800/60 dark:bg-slate-900">
          {/* 1. Overview */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                1. Overview
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Welcome to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Act on Climate
              </span>{" "}
              (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By
              accessing or using{" "}
              <a
                href="https://actonclimate.co"
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                actonclimate.co
              </a>{" "}
              (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of
              Service (&ldquo;Terms&rdquo;). If you do not agree, you may not
              use the Site.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 2. Purpose of the Site */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                2. Purpose of the Site
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Act on Climate provides informational content, tools, and
              resources intended to help individuals and communities understand
              and take action on climate-related issues.
            </p>
            <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-4 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-300">
              <p className="font-medium">Important Notice:</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                The Site is for informational and educational purposes only and
                does not constitute professional, legal, financial, or
                environmental consulting advice.
              </p>
            </div>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 3. Eligibility */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Scale className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                3. Eligibility
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              By using the Site, you confirm that you are at least the age of
              majority in your jurisdiction or have permission from a parent or
              legal guardian.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 4. Use of the Site */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Globe className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                4. Use of the Site
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              You agree to use the Site only for lawful purposes and in a way
              that does not:
            </p>
            <ul className="grid gap-2.5 pl-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Violate any applicable laws or regulations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Infringe on the rights of others</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Disrupt or damage the Site or its functionality</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  Attempt to gain unauthorized access to any systems or data
                </span>
              </li>
            </ul>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 5. Intellectual Property */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Copyright className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                5. Intellectual Property
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              All content on the Site, including text, graphics, logos, and
              design elements, is owned by or licensed to Act on Climate and is
              protected by applicable intellectual property laws. You may not
              reproduce, distribute, or modify content without prior written
              consent.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 6. User Content */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Shield className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                6. User Content
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              If you submit content (such as comments, feedback, or
              contributions), you grant us a non-exclusive, worldwide,
              royalty-free license to use, display, and distribute such content
              in connection with the Site.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              You are responsible for ensuring your content does not violate any
              laws or third-party rights.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 7. Third-Party Links */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Globe className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                7. Third-Party Links
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              The Site may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of any
              third-party sites.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 8 & 9. Disclaimers & Liability */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-5 dark:border-slate-800/60 dark:bg-slate-900/40">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <AlertTriangle className="h-4 w-4 text-slate-400" />
                8. Disclaimer of Warranties
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; basis. We make no warranties regarding
                accuracy, reliability, or availability of the Site.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-5 dark:border-slate-800/60 dark:bg-slate-900/40">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <Scale className="h-4 w-4 text-slate-400" />
                9. Limitation of Liability
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                To the maximum extent permitted by law, Act on Climate shall not
                be liable for any indirect, incidental, or consequential damages
                arising from your use of the Site.
              </p>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 10. Changes to the Terms */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                10. Changes to the Terms
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              We may update these Terms at any time. Continued use of the Site
              after changes are posted constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800/60" />

          {/* 11. Governing Law */}
          <section className="group space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Scale className="h-4 w-4" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                11. Governing Law
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              These Terms are governed by the laws of{" "}
              <span className="font-medium text-slate-900 dark:text-white">
                Ontario, Canada
              </span>
              , without regard to conflict of law principles.
            </p>
          </section>
        </div>

        {/* Footer Contact Info Note */}
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          If you have any questions about these Terms, please contact us at
          info@actonclimate.net
        </p>
      </div>
    </div>
  );
}
