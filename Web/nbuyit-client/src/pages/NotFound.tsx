import { Link } from "react-router";

function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#093f87] to-blue-300 flex flex-col items-center justify-center p-4">
            <div className="relative mb-8">
                <span className="text-[180px] md:text-[240px] font-bold text-white opacity-10 animate-pulse">
                    404
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center animate-slide-in">
                Oops! Lost in Space?
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 text-center max-w-2xl animate-fade-in">
                Unfortunately, there are not any good offers here.
                Did you try the main page?
            </p>

            <Link
                to="/"
                className="px-8 py-3 bg-white text-[#093f87] rounded-xl font-semibold 
                hover:bg-opacity-90 transition-all transform hover:scale-105 
                shadow-lg animate-bounce-in"
            >
                Return to Home
            </Link>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default NotFound;