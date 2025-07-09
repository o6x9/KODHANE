// src/data/teamMembers.ts

export interface TeamMemberData {
  picture: string;
}

/**
 * These URLs map 1:1, by array index, to your
 * public/locales/.../team.json entries.
 */
export const teamData: TeamMemberData[] = [
  { picture: "/teamPictures/alice-johnson.jpg" },
  { picture: "/teamPictures/bob-lee.png" },
  { picture: "/teamPictures/charlie-smith.jpeg" },
  { picture: "/teamPictures/dana-khan.jpg" },
  // …and so on
];
