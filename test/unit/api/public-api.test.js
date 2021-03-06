const test = require("ava");

const { Public: PublicApi } = require("../../../src/api");
const mockTopList = require("../../fixtures/toplist.json");

test("toplist returns an array of podcasts", async t => {
	try {
		const toptags = await PublicApi.getTopList(10);
		t.is(Object.keys(toptags).length, 10);
		t.truthy(toptags[0].title);
		t.truthy(toptags[0].description);
		t.truthy(toptags[0].subscribers);
		t.truthy(toptags[0].subscribersLastWeek);
		t.truthy(toptags[0].logoUrl);
		t.truthy(toptags[0].website);
		t.truthy(toptags[0].mygpoLink);
	} catch (err) {
		t.falsy(err);
	}
});

test("searchPodcasts returns podcast results based on the input search query", async t => {
	try {
		const searchResults = await PublicApi.searchPodcasts("hello");
		t.truthy(searchResults);
	} catch (err) {
		t.falsy(err);
	}
});

test("searchPodcasts throws an error when input query is not provided", async t => {
	try {
		const searchResults = await PublicApi.searchPodcasts();
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: query");
	}
});

test("getPodcastsOfATag returns podcasts of specified tag", async t => {
	try {
		const podcasts = await PublicApi.getPodcastsOfATag("javascript", 20);
		t.truthy(podcasts);
		t.is(Object.keys(podcasts).length, 20);
	} catch (err) {
		t.falsy(err);
	}
});

test("getPodcastsOfATag throws an error when input tag is not provided", async t => {
	try {
		const podcasts = await PublicApi.getPodcastsOfATag();
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: tag");
	}
});

test("getPodcastData returns metadata for specified podcast", async t => {
	try {
		const podcastData = await PublicApi.getPodcastData("http://feeds.feedburner.com/linuxoutlaws");
		t.truthy(podcastData.url);
		t.truthy(podcastData.title);
		t.truthy(podcastData.description);
		t.truthy(podcastData.subscribers);
		t.truthy(podcastData.subscribersLastWeek);
		t.truthy(podcastData.logoUrl);
		t.truthy(podcastData.website);
		t.truthy(podcastData.mygpoLink);
	} catch (err) {
		t.falsy(err);
	}
});

test("getPodcastData throws an error if the uri is not specified", async t => {
	try {
		const podcastData = await PublicApi.getPodcastData();
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: podcastUri");
	}
});

test("getPodcastData throws an 404 for an invalid podcast uri", async t => {
	try {
		const podcastData = await PublicApi.getPodcastData("http://random.nope.com");
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Expected 2xx, found 404");
	}
});

test("getEpisodeData throws an error if podcast uri is not specified ", async t => {
	try {
		const episodeData = await PublicApi.getEpisodeData(null, "hello");
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Missing or invalid parameters: podcastUri, episodeUri");
	}
});

test("getEpisodeData throws an 404 for an invalid podcast uri", async t => {
	try {
		const episodeData = await PublicApi.getEpisodeData(
			"http://random.podcast.nope.com",
			"http://random.episode.nope.com"
		);
	} catch (err) {
		t.truthy(err);
		t.is(err.message, "Expected 2xx, found 404");
	}
});

test("getEpisode  returns the metadata of an episode", async t => {
	try {
		const episodeData = await PublicApi.getEpisodeData(
			"http://feeds.feedburner.com/linuxoutlaws",
			"http://content.sixgun.org/linuxoutlaws370.mp3"
		);
		t.truthy(episodeData.podcastUrl);
		t.truthy(episodeData.podcastTitle);
		t.truthy(episodeData.description);
		t.truthy(episodeData.website);
		t.truthy(episodeData.mygpoLink);
		t.truthy(episodeData.released);
	} catch (err) {
		t.falsy(err);
	}
});
