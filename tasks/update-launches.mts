import { inspect } from 'util';
import { writeFileSync } from 'fs';
import { Launch } from 'space-api/types';

// Fetch launches from SpaceXdata API
const apiUrl = 'https://api.spacexdata.com/latest/launches/query';
const requestOptions = {
  body: JSON.stringify({
    query: {},
    options: {populate: ['rocket', 'launchpad'], pagination: false}
  }),
  method: 'POST',
  headers: {"Content-Type": "application/json"}
}
console.log('Fetching launches... ');
const apiResponse = await fetch(apiUrl, requestOptions);
const spaceXLaunches: {docs: any[]} = await apiResponse.json();

// Map to response data to Launch model
const spaceApiLaunches: Launch[] = spaceXLaunches.docs.map((l, i) => ({
  id: i + 1,
  missionPatch: l.links.patch.small,
  missionName: l.name,
  rocketName: l.rocket.name,
  success: l.success,
  launchDate: l.date_utc,
  launchSiteName: l.launchpad.full_name,
  details: l.details,
  links: {
    videoLink: l.links.webcast,
    presskitLink: l.links.presskit,
    articleLink: l.links.article,
    wikipediaLink: l.links.wikipedia
  }
}));

// Write file with mocks
const content =
`import { Launch } from '../types';

export const mockedLaunches: Launch[] = ${inspect(spaceApiLaunches, {maxArrayLength: null})}`;
const filePath = './projects/space-api/mocks/launch.ts';
console.log('Writing launches... ');
writeFileSync(filePath, content, 'utf-8');

console.log('Done! ');
