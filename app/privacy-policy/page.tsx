import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Share2, UserCheck, Bell, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 mr-3 text-blue-500" />
            <h1 className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-400">Effective Date: June 8, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            At Apna Counsellor, we value your trust and are committed to protecting your personal information. This
            Privacy Policy outlines how we collect, use, store, and safeguard your data when you interact with our
            platform.
          </p>

          <div className="space-y-12">
            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  <strong className="text-blue-400">Personal Information:</strong> Name, email address, phone number,
                  age, city, class, etc.
                </p>
                <p>
                  <strong className="text-blue-400">Payment Information:</strong> We use Razorpay/Stripe to collect and
                  process payments securely. We do not store card or banking information.
                </p>
                <p>
                  <strong className="text-blue-400">Usage Data:</strong> We collect information about your usage (pages
                  visited, sessions attended, resources downloaded).
                </p>
                <p>
                  <strong className="text-blue-400">Mentorship Data:</strong> Test attempts, mentor sessions, feedback
                  forms.
                </p>
                <p>
                  <strong className="text-blue-400">Authentication Data:</strong> When you sign in with Google, we
                  receive basic profile information from your Google account, including your name, email address, and
                  profile picture.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>To provide personalized mentorship and test services.</p>
                <p>To improve our platform based on analytics and feedback.</p>
                <p>To send updates, reminders, and newsletters (you can opt-out anytime).</p>
                <p>For internal training and service improvement.</p>
                <p>To authenticate your identity when you sign in to our platform.</p>
                <p>To maintain your user profile and preferences.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">3. Data Security</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  We implement industry-standard encryption, secure payment gateways, and access control to protect your
                  data.
                </p>
                <p>
                  For authentication, we use Supabase, a secure authentication provider that follows industry best
                  practices for data protection.
                </p>
                <p>
                  All data is transmitted over secure HTTPS connections and stored in encrypted databases with
                  restricted access.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Share2 className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">4. Sharing of Data</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>We never sell or share your data with third parties for marketing purposes.</p>
                <p>We may share limited data with mentors or technical teams for educational service delivery.</p>
                <p>
                  When you use Google Sign-In, we share limited information with Google as necessary to authenticate
                  your account.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">5. Your Rights</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>You can:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Request a copy of your stored data.</li>
                  <li>Request deletion or correction.</li>
                  <li>Opt-out of marketing communications.</li>
                  <li>Disconnect your Google account from our platform at any time.</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Bell className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">6. Children's Privacy</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  Our services are intended for students aged 13 and above. For younger users, parental consent is
                  required.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold">7. Changes to Policy</h2>
              </div>
              <div className="ml-9 space-y-4">
                <p>
                  We may update this policy from time to time. You will be notified of major changes via email or on the
                  website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
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
