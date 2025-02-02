import React from 'react';
import './style/Logo.css';
import { ILogoProps } from './interfaces/ILogoProps';

class Logo extends React.Component<ILogoProps> {
    render() {
        var logoStyle = {
            fontSize: `${this.props.size}px`
        }

        return (
            <div className="logo">
                <svg className="logo--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 610.69 746.59"><defs /><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M387.55 87.21a250.08 250.08 0 01144.89 94.38 3.31 3.31 0 002.09 1.27l42.26 6.76a3.26 3.26 0 003.33-4.88 288.29 288.29 0 00-191.23-136.1 3.26 3.26 0 00-3.89 3.21V84a3.25 3.25 0 002.55 3.21zM264 571.61A250.4 250.4 0 0188.21 386.55 3.25 3.25 0 0085 384H52.84a3.25 3.25 0 00-3.2 3.89C71.37 496.34 154 582.77 260.37 610a3.27 3.27 0 004.06-3l1.91-32.08a3.26 3.26 0 00-2.34-3.31zM275.11 48.64A288.3 288.3 0 0049.64 274.11a3.26 3.26 0 003.2 3.89H85a3.25 3.25 0 003.17-2.55A250.35 250.35 0 01276.45 87.21 3.25 3.25 0 00279 84V51.84a3.26 3.26 0 00-3.89-3.2zM266.34 328.07L239 312.29V312H3.27A3.26 3.26 0 000 315.27v31.46A3.26 3.26 0 003.27 350H239v-.49l27.34-15.78a3.27 3.27 0 000-5.66zM316.8 193.22l31.47-5.22a3.27 3.27 0 002.73-3.22V3.27A3.26 3.26 0 00347.73 0h-31.46A3.26 3.26 0 00313 3.27V190a3.26 3.26 0 003.8 3.22zM310.92 384.68c31.91 20.85 74.53 34.89 122.14 38.44a6 6 0 006.46-6V340a6 6 0 00-6-6h-1A21.49 21.49 0 01411 312.47v-96.21a6 6 0 00-6.89-5.95c-115.8 16.84-102.15 19-95.87 169.59a6 6 0 002.68 4.78z" /><path d="M610.67 580.24l-9.13-111.55v-.5q0-20.25.38-38.26a6 6 0 00-8.71-5.49c-38.41 19.09-85.48 30.34-136.35 30.34-51.75 0-99.57-11.64-138.34-31.35a6 6 0 00-8.75 5.47q.36 18.5.38 39.35v.39L303 580.29v.45c.12 84.88 68.95 165.85 153.84 165.85 84.88 0 153.7-80.93 153.85-165.8 0-.18-.01-.37-.02-.55z" /><path d="M502.69 216v96.45A21.49 21.49 0 01481.2 334a6 6 0 00-6 6v77a6 6 0 006.5 6c46.16-3.6 87.58-17.07 119-37a6 6 0 002.75-4.81C610 229 625.38 226.44 509.56 210.06a6 6 0 00-6.87 5.94z" /><rect x="436.6" y="221.88" width="40.62" height="86.56" rx="6.02" /></g></g></svg>
                <p className="logo--text" style={logoStyle}>AIMORE</p>
            </div>
        )
    }
}

export default Logo;
