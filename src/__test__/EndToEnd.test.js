import puppeteer from "puppeteer";

describe("show/hide event details", () => {
	let browser;
	let page;
	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".event");
	});

	afterAll(() => {
		browser.close();
	});

	test("An event element is collapsed by default", async () => {
		const eventDetails = await page.$(".event .details");
		expect(eventDetails).toBeNull();
	});

	test("User can expand an event to see details", async () => {
		await page.click(".event .details-btn");
		const eventDetails = await page.$(".event .details");
		expect(eventDetails).toBeDefined();
	});

	test("User can collapse an event to hide detaials", async () => {
		await page.click(".event .details-btn");
		const eventDetails = await page.$(".event .details");
		expect(eventDetails).toBeNull();
	});
});
