"use client";

const ArrowButton = ({
    size = 30,
    padding = 6,
    borderColor = "border-white",
    arrowColor = "text-white",
}) => {
    return (
        <button
            style={{ width: 40, height: 40, padding:12 }}
            className="relative flex items-center justify-center"
        >
            {/* Arrow */}
            <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M18.2451 0C18.5209 0.000322986 18.745 0.224176 18.7451 0.5V18.2451C18.7451 18.3964 18.6756 18.5304 18.5693 18.6221C18.4818 18.7679 18.3241 18.8672 18.1416 18.8672L0.5 18.8613C0.223858 18.8612 -8.61485e-05 18.6375 0 18.3613C0.000222402 18.0853 0.223976 17.8613 0.5 17.8613L17.1436 17.8662L1.60059 1.61621C1.40987 1.41669 1.41681 1.10101 1.61621 0.910156C1.81576 0.71928 2.13237 0.726229 2.32324 0.925781L17.7451 17.0479V0.5C17.7453 0.223977 17.9691 5.38305e-07 18.2451 0Z" />
            </svg>

            <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l`} />
            <span className={`absolute top-0 right-0 w-3 h-3 border-t border-r`} />
            <span className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l`} />
            <span className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r`} />
        </button>
    );
};

export default ArrowButton;
