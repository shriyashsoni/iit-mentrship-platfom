import Link from "next/link"
import { ArrowLeft, FileText, UserCheck, CreditCard, AlertTriangle, BookOpen, Scale, Shield } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <Scale className="h-8 w-8 mr-3 text-blue-500" />
            <h1 className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-400">Effective Date: June 8, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            By accessing or using the Apna Counsellor website and services, you agree to be bound by the following terms
            and conditions:
          </p>

          <div className="space-y-12">
            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">1. User Agreement</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>By registering or using our platform, you confirm that:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>You are at least 13 years old or have parental permission.</li>
                  <li>The information you provide is accurate and updated.</li>
                  <li>
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">2. Service Scope</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>We offer:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Educational mentorship by IIT mentors</li>
                  <li>JEE/NEET/JoSAA test series</li>
                  <li>Webinars, support, and career guidance</li>
                  <li>Paid subscription plans</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p>
                <p>
                  Authentication services, including Google Sign-In, are provided to verify your identity and secure
                  your account.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">3. Payments</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>Payments once made for services (mentorship, test series, etc.) are non-refundable.</p>
                <p>Subscriptions may auto-renew (you'll be notified in advance).</p>
                <p>All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</p>
                <p>
                  We use secure payment processors and do not store your complete payment information on our servers.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">4. Code of Conduct</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>Users must not:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Share false information or impersonate someone else.</li>
                  <li>Harass or disrespect mentors or other students.</li>
                  <li>Share paid content outside the platform.</li>
                  <li>Attempt to gain unauthorized access to other user accounts or platform systems.</li>
                  <li>Use the platform for any illegal or unauthorized purpose.</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  All content, including mentorship plans, test papers, and materials, are copyrighted by Apna
                  Counsellor. You may not reuse, resell, or distribute them without permission.
                </p>
                <p>
                  The Apna Counsellor name, logo, and all related names, logos, product and service names, designs, and
                  slogans are trademarks of Apna Counsellor or its affiliates.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  Apna Counsellor is not liable for academic performance outcomes. We provide tools, not guaranteed
                  results.
                </p>
                <p>
                  We strive to provide accurate information, but we do not warrant that the content will be error-free
                  or uninterrupted.
                </p>
                <p>
                  We are not responsible for any unauthorized access to your account if you fail to safeguard your login
                  credentials.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
                <h2 className="text-2xl font-bold">7. Termination</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>We reserve the right to ban, suspend, or restrict users who violate these terms.</p>
                <p>
                  You may terminate your account at any time by contacting us, but this will not entitle you to any
                  refund for unused portions of paid services.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">8. Dispute Resolution</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>Any legal disputes will be handled under the jurisdiction of Mumbai, Maharashtra courts.</p>
                <p>
                  Before pursuing legal action, we encourage users to contact our support team to resolve any issues
                  amicably.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="ml-9 space-y-2">
                <p>
                  <strong className="text-blue-400">Email:</strong> apnacounsellor@gmail.com
                </p>
                <p>
                  <strong className="text-blue-400">Phone:</strong> +91 9109881906
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
