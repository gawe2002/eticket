

const form = document.getElementById("bookingForm");
const message = document.getElementById("message");

const SUPABASE_URL = "https://stpqkfmiqjtsargfaklt.supabase.co";
const SUPABASE_KEY = "sb_publishable_5uWGZUixB1HfisqAy5Gk5w_sj5AvHmf";

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const selectedEvent = document.getElementById("event").value;
    const tickets = Number(document.getElementById("tickets").value);

    if (
        !name ||
        name.length > 100 ||
        !Number.isInteger(tickets) ||
        tickets < 1 ||
        tickets > 10
    ) {
        alert("Please enter valid booking details.");
        return;
    }

    message.style.display = "block";
    message.textContent = "Saving your booking...";

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/bookings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    customer_name: name,
                    event_name: selectedEvent,
                    ticket_count: tickets
                })
            }
        );

        if (!response.ok) {
            throw new Error("Booking could not be saved.");
        }

        message.textContent =
            `Booking saved successfully! Thank you, ${name}.`;

        form.reset();
        document.getElementById("tickets").value = 1;

    } catch (error) {
        console.error(error);
        message.textContent =
            "Booking failed. Please check your connection and settings.";
    }
});
