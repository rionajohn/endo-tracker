export default function CommunityScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-periwinkle/30 flex items-center justify-center">
        <svg className="w-8 h-8 text-periwinkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      </div>
      <h2 className="text-lg font-extrabold text-ink">Community</h2>
      <p className="text-sm text-stone-400 leading-relaxed">
        Coming soon — connect with others who understand.
      </p>
    </div>
  )
}
