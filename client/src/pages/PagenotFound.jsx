import React from 'react';
import {Link} from 'react-router-dom';

const PagenotFound = () => {
    return (
        <div style={styles.wrapper}>
            {/* Cute SVG */}
            <svg
                width="220"
                height="220"
                viewBox="0 0 200 200"
                fill="none"
            >
                <circle cx="100" cy="100" r="90" fill="#FFECEC"/>
                <circle cx="70" cy="85" r="10" fill="#333"/>
                <circle cx="130" cy="85" r="10" fill="#333"/>
                <path
                    d="M70 130 Q100 150 130 130"
                    stroke="#333"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            <h1 style={styles.title}>404</h1>
            <p style={styles.text}>
                Oops! This page got lost 🥺
            </p>

            <Link to="/" style={styles.button}>
                Take me home 🏠
            </Link>
        </div>
    );
};

export default PagenotFound;

const styles = {
    wrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff1f1, #f1f5ff)',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
    },
    title: {
        fontSize: '6rem',
        margin: '0',
        color: '#ff6b6b',
        fontWeight: '800',
    },
    text: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    button: {
        padding: '0.8rem 1.8rem',
        borderRadius: '999px',
        backgroundColor: '#ff6b6b',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)',
    },
};
