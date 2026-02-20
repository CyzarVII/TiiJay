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
            date: "March 6th 2025",
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
            date: "June 28th 2025",
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
            date: "April 2025",
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
            date: "July 10th 2025",
            text: `
The evenings when the sky went gold and purple,
and it felt like the whole island went quiet for us. Whenever
we go to the beach it always felt like that.
`.trim()
        },
        {
            label: "MUSIC FESTIVAL",
            title: "PURE VIBES",
            date: "June 26th 2025",
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
            date: "November 2024",
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
            date: "November 23rd 2025",
            text: `
 The stars, drinks, music, sea, friends and family. That night was spectacular,
 at first I was to myself because I'm not too accustomed to be around gatherings such as those.
 I then relaxed, took a deep breath and saw how much fun you were having, then I heard the lyrics
 "I wanna dance with somebody who loves me". I purposely went to the bar, and asked for an even harder drink
 so I can loosen up myself a bit more, so I can enjoy the night even more with you honey. When we danced, it felt like 
 us two on the boat for that brief moment to enjoy ourselves, it felt magical. Is this what real love is? If so, it was
 a feeling I will never forget. Also, your family are a rowdy bunch of love and laughter, I love them
`.trim()
        },

          {

         label: "Nevis, Part 1",
            title: "My Birthday",
            date: "February 22 2025",
            text: `
 The time we first began in 2025 and it was my birthday. You had to go to Nevis my girl, I was a bit worried honestly.
 You were a bit stressed out and wanted to stay, but had to go over there. So, we both decided why not go over and spend the night?
 I did exactly that, went over, met some friends along the way at the museum, and waited for my love. You were well seated there on the bench, heh. 
    When we went to the room, I was amazed, the view was spectacular, the bed was comfy, the vibes were immaculate. We then went to the hotsprings after a tiresome walk,
    it was relaxing, calming and peaceful. We then went back to our little aboud and rested for the evening, playing games and just enjoying one another's company til we fell asleep.
    The morning was another conversation though for us to remember. 😉
`.trim()
        },
        
        {

         label: "Nevis Part 2",
            title: "Your Birthday",
            date: "November 24th 2025",
            text: `
 The beach, the drive around Nevis, the atmosphere, I loved it. We drove around Nevis and went to numerous spots,
 Some of which includeded the beach, the garden at golden rock, it felt like I was truly home and at a movie scene in the chairs.
 It was an amazing adventure, up to the point where I showed you the website. You are an amazing woman.
`.trim()
        },

        {

         label: "Boozies Date",
            title: "Your Birthday",
            date: "November 24th 2025",
            text: `
 We enjoyed the food, but darling the rumper you had on had me shooketh, it was the night when I showed you the website and you teared up and cried.
 You were honestly sobbing, for how much you felt loved and the fact that I myself was smiling gleefully with teary eyes. I do truly love you honey.
`.trim()
        },


         {

         label: "Our Anniversary",
            title: "Our Favorite time of the year",
            date: "January 6th 2026",
            text: `
 We sure love our indian food as we keep returning to it. We wore black as that's our favorite color.
 We definitely enjoyed our time there as we laughed, smiled and enjoyed our butter chicken and chicken tikka masala.
`.trim()
        },


         {

         label: "The family gathering",
            title: "Your mom and pops' 40th Anniversary",
            date: "February 1st, 2026",
            text: `
Being invited to your family events always made me felt loved, it shows how dedicated we are with each other and the mere fact
that we enjoy our time as well. Your brothers are always fun being around with, especially Stevie. Fleur is an impeccable woman, always full with smiles and knows
how to handle your brother well, they definitely are a match and it makes me happy to see such a wonderful marriage at this time from first generation and second generation smiths. You will be a Caesar though.
`.trim()
        },

        
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
                <div class="moment-label-header">
                    <div class="moment-label">${m.label}</div>
                    <button class="moment-date-btn" aria-label="Show date">Date</button>
                </div>
                <div class="moment-date-display" style="display: none;">${m.date || "No date set"}</div>
                <p>${m.text}</p>
            `;
            container.appendChild(card);

            // Add click handler for the date button
            const dateBtn = card.querySelector(".moment-date-btn");
            const dateDisplay = card.querySelector(".moment-date-display");
            dateBtn.addEventListener("click", function() {
                const isVisible = dateDisplay.style.display !== "none";
                dateDisplay.style.display = isVisible ? "none" : "block";
                dateBtn.classList.toggle("active", !isVisible);
            });
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
