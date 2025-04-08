import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <span role="img" aria-label="globe" style={{ fontSize: props.style?.fontSize || '2rem' }}>
            🌍
        </span>
    );
}
