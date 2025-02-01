**juChatbot**

Proyek chatbot AI sederhana yang dibangun dengan React, TypeScript, dan API AI kustom (**DeepSeekV3**)

**Fitur :**

-Streaming Respons: Respons chatbot muncul secara real-time

-Custom API: Terhubung dengan API AI kustom (tested dengan Hyperbolic AI API)


**Langkah-Langkah**

    Clone Repositori
    bash
    Copy

    git clone https://github.com/username/juChatbot.git
    cd juChatbot

    Install Dependencies
    bash
    Copy

    npm install

    Buat File .env
    Buat file .env di root direktori dan isi dengan:
    env
    Copy

    REACT_APP_API_URL=https://api.hyperbolic.xyz/v1/chat/completions
    REACT_APP_API_KEY=your_api_key_here

    Jalankan Development Server
    bash
    Copy

    npm start

    Buka http://localhost:3000 di browser.

    Build untuk Produksi
    bash
    Copy

    npm run build
