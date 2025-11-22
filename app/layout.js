import './globals.css'

export const metadata = {
    title: 'The University Years (2021-2025)',
    description: 'A journey through my university years.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                // Override console.error to catch extension errors that might trigger overlays
                                const originalError = console.error;
                                console.error = function(...args) {
                                    if (args[0] && (
                                        (typeof args[0] === 'string' && args[0].includes('MetaMask')) ||
                                        (args[0].message && args[0].message.includes('MetaMask'))
                                    )) {
                                        return;
                                    }
                                    originalError.apply(console, args);
                                };

                                // Capture phase error listener
                                window.addEventListener('error', function(e) {
                                    if ((e.message && e.message.includes('MetaMask')) || 
                                        (e.filename && e.filename.includes('chrome-extension'))) {
                                        e.stopImmediatePropagation();
                                        e.preventDefault();
                                    }
                                }, true);

                                // Capture phase unhandledrejection listener
                                window.addEventListener('unhandledrejection', function(e) {
                                    if (e.reason && e.reason.message && e.reason.message.includes('MetaMask')) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                    }
                                }, true);
                            })();
                        `
                    }}
                />
                {children}
            </body>
        </html>
    )
}
