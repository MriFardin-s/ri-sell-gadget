export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase border-b border-neutral-200 dark:border-neutral-800 pb-4">
              Get In Touch
            </h1>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have questions regarding system administration, full-stack integrations, or special technical requirements? Drop us a line and our dedicated desk team will resolve your queries.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <span className="text-[#d9a066] font-bold">@</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-neutral-400">Email Address</h4>
                  <p className="text-sm font-semibold">fkfardin900@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <span className="text-[#d9a066] font-bold">#</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-neutral-400">Office Desk Hours</h4>
                  <p className="text-sm font-semibold">Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold uppercase mb-4 tracking-tight text-neutral-900 dark:text-white">
              Send a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-[#d9a066] dark:focus:border-[#d9a066] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-[#d9a066] dark:focus:border-[#d9a066] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-[#d9a066] dark:focus:border-[#d9a066] transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 shadow-sm transition rounded "
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}