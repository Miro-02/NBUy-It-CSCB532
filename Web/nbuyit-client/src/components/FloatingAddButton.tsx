import { Link } from "react-router";

export default function FloatingAddButton() {
  return (
    <Link 
      to="/products/add"
      className="fixed bottom-8 right-8 bg-[#093f87] hover:bg-[#082f6a] text-white p-4 rounded-full shadow-lg transition-all duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </Link>
  );
}