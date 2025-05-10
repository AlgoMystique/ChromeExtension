  // Collection of gradient backgrounds
  const gradients = [
    "linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)",
    "linear-gradient(135deg, #F97794 10%, #623AA2 100%)",
    "linear-gradient(135deg, #FCCF31 10%, #F55555 100%)",
    "linear-gradient(135deg, #F761A1 10%, #8C1BAB 100%)",
    "linear-gradient(135deg, #43CBFF 10%, #9708CC 100%)",
    "linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)",
    "linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)",
    "linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%)",
    "linear-gradient(135deg, #92FFC0 10%, #002661 100%)",
    "linear-gradient(135deg, #FFF3B0 10%, #CA26FF 100%)",
    "linear-gradient(135deg, #F05F57 10%, #360940 100%)",
    "linear-gradient(135deg, #C2FFD8 10%, #465EFB 100%)",
    "linear-gradient(135deg, #F0FF00 10%, #58CFFB 100%)",
    "linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%)",
    "linear-gradient(120deg, #fdfbfb 0%,rgb(191, 198, 202) 100%)",
    "linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)",
];

// DOM elements
const feather = document.getElementById('feather');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const container = document.querySelector('.container');

// Quote categories and data
const quoteDatabase = {
    inspirational: [
      { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
      { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
      { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
      { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
      { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    ],
    motivational: [
      { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
      { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
      { quote: "Dream it. Wish it. Do it.", author: "Unknown" },
      { quote: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    ],
    life: [
      { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
      { quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
      { quote: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
      { quote: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany" },
      { quote: "Live for each second without hesitation.", author: "Elton John" },
    ],
    wisdom: [
      { quote: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
      { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
      { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
      { quote: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare" },
      { quote: "The quieter you become, the more you are able to hear.", author: "Rumi" },
    ],
    love: [
      { quote: "Where there is love there is life.", author: "Mahatma Gandhi" },
      { quote: "Love all, trust a few, do wrong to none.", author: "William Shakespeare" },
      { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
      { quote: "We accept the love we think we deserve.", author: "Stephen Chbosky" },
    ],
    humor: [
      { quote: "The best way to cheer yourself up is to try to cheer somebody else up.", author: "Mark Twain" },
      { quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
      { quote: "Why do they call it rush hour when nothing moves?", author: "Robin Williams" },
      { quote: "I used to think I was indecisive, but now I'm not too sure.", author: "Unknown" },
    ]
  };
  

// Default categories to enable
const defaultCategories = ['inspirational', 'motivational', 'life', 'wisdom', 'love', 'humor'];


// Get a random quote from enabled categories
function getRandomQuote() {
    const enabledCategories = defaultCategories.filter(cat => quoteDatabase.hasOwnProperty(cat));
    const randomCategory = enabledCategories[Math.floor(Math.random() * enabledCategories.length)];
    const quotes = quoteDatabase[randomCategory];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Create ink drop effect
function createInkDrop(x, y) {
    const inkDrop = document.createElement('div');
    inkDrop.className = 'ink-drop';
    inkDrop.style.left = `${x}px`;
    inkDrop.style.top = `${y}px`;
    container.appendChild(inkDrop);
    
    setTimeout(() => {
        inkDrop.style.transition = 'all 1s ease-out';
        inkDrop.style.opacity = '0.8';
        inkDrop.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            inkDrop.style.opacity = '0';
            setTimeout(() => container.removeChild(inkDrop), 1000);
        }, 500);
    }, 10);
}

// Create glow effect
function createGlow(x, y) {
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.style.left = `${x - 15}px`;
    glow.style.top = `${y - 15}px`;
    container.appendChild(glow);

    setTimeout(() => {
        glow.style.transition = 'all 0.8s ease-out';
        glow.style.opacity = '0.6';
        glow.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            glow.style.opacity = '0';
            setTimeout(() => container.removeChild(glow), 800);
        }, 400);
    }, 10);
}


// Type out the quote and author
// Type the quote letter by letter
function typeQuote(quoteObj, position = 0, previousLineHeight = 0) {
    if (position < quoteObj.quote.length) {
        quoteText.innerHTML += quoteObj.quote.charAt(position);

        const containerRect = container.getBoundingClientRect();
        const range = document.createRange();
        let textNode = quoteText.lastChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            const offset = Math.min(textNode.length - 1, position);
            range.setStart(textNode, offset);
            range.setEnd(textNode, offset + 1);
        } else {
            range.selectNodeContents(quoteText);
            range.collapse(false);
        }

        const rect = range.getBoundingClientRect();
        const featherX = rect.left - containerRect.left + 5;
        const featherY = rect.top - containerRect.top - 15;

        feather.style.transition = "all 0.08s ease-out"; // smooth feather movement
        feather.style.left = `${featherX}px`;
        feather.style.top = `${featherY}px`;

        // Apply feather bobbing effect while typing
        feather.style.animation = "feather-bob 1s ease-in-out infinite";

        if (Math.random() < 0.15) createInkDrop(featherX + 10, featherY + 25);
        if (Math.random() < 0.1) createGlow(featherX + 10, featherY + 25);

        let currentLineHeight = rect.top;
        let delay = 100 + Math.random() * 50; // dynamic typing delay

        // Add delay for line breaks
        if (Math.abs(currentLineHeight - previousLineHeight) > 1) {
            delay += 500; // longer delay for new line
        }

        setTimeout(() => typeQuote(quoteObj, position + 1, currentLineHeight), delay);
    } else {
        // Remove the feather bobbing animation after the quote finishes typing
        feather.style.animation = "";

        setTimeout(() => {
            quoteAuthor.innerHTML = "— " + quoteObj.author;
            quoteAuthor.style.opacity = "1";
            returnFeatherToInkBottle();
        }, 500);
    }
}


// Move feather to quote area
function moveFeatherToQuoteArea() {
    const quoteRect = quoteText.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const targetX = quoteRect.left - containerRect.left + 20;
    const targetY = quoteRect.top - containerRect.top + 10;

    feather.style.opacity = "1";
    feather.style.transition = "all 2s cubic-bezier(0.4, 0, 0.2, 1)";
    feather.style.left = `${targetX}px`;
    feather.style.top = `${targetY}px`;
    feather.style.transform = "rotate(45deg)";

    quoteText.innerHTML = '';
    quoteAuthor.innerHTML = '';
    quoteAuthor.style.opacity = '0';
    quoteText.style.textAlign = 'left';

    setTimeout(() => {
        const quoteObj = getRandomQuote();
        typeQuote(quoteObj); // pass quoteObj directly
    }, 2000);
}

// Rise feather from ink bottle
function riseFeatherFromInkBottle() {
    const inkBottle = document.getElementById('ink-bottle');
    const inkBottleRect = inkBottle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    feather.style.left = `${inkBottleRect.left - containerRect.left + 10}px`;
    feather.style.top = `${inkBottleRect.top - containerRect.top - 10}px`;
    feather.style.transform = "rotate(0deg)";
    feather.style.transition = "opacity 1s ease-in-out, top 1.5s ease-out";

    setTimeout(() => {
        feather.style.opacity = "1";
        feather.style.top = `${inkBottleRect.top - containerRect.top - 100}px`;

        setTimeout(moveFeatherToQuoteArea, 1500);
    }, 500);
}

// Return feather to ink bottle
function returnFeatherToInkBottle() {
    const inkBottle = document.getElementById('ink-bottle');
    const inkBottleRect = inkBottle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    feather.style.transition = "all 2s cubic-bezier(0.4, 0, 0.2, 1)";
    feather.style.left = `${inkBottleRect.left - containerRect.left + 10}px`;
    feather.style.top = `${inkBottleRect.top - containerRect.top - 10}px`;
    feather.style.transform = "rotate(0deg)";

    setTimeout(() => {
        feather.style.opacity = "0";
        feather.style.top = `${inkBottleRect.top - containerRect.top + 20}px`;
    }, 2000);
}

// Initialize animation on page load
window.addEventListener('load', () => {
    quoteText.innerHTML = '';
    quoteAuthor.innerHTML = '';
    quoteAuthor.style.opacity = '0';

    // Set a random background gradient
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    document.body.style.backgroundImage = randomGradient;

    // Start the animation immediately
    setTimeout(riseFeatherFromInkBottle, 200); // Trigger the rising feather after a short delay
});
