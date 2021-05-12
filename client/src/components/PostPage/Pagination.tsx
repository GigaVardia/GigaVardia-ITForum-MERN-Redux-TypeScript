import React, {Dispatch, FC, useEffect, useState} from 'react';

type PaginationPropsType = {
    pages: number;
    setCurrentPage: Dispatch<React.SetStateAction<any>>;
}

const Pagination: FC<PaginationPropsType> = ({pages, setCurrentPage}) => {
    const [currentButton, setCurrentButton] = useState(1)
    const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState<Array<any>>([]);

    const numberOfPages: Array<any> = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrentButtons];

        let dotsInitial = '...';
        let dotsLeft = '... ';
        let dotsRight = ' ...';

        if (typeof currentButton === "number") {
            if (pages < 6) {
                tempNumberOfPages = numberOfPages;
            }
            else if (currentButton >= 1 && currentButton <= 3) {
                tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pages];
            }
            else if (currentButton === 4) {
                const sliced = numberOfPages.slice(0, 5);
                tempNumberOfPages = [...sliced, dotsInitial, pages];
            }
            else if (currentButton > 4 && currentButton < pages - 2) { // from 5 to 8 -> (10 -2)
                const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4, 5]
                const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced2 (5, 5+1) -> [6]
                tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pages]); // [1, '...', 4, 5, 6, '...', 10]
            }
            else if (currentButton > pages - 3) {             // > 7
                const sliced = numberOfPages.slice(pages - 4) // slice(10-4)
                tempNumberOfPages = ([1, dotsLeft, ...sliced])
            }
        } else {
            if (currentButton === dotsInitial) {
                setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length - 3] + 1)
            } else if (currentButton === dotsRight) {
                setCurrentButton(arrOfCurrentButtons[3] + 2)
            } else if (currentButton === dotsLeft) {
                setCurrentButton(arrOfCurrentButtons[3] - 2)
            }
        }

        setArrOfCurrentButtons(tempNumberOfPages);
        setCurrentPage(currentButton);
        // eslint-disable-next-line
    }, [currentButton])

    const handleClickNext = () => {
        if (currentButton === pages || typeof currentButton === "string") return;
        setCurrentButton(currentButton + 1);
    }

    const handleClickPrev = () => {
        if (currentButton === 1 || typeof currentButton === "string") return;
        setCurrentButton(currentButton - 1);
    }

    return (
        <div className="pagination">
            <div className="pagination-inner">
                <button
                    className={currentButton === 1 ? 'pgn__btn pgn__btn--disabled' : 'pgn__btn'}
                    onClick={handleClickPrev}
                >
                    Prev
                </button>
                {arrOfCurrentButtons.map((page, index) => {
                    return (
                        <button
                            key = {`page${index}`}
                            onClick = {() => setCurrentButton(page)}
                            className={currentButton === page ? "pgn__btn pgn__btn--active" : "pgn__btn"}
                        >
                            {page}
                        </button>
                    )
                })}
                <button
                    className={currentButton === pages ? 'pgn__btn pgn__btn--disabled' : 'pgn__btn'}
                    onClick={handleClickNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;