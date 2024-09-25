import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/AEON.jpg" // Ruta a tu imagen en la carpeta public
            alt="Logo"
            width="10%"
            className="img-fluid"
        />
    );
}