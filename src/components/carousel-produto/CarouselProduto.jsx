import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import imgCarrossel1 from "./../../utils/assets/carrossel_1.png";
import imgCarrossel2 from "./../../utils/assets/carrossel_2.png";
import imgCarrossel3 from "./../../utils/assets/carrossel_3.png";
import { Carousel } from 'react-responsive-carousel';
import CardCarousel from './../card-carousel/CardCarousel';

class CarouselProduto extends Component {

    render() {

        const indicatorStyles = {
            background: 'rgba(159, 53, 240, 0.15)',
            width: 10,
            height: 10,
            display: 'inline-block',
            margin: '0 8px',
            color: '#9F36F0',
            border: '1.5px solid rgba(159, 53, 240, 0.5)',
            borderRadius: '1rem',
            transition: '0.3s ease-in-out',
            cursor: 'pointer'
        };

        return (
            <Carousel
                showStatus={false}
                showArrows={false}
                autoPlay={true}
                interval={3700}
                infiniteLoop={true}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <li
                                style={{ ...indicatorStyles, background: '#9F36F0', width: 14, height: 14 }}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            style={indicatorStyles}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`} />
                    )
                }}
            >
                <CardCarousel
                    imagem={imgCarrossel1}
                    texto="Adicione e faça a gestão dos seus funcionários"
                />
                <CardCarousel
                    imagem={imgCarrossel2}
                    texto="Adicione e visualize seus agendamentos de forma eficiênte"
                />
                <CardCarousel
                    imagem={imgCarrossel3}
                    texto="Realize o controle e visualize de forma gráfica suas finanças"
                />
            </Carousel>
        );
    }
};

export default CarouselProduto;