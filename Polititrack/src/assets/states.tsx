export const states: string[] = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
export type state =
  | 'Alabama'
  | 'Alaska'
  | 'Arizona'
  | 'Arkansas'
  | 'California'
  | 'Colorado'
  | 'Connecticut'
  | 'Delaware'
  | 'Florida'
  | 'Georgia'
  | 'Hawaii'
  | 'Idaho'
  | 'Illinois'
  | 'Indiana'
  | 'Iowa'
  | 'Kansas'
  | 'Kentucky'
  | 'Louisiana'
  | 'Maine'
  | 'Maryland'
  | 'Massachusetts'
  | 'Michigan'
  | 'Minnesota'
  | 'Mississippi'
  | 'Missouri'
  | 'Montana'
  | 'Nebraska'
  | 'Nevada'
  | 'New Hampshire'
  | 'New Jersey'
  | 'New Mexico'
  | 'New York'
  | 'North Carolina'
  | 'North Dakota'
  | 'Ohio'
  | 'Oklahoma'
  | 'Oregon'
  | 'Pennsylvania'
  | 'Puerto Rico'
  | 'Rhode Island'
  | 'South Carolina'
  | 'South Dakota'
  | 'Tennessee'
  | 'Texas'
  | 'Utah'
  | 'Vermont'
  | 'Virginia'
  | 'Washington'
  | 'West Virginia'
  | 'Wisconsin'
  | 'Wyoming';

export const stateIdMap: Record<state, Partial<string>> = {
  Alabama: 'ocd-jurisdiction/country:us/state:al/government',
  Alaska: 'ocd-jurisdiction/country:us/state:ak/government',
  Arizona: 'ocd-jurisdiction/country:us/state:az/government',
  Arkansas: 'ocd-jurisdiction/country:us/state:ar/government',
  California: 'ocd-jurisdiction/country:us/state:ca/government',
  Colorado: 'ocd-jurisdiction/country:us/state:co/government',
  Connecticut: 'ocd-jurisdiction/country:us/state:ct/government',
  Delaware: 'ocd-jurisdiction/country:us/state:de/government',
  Florida: 'ocd-jurisdiction/country:us/state:fl/government',
  Georgia: 'ocd-jurisdiction/country:us/state:ga/government',
  Hawaii: 'ocd-jurisdiction/country:us/state:hi/government',
  Idaho: 'ocd-jurisdiction/country:us/state:id/government',
  Illinois: 'ocd-jurisdiction/country:us/state:il/government',
  Indiana: 'ocd-jurisdiction/country:us/state:in/government',
  Iowa: 'ocd-jurisdiction/country:us/state:ia/government',
  Kansas: 'ocd-jurisdiction/country:us/state:ks/government',
  Kentucky: 'ocd-jurisdiction/country:us/state:ky/government',
  Louisiana: 'ocd-jurisdiction/country:us/state:la/government',
  Maine: 'ocd-jurisdiction/country:us/state:me/government',
  Maryland: 'ocd-jurisdiction/country:us/state:md/government',
  Massachusetts: 'ocd-jurisdiction/country:us/state:ma/government',
  Michigan: 'ocd-jurisdiction/country:us/state:mi/government',
  Minnesota: 'ocd-jurisdiction/country:us/state:mn/government',
  Mississippi: 'ocd-jurisdiction/country:us/state:ms/government',
  Missouri: 'ocd-jurisdiction/country:us/state:mo/government',
  Montana: 'ocd-jurisdiction/country:us/state:mt/government',
  Nebraska: 'ocd-jurisdiction/country:us/state:ne/government',
  Nevada: 'ocd-jurisdiction/country:us/state:nv/government',
  'New Hampshire': 'ocd-jurisdiction/country:us/state:nh/government',
  'New Jersey': 'ocd-jurisdiction/country:us/state:nj/government',
  'New Mexico': 'ocd-jurisdiction/country:us/state:nm/government',
  'New York': 'ocd-jurisdiction/country:us/state:ny/government',
  'North Carolina': 'ocd-jurisdiction/country:us/state:nc/government',
  'North Dakota': 'ocd-jurisdiction/country:us/state:nd/government',
  Ohio: 'ocd-jurisdiction/country:us/state:oh/government',
  Oklahoma: 'ocd-jurisdiction/country:us/state:ok/government',
  Oregon: 'ocd-jurisdiction/country:us/state:or/government',
  Pennsylvania: 'ocd-jurisdiction/country:us/state:pa/government',
  'Puerto Rico': 'ocd-jurisdiction/country:us/territory:pr/government',
  'Rhode Island': 'ocd-jurisdiction/country:us/state:ri/government',
  'South Carolina': 'ocd-jurisdiction/country:us/state:sc/government',
  'South Dakota': 'ocd-jurisdiction/country:us/state:sd/government',
  Tennessee: 'ocd-jurisdiction/country:us/state:tn/government',
  Texas: 'ocd-jurisdiction/country:us/state:tx/government',
  Utah: 'ocd-jurisdiction/country:us/state:ut/government',
  Vermont: 'ocd-jurisdiction/country:us/state:vt/government',
  Virginia: 'ocd-jurisdiction/country:us/state:va/government',
  Washington: 'ocd-jurisdiction/country:us/state:wa/government',
  'West Virginia': 'ocd-jurisdiction/country:us/state:wv/government',
  Wisconsin: 'ocd-jurisdiction/country:us/state:wi/government',
  Wyoming: 'ocd-jurisdiction/country:us/state:wy/government',
};
