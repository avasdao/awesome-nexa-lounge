// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'The Trilemma Lounge by Awesome Nexa',
            meta: [
                { name: 'description', content: 'A Safu space for your digital Personas.' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Cloudflare Pages */
        // 'nitro-cloudflare-dev',
    ],

    /* Route Rules */
    routeRules: {
        /* Add CORS headers to root. */
        // NOTE: We need this to make <token>.json files available to web apps.
        '/**': { cors: true },
    },

    /* Compatibility Date */
    compatibilityDate: '2025-04-15',
})
