export default function ProfileScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-sage/30 flex items-center justify-center">
        <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <h2 className="text-lg font-extrabold text-ink">Profile</h2>
      <p className="text-sm text-stone-400 leading-relaxed">
        Coming soon — manage your account and preferences.
      </p>
    </div>
  )
}
