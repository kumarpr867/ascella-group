    "use client";

    const ArrowButton = () => {
        return (
            <button
                style={{ width: 40, height: 40, padding: 12 }}
                className="relative flex items-center justify-center"
            >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.2451 18.8672C18.5209 18.8669 18.745 18.643 18.7451 18.3672V0.62207C18.7451 0.470768 18.6756 0.336807 18.5693 0.245117C18.4818 0.0992432 18.3241 -5.72205e-05 18.1416 0L0.5 0.00585938C0.223858 0.00594521 -8.63266e-05 0.229717 0 0.505859C0.000222596 0.78186 0.223977 1.00591 0.5 1.00586L17.1436 1.00098L1.60059 17.251C1.40987 17.4505 1.41681 17.7662 1.61621 17.957C1.81576 18.1479 2.13237 18.141 2.32324 17.9414L17.7451 1.81934V18.3672C17.7453 18.6432 17.9691 18.8672 18.2451 18.8672Z" fill="white" />
                </svg>


                <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l`} />
                <span className={`absolute top-0 right-0 w-3 h-3 border-t border-r`} />
                <span className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l`} />
                <span className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r`} />
            </button>
        );
    };

    export default ArrowButton;
