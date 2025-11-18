
export async function GET() {
    const currentDate = new Date().toISOString();
    const funFact = "Did you know? The first computer bug was an actual bug!";
    const response = await fetch('https://zenquotes.io/api/quotes/');
    const data = await response.json();

    return Response.json({
        status: "ok",
        timestamp: currentDate,
        funFact: funFact,
        inspiration: data[0]?.q || "Stay positive and keep pushing forward!",
    });
}
