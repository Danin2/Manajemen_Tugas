// ============================================
// STAT CARD COMPONENT - MINIMALIST UI
// Card untuk menampilkan statistik simple & bold
// ============================================

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string;
  color?: string; // Kept for API compatibility but used for accents only
}

export default function StatCard({
  title,
  value,
  icon = "📊",
  color = "blue"
}: StatCardProps) {

  return (
    <div
      className="
        border-2 border-black dark:border-white 
        p-6 
        bg-white dark:bg-gray-950 
        relative
        group
        transition-transform hover:-translate-y-1
      "
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-black text-black dark:text-white uppercase tracking-widest">
          {title}
        </h3>
        <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">
          {icon}
        </span>
      </div>

      <p className="text-5xl font-black text-black dark:text-white tracking-tighter">
        {value}
      </p>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-black dark:bg-white clip-path-triangle"></div>
    </div>
  );
}