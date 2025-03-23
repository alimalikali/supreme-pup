'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './arrow-buttons';

type SliderProps = {
    options: Parameters<typeof useEmblaCarousel>[0];
    children?: React.ReactNode[] | React.ReactNode;
};

const Slider = ({ options, children }: SliderProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    if (!children) return null;

    return (
        <section className="embla w-full relative">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {Array.isArray(children) ? (
                        children.map((child, index) => (
                            <div className="embla__slide !max-sm:basis-full" key={index}>
                                {child}
                            </div>
                        ))
                    ) : (
                        <div className="embla__slide">{children}</div>
                    )}
                </div>
            </div>
            {!prevBtnDisabled && <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />}
            {!nextBtnDisabled && <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />}
        </section>
    );
};

export default Slider;
