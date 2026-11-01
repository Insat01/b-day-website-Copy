
/* =====================================================
   BILLUUUU ❤️ BANNUUUU
   BIRTHDAY SURPRISE WEBSITE
   Works without photos, videos, or music.
===================================================== */

'use strict';

/* 1. HELPER FUNCTIONS */

function byId(id) {
    return document.getElementById(id);
}

function goToScreen(screenId) {
    const screen = byId(screenId);

    if (screen) {
        screen.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function connectScreenButton(buttonId, screenId) {
    const button = byId(buttonId);

    if (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            goToScreen(screenId);
        });
    }
}

/* 2. SCREEN 1 → SCREEN 2 */

connectScreenButton('enterButton', 'birthdayScreen');

/* 3. BIRTHDAY COUNTDOWN */

function updateCountdown() {
    const daysEl = byId('days');
    const hoursEl = byId('hours');
    const minutesEl = byId('minutes');
    const secondsEl = byId('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }

    const now = new Date();

    // Birthday: November 4
    const birthdayToday =
        now.getMonth() === 10 && now.getDate() === 4;

    if (birthdayToday) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';

        const message = byId('countdownMessage');

        if (message) {
            message.textContent =
                'HAPPY BIRTHDAY, MY MOHARANI! ❤️🎂';
        }

        return;
    }

    let nextBirthday = new Date(
        now.getFullYear(), 10, 4, 0, 0, 0
    );

    if (now > nextBirthday) {
        nextBirthday = new Date(
            now.getFullYear() + 1, 10, 4, 0, 0, 0
        );
    }

    const difference = nextBirthday.getTime() - now.getTime();

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

/* 4. SCREEN 2 → SCREEN 3 */

connectScreenButton('storyButton', 'storyScreen');

/* 5. SCREEN 3 → SCREEN 4 */

connectScreenButton('memoriesButton', 'memoriesScreen');

/* Optional clickable story ending */

const storyEnding = document.querySelector('.story-ending');

if (storyEnding) {
    storyEnding.addEventListener('click', function () {
        goToScreen('memoriesScreen');
    });

    storyEnding.setAttribute('role', 'button');
    storyEnding.setAttribute('tabindex', '0');

    storyEnding.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goToScreen('memoriesScreen');
        }
    });
}

/* 6. SCREEN 4 → SCREEN 5 */

connectScreenButton('memoriesContinue', 'momentsScreen');

/* 7. SCREEN 5 → SCREEN 6 */

connectScreenButton('momentsContinue', 'loveScreen');

/* 8. SCREEN 6 → SCREEN 7 */

connectScreenButton('loveContinue', 'letterScreen');

/* 9. LOVE LETTER REVEAL
   Your letter content remains in your HTML.
*/

const openLetterBtn = byId('openLetterBtn');

if (openLetterBtn) {
    openLetterBtn.addEventListener('click', function () {
        const letterIntro = byId('letterIntro');
        const letterWrapper = byId('letterWrapper');

        if (letterIntro) {
            letterIntro.classList.add('fade-out');
            letterIntro.setAttribute('aria-hidden', 'true');
        }

        if (letterWrapper) {
            letterWrapper.hidden = false;
            letterWrapper.style.display = 'block';

            requestAnimationFrame(function () {
                letterWrapper.classList.add('show');
                letterWrapper.setAttribute('aria-hidden', 'false');
            });
        }

        openLetterBtn.setAttribute('aria-expanded', 'true');
    });
}

/* 10. SCREEN 7 → SCREEN 8 */

connectScreenButton('letterContinue', 'finalScreen');

/* 11. FINAL GIFT REVEAL */

const finalRevealBtn = byId('finalRevealBtn');

if (finalRevealBtn) {
    finalRevealBtn.addEventListener('click', function () {
        const finalIntro = byId('finalIntro');
        const birthdayReveal = byId('birthdayReveal');

        if (finalIntro) {
            finalIntro.classList.add('fade-out');
            finalIntro.setAttribute('aria-hidden', 'true');
        }

        if (birthdayReveal) {
            birthdayReveal.hidden = false;
            birthdayReveal.style.display = 'block';

            requestAnimationFrame(function () {
                birthdayReveal.classList.add('show');
                birthdayReveal.setAttribute('aria-hidden', 'false');
            });
        }

        finalRevealBtn.setAttribute('aria-expanded', 'true');
    });
}

/* 12. LAST SURPRISE */

const lastSurpriseBtn = byId('lastSurpriseBtn');

if (lastSurpriseBtn) {
    lastSurpriseBtn.addEventListener('click', function () {
        const ultimateSurprise = byId('ultimateSurprise');

        if (ultimateSurprise) {
            ultimateSurprise.hidden = false;
            ultimateSurprise.style.display = 'block';

            requestAnimationFrame(function () {
                ultimateSurprise.classList.add('show');
                ultimateSurprise.setAttribute('aria-hidden', 'false');
            });
        }

        lastSurpriseBtn.setAttribute('aria-expanded', 'true');
    });
}


/* =========================================
   13. BACKGROUND ROMANTIC MUSIC ❤️
========================================= */

const backgroundMusic = byId('backgroundMusic');
const musicToggle = byId('musicToggle');

if (backgroundMusic) {
    backgroundMusic.loop = true;
    backgroundMusic.preload = 'auto';

    backgroundMusic.addEventListener('error', function () {
        console.error(
            'Music file failed to load:',
            backgroundMusic.currentSrc,
            backgroundMusic.error
        );

        if (musicToggle) {
            musicToggle.textContent = '⚠️ MUSIC FILE ERROR';
        }
    });
}

if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', async function () {
        try {
            if (backgroundMusic.paused) {
                await backgroundMusic.play();
                musicToggle.textContent = '⏸ PAUSE MUSIC';
                musicToggle.setAttribute('aria-pressed', 'true');
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵 PLAY MUSIC';
                musicToggle.setAttribute('aria-pressed', 'false');
            }
        } catch (error) {
            console.error('Music playback failed:', error);
            musicToggle.textContent = '⚠️ MUSIC NOT PLAYING';
        }
    });
}



/* 14. OPTIONAL VIDEO SETTINGS */

document.querySelectorAll('video').forEach(function (video) {
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
});

/* 15. BUTTON SAFETY */

document.querySelectorAll('button').forEach(function (button) {
    if (!button.hasAttribute('type')) {
        button.setAttribute('type', 'button');
    }
});

console.info('Birthday website script loaded ❤️');

/* START BACKGROUND MUSIC AFTER THE FIRST VISITOR CLICK */

const bgMusic = document.getElementById('backgroundMusic');
const enterBtn = document.getElementById('enterButton');

if (bgMusic && enterBtn) {
    enterBtn.addEventListener('click', async function () {
        try {
            await bgMusic.play();
        } catch (error) {
            console.info(
                'Press PLAY MUSIC to start the background song.'
            );
        }
    });
}
