/**
 * MOMENTS CAROUSEL MODULE
 * 
 * This file creates a carousel (slideshow) that displays relationship moments.
 * It works similar to the gallery but shows 4 moments at a time with story text.
 * Each moment is something special we shared together.
 */
(function () {
    // How many moments to show per page
    const PAGE_SIZE = 4;

    // Array of all our special moments
    const moments = [
        {
            label: "FIRST OFFICIAL DATE",
            title: "Indian Summer",
            text: `
Our first official date at Indian Summer wasn't just about
the food or the place it was about you, across from me,
and the feeling that this was the start of something real.
The way you talked, laughed, and looked at me made
everything else fade into the background.
`.trim()
        },
        {
            label: "LOUD WORLD, QUIET HEARTS",
            title: "Music Fest",
            text: `
Music Fest was noise and lights and energy but somehow
it still felt like our own little bubble. In the middle of
the crowd, it was just us, sharing looks, jokes, and
memories I'll keep replaying in my head whenever I miss you.
`.trim()
        },
        {
            label: "SOFT SUNDAYS",
            title: "Movie Nights",
            text: `
Sure you're not all too heavy on horrow movies, but we sat and
watched scary movie 1 and 2 just for the laughs, well more so me.
You felt disgusted but you still laughed a few times on the other stuff.
I appreciated that you stayed for that.
`.trim()
        },
        {
            label: "SUNSET & SALT",
            title: "Beach Day",
            text: `
The evenings when the sky went gold and purple,
and it felt like the whole island went quiet for us. Whenever
we go to the beach it always felt like that.
`.trim()
        },
        {
            label: "MUSIC FESTIVAL",
            title: "PURE VIBES",
            text: `
The Thursday night was amazing for myself, but I felt nothing better
than the Saturday when we were singing along with Arya Stark, bits 
and pieces of Jennifer Hudson and just enjoyed the moments we shared
with the videos and pictures we took. 
`.trim()
        },
        {
            label: "THE Night",
            title: "My Story",
            text: `
The night you told me it's okay I did the best I can. That made me 
lower my guard around you. During the moment of me telling you my
story, you sat there and listened. You did not overspeak, you didn't
cut in, you sat and listened. You understood everything and the 
qualities you showed that night made me understand that, you are worth it.
You really are an amazing woman for that. 
`.trim()
        },
        {
            label: "Catamarang",
            title: "Your Pre Birthday Party 2025",
            text: `
 The stars, drinks, music, sea, friends and family. That night was spectacular,
 at first I was to myself because I'm not too accustomed to be around gatherings such as those.
 I then relaxed, took a deep breath and saw how much fun you were having, then I heard the lyrics
 "I wanna dance with somebody who loves me". I purposely went to the bar, and asked for an even harder drink
 so I can loosen up myself a bit more, so I can enjoy the night even more with you honey. When we danced, it felt like 
 us two on the boat for that brief moment to enjoy ourselves, it felt magical. Is this what real love is? If so, it was
 a feeling I will never forget. Also, your family are a rowdy bunch of love and laughter, I love them
`.trim()
        }
    ];

    const container = document.getElementById("moments-list");
    const prevBtn = document.getElementById("moments-prev");
    const nextBtn = document.getElementById("moments-next");

    if (!container || !prevBtn || !nextBtn) return;

    let currentPage = 0;

    function renderPage() {
        container.innerHTML = "";

        const start = currentPage * PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, moments.length);

        for (let i = start; i < end; i++) {
            const m = moments[i];
            const card = document.createElement("div");
            card.className = "moment-card";
            card.innerHTML = `
                <div class="moment-label">${m.label}</div>
                <div class="moment-title">${m.title}</div>
                <p>${m.text}</p>
            `;
            container.appendChild(card);
        }

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = end >= moments.length;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            renderPage();
        }
    });

    nextBtn.addEventListener("click", () => {
        const maxPage = Math.floor((moments.length - 1) / PAGE_SIZE);
        if (currentPage < maxPage) {
            currentPage++;
            renderPage();
        }
    });

    renderPage();
})();
