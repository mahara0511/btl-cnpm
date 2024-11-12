import React from 'react';
import Slider from 'react-slick';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function ImageSlider({
    images = [
        'https://via.placeholder.com/600x400?text=Slide+1',
        'https://via.placeholder.com/600x400?text=Slide+2',
        'https://via.placeholder.com/600x400?text=Slide+3',
    ],
}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
    };

    return (
        <div className={cx('slider-wrapper')}>
            <Slider {...settings} className={cx('slider')}>
                {images.map((image, index) => (
                    <div key={index} className={cx('slide')}>
                        <Image className={cx('image-slider')} src={image} alt="image-slider" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImageSlider;
